import nextEnv from "@next/env";

// Read-only readiness checks. Never print keys, tokens, passwords or responses.
nextEnv.loadEnvConfig(process.cwd());
let blockers = 0;
function report(ok, message) {
  console.log(`${ok ? "OK" : "NEEDS SETUP"} — ${message}`);
  if (!ok) blockers++;
}

const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";
let keySafe = key.startsWith("sb_publishable_");
if (!keySafe && key.split(".").length === 3) {
  try { keySafe = JSON.parse(Buffer.from(key.split(".")[1], "base64url").toString()).role === "anon"; } catch { /* Invalid key. */ }
}
report(keySafe, "Use the project's public publishable/anon key, never a secret or service-role key.");

let projectUrl;
try {
  projectUrl = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || "");
  if (projectUrl.protocol !== "https:" || projectUrl.username || projectUrl.password || projectUrl.pathname !== "/" || projectUrl.search || projectUrl.hash) projectUrl = undefined;
} catch { /* Missing/invalid project URL. */ }
report(Boolean(projectUrl), "A valid HTTPS Supabase project URL is required.");

let siteReady = false;
try {
  const site = new URL(process.env.NEXT_PUBLIC_SITE_URL || "");
  siteReady = (site.protocol === "https:" || (site.protocol === "http:" && site.hostname === "localhost")) && !site.username && !site.password && site.pathname === "/" && !site.search && !site.hash;
} catch { /* Missing/invalid website origin. */ }
report(siteReady, "Set NEXT_PUBLIC_SITE_URL to the exact website origin (localhost for local testing).");

if (projectUrl && keySafe) {
  try {
    const response = await fetch(new URL("/auth/v1/settings", projectUrl), { headers: { apikey: key }, redirect: "error", signal: AbortSignal.timeout(8000) });
    if (!response.ok) report(false, `Supabase did not accept the connection (HTTP ${response.status}). Recheck the project and public key.`);
    else {
      const settings = await response.json();
      report(true, "Supabase authentication is reachable.");
      report(settings.external?.email === true, "Email/password provider must be enabled.");
      report(settings.external?.google === true, "Google provider must be enabled with your Google OAuth credentials.");
      report(settings.disable_signup === false, "New client registration must be enabled.");
      report(settings.mailer_autoconfirm === false, "Email confirmation must remain enabled.");
    }
  } catch {
    report(false, "Supabase could not be reached. Check the project URL, project status and network connection.");
  }
}

report(process.env.PORTAL_ENABLED === "true", "Keep PORTAL_ENABLED=false until migration/provider/SMTP setup is complete, then set it to true.");
console.log("\nManual checks still required: database migration, private storage/RLS, Google callback URLs, verified SMTP, and two real test accounts. This check never signs anyone in or changes your project.");
console.log("Setup guide: docs/CLIENT_PORTAL_SETUP.md");
process.exitCode = blockers ? 1 : 0;
