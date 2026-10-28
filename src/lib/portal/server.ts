import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { portalAuthHref, safeAuthNext, type PortalData } from "@/lib/portal";

export function isPortalConfigured() {
  return process.env.PORTAL_ENABLED === "true" && Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}

export function portalOrigin() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) {
    try {
      const url = new URL(configured);
      const safeProtocol = url.protocol === "https:" || (process.env.NODE_ENV === "development" && url.protocol === "http:" && url.hostname === "localhost");
      if (safeProtocol && !url.username && !url.password) return url.origin;
    } catch { /* The setup checker reports invalid origins; never trust a forwarded Host. */ }
  }
  return process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.bandeshaempire.com";
}

export async function redirectSignedInClient(next: unknown) {
  if (!isPortalConfigured()) return;
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (user && !error) redirect(safeAuthNext(next));
}

export async function requirePortalClient(next: unknown = "/portal") {
  if (!isPortalConfigured()) redirect(portalAuthHref("login", next, "setup"));
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect(portalAuthHref("login", next));
  return { supabase, user };
}

export async function loadPortalData(next: unknown = "/portal"): Promise<PortalData> {
  const { supabase, user } = await requirePortalClient(next);
  const [profile, orders, messages, events, invoices, files] = await Promise.all([
    supabase.from("portal_profiles").select("full_name,company").eq("user_id", user.id).maybeSingle(),
    supabase.from("portal_orders").select("*").eq("client_id", user.id).order("created_at", { ascending: false }).limit(100),
    supabase.from("portal_messages").select("*").eq("client_id", user.id).order("created_at", { ascending: false }).limit(200),
    supabase.from("portal_order_events").select("*").order("created_at", { ascending: false }).limit(200),
    supabase.from("portal_invoices").select("*").eq("client_id", user.id).order("created_at", { ascending: false }).limit(100),
    supabase.from("portal_files").select("*").eq("client_id", user.id).order("created_at", { ascending: false }).limit(100),
  ]);
  const loadError = [profile, orders, messages, events, invoices, files].some(result => result.error);
  const metadataName = typeof user.user_metadata?.full_name === "string" ? user.user_metadata.full_name.slice(0, 120) : "Client";
  return {
    profile: { id: user.id, email: user.email ?? "", full_name: profile.data?.full_name || metadataName || "Client", company: profile.data?.company || "" },
    orders: orders.data ?? [], messages: (messages.data ?? []).reverse(), events: events.data ?? [],
    invoices: invoices.data ?? [], files: files.data ?? [], loadError,
  };
}
