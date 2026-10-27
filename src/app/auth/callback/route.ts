import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isPortalConfigured, portalOrigin } from "@/lib/portal/server";
import { safeAuthNext } from "@/lib/portal";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (isPortalConfigured() && code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(safeAuthNext(url.searchParams.get("next")), portalOrigin()), { status: 303, headers: { "Cache-Control": "private, no-store" } });
  }
  return NextResponse.redirect(new URL("/portal/login?notice=callback", portalOrigin()), { status: 303, headers: { "Cache-Control": "private, no-store" } });
}
