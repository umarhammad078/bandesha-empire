import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isPortalConfigured, portalOrigin } from "@/lib/portal/server";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const tokenHash = params.get("token_hash"), type = params.get("type");
  if (isPortalConfigured() && tokenHash && (type === "email" || type === "signup" || type === "recovery")) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    if (!error) return NextResponse.redirect(new URL(type === "recovery" ? "/portal/reset-password" : "/portal", portalOrigin()), { status: 303, headers: { "Cache-Control": "private, no-store" } });
  }
  return NextResponse.redirect(new URL("/portal/login?notice=callback", portalOrigin()), { status: 303, headers: { "Cache-Control": "private, no-store" } });
}
