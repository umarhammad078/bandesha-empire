"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isPortalConfigured, portalOrigin, requirePortalClient } from "@/lib/portal/server";
import { validateOrder, type ActionResult } from "@/lib/portal";

const SETUP_MESSAGE = "Client sign-in is being prepared. Please contact the studio for access.";
const emailValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;

export async function signIn(_: ActionResult, form: FormData): Promise<ActionResult> {
  if (!isPortalConfigured()) return { error: SETUP_MESSAGE };
  const email = String(form.get("email") ?? "").trim(), password = String(form.get("password") ?? "");
  if (!emailValid(email) || !password || password.length > 256) return { error: "Please enter a valid email and password." };
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "We couldn't sign you in. Check your details and confirm your email before trying again." };
  redirect("/portal");
}

export async function signUp(_: ActionResult, form: FormData): Promise<ActionResult> {
  if (!isPortalConfigured()) return { error: SETUP_MESSAGE };
  const email = String(form.get("email") ?? "").trim(), password = String(form.get("password") ?? "");
  const fullName = String(form.get("full_name") ?? "").trim();
  if (fullName.length < 2 || fullName.length > 120) return { error: "Please enter your full name (2–120 characters)." };
  if (!emailValid(email)) return { error: "Please enter a valid email address." };
  if (password.length < 10 || password.length > 256) return { error: "Choose a password with at least 10 characters." };
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName }, emailRedirectTo: `${portalOrigin()}/auth/callback` } });
  if (error) return { error: "We couldn't create your account. Please try again, or sign in if you already have one." };
  if (data.session) redirect("/portal");
  return { success: "Check your inbox for the confirmation link. Once your email is confirmed, you can enter your workspace." };
}

export async function googleSignIn(): Promise<void> {
  if (!isPortalConfigured()) redirect("/portal/login?notice=setup");
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${portalOrigin()}/auth/callback`, scopes: "email profile", queryParams: { prompt: "select_account" } } });
  if (error || !data.url) redirect("/portal/login?notice=google");
  redirect(data.url);
}

export async function forgotPassword(_: ActionResult, form: FormData): Promise<ActionResult> {
  if (!isPortalConfigured()) return { error: SETUP_MESSAGE };
  const email = String(form.get("email") ?? "").trim();
  if (!emailValid(email)) return { error: "Please enter a valid email address." };
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${portalOrigin()}/auth/callback?next=/portal/reset-password` });
  if (error) return { error: "We couldn't request a reset link right now. Please try again in a moment." };
  // A generic message prevents email-address enumeration.
  return { success: "If an account exists for this email, you'll receive a password reset link shortly. Check your spam folder too." };
}

export async function resetPassword(_: ActionResult, form: FormData): Promise<ActionResult> {
  const { supabase } = await requirePortalClient();
  const password = String(form.get("password") ?? "");
  if (password.length < 10 || password.length > 256) return { error: "Choose a password with at least 10 characters." };
  if (password !== form.get("confirm_password")) return { error: "The two passwords don't match." };
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: "We couldn't update your password. Request a new reset link and try again." };
  redirect("/portal");
}

export async function signOut(): Promise<void> {
  if (isPortalConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/portal/login");
}

export async function createOrder(form: FormData): Promise<ActionResult> {
  const { supabase, user } = await requirePortalClient();
  const result = validateOrder(form);
  if (result.error || !result.data) return { error: result.error };
  const { data, error } = await supabase.from("portal_orders").insert({ ...result.data, client_id: user.id }).select("id").single();
  if (error?.code === "23505") {
    const existing = await supabase.from("portal_orders").select("id").eq("client_id", user.id).eq("client_request_id", result.data.client_request_id).single();
    if (existing.data) return { success: "Your order is already in your workspace.", id: existing.data.id };
  }
  if (error) return { error: "Your brief couldn't be saved. Your details are still here; please try again." };
  revalidatePath("/portal");
  return { success: "Your brief is in. We will confirm the scope and next steps with you.", id: data.id };
}

export async function sendMessage(form: FormData): Promise<ActionResult> {
  const { supabase, user } = await requirePortalClient();
  const body = String(form.get("body") ?? "").trim(), orderId = String(form.get("order_id") ?? "");
  if (!body || body.length > 4000) return { error: "Write a message between 1 and 4,000 characters." };
  if (orderId && !/^[\da-f-]{36}$/i.test(orderId)) return { error: "Please select a project from your workspace." };
  // The composite foreign key also checks that the project belongs to this client.
  const { error } = await supabase.from("portal_messages").insert({ client_id: user.id, order_id: orderId || null, body });
  if (error) return { error: "Your message couldn't be sent. Please try again." };
  revalidatePath("/portal");
  return { success: "Message sent to the studio." };
}

export async function markMessagesRead(): Promise<ActionResult> {
  const { supabase, user } = await requirePortalClient();
  const { error } = await supabase.from("portal_messages").update({ read_at: new Date().toISOString() }).eq("client_id", user.id).eq("sender_role", "studio").is("read_at", null);
  if (error) return { error: "We couldn't update your read messages." };
  revalidatePath("/portal");
  return { success: "Messages marked as read." };
}

export async function updateProfile(form: FormData): Promise<ActionResult> {
  const { supabase, user } = await requirePortalClient();
  const fullName = String(form.get("full_name") ?? "").trim(), company = String(form.get("company") ?? "").trim();
  if (fullName.length < 2 || fullName.length > 120 || company.length > 160) return { error: "Use a name of 2–120 characters and a company name under 160 characters." };
  const existing = await supabase.from("portal_profiles").select("user_id").eq("user_id", user.id).maybeSingle();
  const result = existing.data
    ? await supabase.from("portal_profiles").update({ full_name: fullName, company }).eq("user_id", user.id)
    : await supabase.from("portal_profiles").insert({ user_id: user.id, full_name: fullName, company });
  if (result.error) return { error: "Your profile couldn't be saved. Please try again." };
  revalidatePath("/portal");
  return { success: "Your profile has been updated." };
}

export async function downloadFile(fileId: string): Promise<{ url?: string; error?: string }> {
  const { supabase, user } = await requirePortalClient();
  const record = await supabase.from("portal_files").select("storage_path,name").eq("id", fileId).eq("client_id", user.id).maybeSingle();
  if (!record.data) return { error: "This file is not available in your workspace." };
  const { data, error } = await supabase.storage.from("portal-files").createSignedUrl(record.data.storage_path, 60, { download: record.data.name });
  if (error) return { error: "We couldn't prepare this download. Please try again." };
  return { url: data.signedUrl };
}
