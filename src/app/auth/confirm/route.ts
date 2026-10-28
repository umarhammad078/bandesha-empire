import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isPortalConfigured, portalOrigin } from "@/lib/portal/server";
import { portalAuthHref, safeAuthNext } from "@/lib/portal";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const tokenHash = params.get("token_hash"), type = params.get("type");
  const code = params.get("code");
  const next = safeAuthNext(params.get("next"));
  // Default Supabase email templates return a PKCE code to RedirectTo.
  // Custom token-hash templates below also work when opened on another device.
  if (isPortalConfigured() && code && !tokenHash && !params.has("error")) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, portalOrigin()), { status: 303, headers: { "Cache-Control": "private, no-store" } });
  }
  if (isPortalConfigured() && !params.has("error") && tokenHash && (type === "email" || type === "signup" || type === "recovery")) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    if (!error) return NextResponse.redirect(new URL(type === "recovery" ? "/portal/reset-password" : next, portalOrigin()), { status: 303, headers: { "Cache-Control": "private, no-store" } });
  }
  return NextResponse.redirect(new URL(portalAuthHref("login", next, "callback"), portalOrigin()), { status: 303, headers: { "Cache-Control": "private, no-store" } });
}
