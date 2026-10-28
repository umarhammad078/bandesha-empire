import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { SourceTextModule, SyntheticModule, createContext } from "node:vm";
import ts from "typescript";

// Execute the actual server actions/route handlers with an isolated provider.
// No real accounts, network requests, passwords or OAuth sessions are created.
async function runtime({ enabled = true, user = null, auth = {}, env = {} } = {}) {
  const calls = [];
  const client = { auth: {
    getUser: async () => { calls.push(["getUser"]); return { data: { user }, error: null }; },
    signInWithPassword: async value => { calls.push(["password", value]); return { error: null }; },
    signUp: async value => { calls.push(["signup", value]); return { data: { session: null }, error: null }; },
    signInWithOAuth: async value => { calls.push(["oauth", value]); return { data: { url: "https://accounts.google.com/test-only" }, error: null }; },
    exchangeCodeForSession: async value => { calls.push(["exchange", value]); return { error: null }; },
    verifyOtp: async value => { calls.push(["otp", value]); return { error: null }; },
    resetPasswordForEmail: async (...value) => { calls.push(["recovery", ...value]); return { error: null }; },
    updateUser: async value => { calls.push(["update", value]); return { error: null }; },
    signOut: async () => ({ error: null }),
    ...auth,
  } };
  const context = createContext({ URL, URLSearchParams, FormData, process: { env: { NODE_ENV: "development", PORTAL_ENABLED: enabled ? "true" : "false", NEXT_PUBLIC_SUPABASE_URL: "https://test.supabase.co", NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "test-public-key", NEXT_PUBLIC_SITE_URL: "http://localhost:3000", ...env } } });
  const mocks = {
    "server-only": {},
    "next/navigation": { redirect: location => { throw Object.assign(new Error("redirect"), { location }); } },
    "next/cache": { revalidatePath: () => {} },
    "next/server": { NextResponse: { redirect: (url, options) => new Response(null, { ...options, headers: { ...options.headers, Location: String(url) } }) } },
    "@/lib/supabase/server": { createClient: async () => client },
  };
  const modules = new Map();
  async function getModule(specifier) {
    if (modules.has(specifier)) return modules.get(specifier);
    let module;
    if (specifier in mocks) {
      const exports = mocks[specifier];
      module = new SyntheticModule(Object.keys(exports), function () { for (const [key, value] of Object.entries(exports)) this.setExport(key, value); }, { context });
    } else {
      const path = specifier.replace(/^@\//, "src/") + ".ts";
      const source = await readFile(new URL(`../${path}`, import.meta.url), "utf8");
      const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
      module = new SourceTextModule(code, { context, identifier: specifier });
    }
    modules.set(specifier, module);
    await module.link(getModule);
    return module;
  }
  const load = async path => { const module = await getModule(path); if (module.status !== "evaluated") await module.evaluate(); return module.namespace; };
  return { load, calls };
}

const destination = "/portal?view=orders&action=new-order&package=starter";
function form(values = {}) {
  const result = new FormData();
  for (const [key, value] of Object.entries({ email: "client@example.com", password: "test-password-only", full_name: "Test Client", next: destination, ...values })) result.set(key, value);
  return result;
}
const goesTo = location => error => error.location === location;

test("production callbacks use the canonical www origin, with safe fallback for invalid configuration", async () => {
  for (const value of [undefined, "not-a-url", "http://localhost:3000", "ftp://localhost", "https://user:password@example.com"]) {
    const r = await runtime({ env: { NODE_ENV: "production", NEXT_PUBLIC_SITE_URL: value } });
    const server = await r.load("@/lib/portal/server");
    assert.equal(server.portalOrigin(), "https://www.bandeshaempire.com");
  }
  const r = await runtime({ env: { NODE_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://www.bandeshaempire.com" } });
  const route = await r.load("src/app/auth/callback/route");
  const result = await route.GET(new Request("https://www.bandeshaempire.com/auth/callback?code=test-code"));
  assert.equal(result.headers.get("location"), "https://www.bandeshaempire.com/portal");
});

test("email sign-in preserves order/package intent after a successful provider response", async () => {
  const r = await runtime(), actions = await r.load("src/app/portal/actions");
  await assert.rejects(actions.signIn({}, form()), goesTo(destination));
  assert.equal(r.calls[0][0], "password");
  assert.equal(r.calls[0][1].email, "client@example.com");
});

test("setup gate, invalid input and failed sign-in never enter the workspace", async () => {
  const r = await runtime({ enabled: false }), actions = await r.load("src/app/portal/actions");
  assert.ok((await actions.signIn({}, form())).error);
  assert.ok((await actions.signUp({}, form())).error);
  assert.equal(r.calls.length, 0);
  const ready = await runtime({ auth: { signInWithPassword: async () => ({ error: { message: "invalid" } }) } });
  const liveActions = await ready.load("src/app/portal/actions");
  assert.ok((await liveActions.signIn({}, form({ email: "not-email" }))).error);
  assert.ok((await liveActions.signIn({}, form())).error);
  assert.ok((await liveActions.signUp({}, form({ password: "short" }))).error);
});

test("signup email carries a safe confirmation destination and waits for verification", async () => {
  const r = await runtime(), actions = await r.load("src/app/portal/actions");
  assert.ok((await actions.signUp({}, form())).success);
  const callback = new URL(r.calls[0][1].options.emailRedirectTo);
  assert.equal(callback.origin, "http://localhost:3000");
  assert.equal(callback.pathname, "/auth/confirm");
  assert.equal(callback.searchParams.get("next"), destination);
});

test("Google sign-in requests identity only and preserves the allowlisted destination", async () => {
  const r = await runtime(), actions = await r.load("src/app/portal/actions");
  await assert.rejects(actions.googleSignIn(form()), goesTo("https://accounts.google.com/test-only"));
  const options = r.calls[0][1];
  assert.equal(options.provider, "google");
  assert.equal(options.options.scopes, "email profile");
  assert.equal(new URL(options.options.redirectTo).searchParams.get("next"), destination);
});

test("Google provider errors return to sign-in without losing the chosen package", async () => {
  const r = await runtime({ auth: { signInWithOAuth: async () => ({ data: {}, error: { message: "disabled" } }) } });
  const actions = await r.load("src/app/portal/actions");
  await assert.rejects(actions.googleSignIn(form()), error => {
    const url = new URL(error.location, "http://localhost:3000");
    return url.pathname === "/portal/login" && url.searchParams.get("next") === destination && url.searchParams.get("notice") === "google";
  });
});

test("OAuth callback exchanges the code and strips untrusted redirect fields", async () => {
  const r = await runtime(), route = await r.load("src/app/auth/callback/route");
  const result = await route.GET(new Request(`http://localhost:3000/auth/callback?code=test-code&next=${encodeURIComponent(destination)}`));
  assert.equal(result.status, 303);
  assert.equal(result.headers.get("location"), `http://localhost:3000${destination}`);
  assert.equal(result.headers.get("cache-control"), "private, no-store");
  assert.equal(r.calls[0][0], "exchange");
  const unsafe = await route.GET(new Request("http://localhost:3000/auth/callback?code=test&next=https://evil.example"));
  assert.equal(unsafe.headers.get("location"), "http://localhost:3000/portal");
});

test("cancelled/expired OAuth does not enter the portal or echo provider errors", async () => {
  const r = await runtime({ auth: { exchangeCodeForSession: async () => ({ error: { message: "expired" } }) } });
  const route = await r.load("src/app/auth/callback/route");
  const cancelled = await route.GET(new Request("http://localhost:3000/auth/callback?error=access_denied&error_description=private-provider-message"));
  assert.equal(cancelled.headers.get("location"), "http://localhost:3000/portal/login?notice=cancelled");
  const expired = await route.GET(new Request("http://localhost:3000/auth/callback?code=expired"));
  assert.equal(expired.headers.get("location"), "http://localhost:3000/portal/login?notice=callback");
});

test("email confirmation and recovery verify tokens before selecting a destination", async () => {
  const r = await runtime(), route = await r.load("src/app/auth/confirm/route");
  const confirmed = await route.GET(new Request(`http://localhost:3000/auth/confirm?token_hash=test-token&type=email&next=${encodeURIComponent(destination)}`));
  assert.equal(confirmed.headers.get("location"), `http://localhost:3000${destination}`);
  const recovered = await route.GET(new Request("http://localhost:3000/auth/confirm?token_hash=test-token&type=recovery&next=//evil.example"));
  assert.equal(recovered.headers.get("location"), "http://localhost:3000/portal/reset-password");
  assert.equal(r.calls.length, 2);
  const invalid = await route.GET(new Request("http://localhost:3000/auth/confirm?token_hash=test-token&type=invite"));
  assert.equal(invalid.headers.get("location"), "http://localhost:3000/portal/login?notice=callback");
  assert.equal(r.calls.length, 2);
});

test("default email templates exchange PKCE codes and preserve signup or recovery destinations", async () => {
  for (const next of [destination, "/portal/reset-password", "https://evil.example"]) {
    const r = await runtime(), route = await r.load("src/app/auth/confirm/route");
    const result = await route.GET(new Request(`http://localhost:3000/auth/confirm?code=email-code&next=${encodeURIComponent(next)}`));
    assert.equal(result.headers.get("location"), `http://localhost:3000${next.startsWith("/portal") ? next : "/portal"}`);
    assert.equal(result.headers.get("cache-control"), "private, no-store");
    assert.equal(r.calls[0][0], "exchange");
  }
});

test("invalid or disabled email-code callbacks cannot enter the portal", async () => {
  for (const options of [{ enabled: false }, { auth: { exchangeCodeForSession: async () => ({ error: { message: "expired" } }) } }]) {
    const r = await runtime(options), route = await r.load("src/app/auth/confirm/route");
    const result = await route.GET(new Request("http://localhost:3000/auth/confirm?code=expired"));
    assert.equal(result.headers.get("location"), "http://localhost:3000/portal/login?notice=callback");
  }
  const r = await runtime(), route = await r.load("src/app/auth/confirm/route");
  const denied = await route.GET(new Request("http://localhost:3000/auth/confirm?code=unused&error=access_denied"));
  assert.equal(denied.headers.get("location"), "http://localhost:3000/portal/login?notice=callback");
  assert.equal(r.calls.length, 0);
});

test("signed-out protected routes retain their destination; verified users skip repeat login", async () => {
  const r = await runtime(), server = await r.load("@/lib/portal/server");
  await assert.rejects(server.requirePortalClient(destination), error => new URL(error.location, "http://localhost:3000").searchParams.get("next") === destination);
  assert.equal(r.calls[0][0], "getUser");
  const signedIn = await runtime({ user: { id: "test-client" } }), signedServer = await signedIn.load("@/lib/portal/server");
  await assert.rejects(signedServer.redirectSignedInClient(destination), goesTo(destination));
  assert.equal((await signedServer.requirePortalClient()).user.id, "test-client");
});

test("password recovery sends a verification link, not a password or untrusted return URL", async () => {
  const r = await runtime(), actions = await r.load("src/app/portal/actions");
  assert.ok((await actions.forgotPassword({}, form())).success);
  const callback = new URL(r.calls[0][2].redirectTo);
  assert.equal(callback.pathname, "/auth/confirm");
  assert.equal(callback.searchParams.get("next"), "/portal/reset-password");
});
