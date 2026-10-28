export const PORTAL_VIEWS = ["overview", "orders", "messages", "invoices", "files", "support", "settings"] as const;
export type PortalView = (typeof PORTAL_VIEWS)[number];
export const PORTAL_SERVICES = ["Website & Experience", "Web Applications", "AI Agents & Automation", "Shopify & Commerce", "Mobile Applications", "Connected Systems"] as const;
export const PORTAL_PACKAGES = ["starter", "growth", "custom"] as const;
export const ORDER_STATUS = {
  submitted: "Brief received",
  scoping: "Planning",
  in_progress: "In progress",
  in_review: "Ready for review",
  completed: "Completed",
  cancelled: "Cancelled",
} as const;
export type OrderStatus = keyof typeof ORDER_STATUS;
export type PortalOrder = {
  id: string; order_number: number; client_id: string; title: string; service: string;
  package: string; brief: string; budget: string; timeline: string; website_url: string;
  status: OrderStatus; progress: number; quoted_amount_cents: number | null;
  due_date: string | null; created_at: string; updated_at: string;
};
export type PortalMessage = {
  id: string; client_id: string; order_id: string | null; sender_role: "client" | "studio";
  body: string; created_at: string; read_at: string | null;
};
export type PortalEvent = {
  id: string; order_id: string; title: string; description: string; created_at: string;
};
export type PortalInvoice = {
  id: string; client_id: string; order_id: string | null; invoice_number: string;
  description: string; amount_cents: number; status: "issued" | "paid" | "void";
  due_date: string | null; paid_at: string | null; created_at: string;
};
export type PortalFile = {
  id: string; client_id: string; order_id: string | null; name: string;
  storage_path: string; size_bytes: number; mime_type: string; created_at: string;
};
export type PortalProfile = { full_name: string; company: string; email: string; id: string };
export type PortalData = {
  profile: PortalProfile; orders: PortalOrder[]; messages: PortalMessage[];
  events: PortalEvent[]; invoices: PortalInvoice[]; files: PortalFile[]; loadError?: boolean;
};
export type ActionResult = { error?: string; success?: string; id?: string };

export function portalView(value: unknown): PortalView {
  return PORTAL_VIEWS.includes(value as PortalView) ? value as PortalView : "overview";
}

export function orderReference(number: number) {
  return `BE-${String(number).padStart(4, "0")}`;
}

export function money(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: cents % 100 === 0 ? 0 : 2, maximumFractionDigits: 2 }).format(cents / 100);
}

export function portalPackage(value: unknown) {
  return PORTAL_PACKAGES.includes(value as (typeof PORTAL_PACKAGES)[number]) ? String(value) : "growth";
}

export function startProjectHref(plan?: string) {
  const params = new URLSearchParams({ view: "orders", action: "new-order" });
  if (plan) params.set("package", portalPackage(plan));
  return `/portal?${params}`;
}

// Rebuild only known workspace destinations. Never redirect to arbitrary URLs,
// preview routes, nested next parameters, or unknown client-supplied query fields.
export function safeAuthNext(value: unknown): string {
  if (value === "/portal/reset-password") return value;
  if (typeof value !== "string" || value.length > 300 || !/^\/portal(?:\?|$)/.test(value) || /[\\#\s]/.test(value)) return "/portal";
  const input = new URL(value, "https://portal.invalid").searchParams;
  const params = new URLSearchParams();
  const view = portalView(input.get("view"));
  if (view !== "overview") params.set("view", view);
  if (input.get("action") === "new-order") {
    params.set("view", "orders");
    params.set("action", "new-order");
    if (input.has("package")) params.set("package", portalPackage(input.get("package")));
  }
  return params.size ? `/portal?${params}` : "/portal";
}

export function portalAuthHref(mode: "login" | "signup" | "forgot-password", next: unknown = "/portal", notice?: string) {
  const params = new URLSearchParams();
  const destination = safeAuthNext(next);
  if (destination !== "/portal") params.set("next", destination);
  if (notice) params.set("notice", notice);
  return `/portal/${mode}${params.size ? `?${params}` : ""}`;
}

export function validateOrder(form: FormData) {
  const text = (key: string) => String(form.get(key) ?? "").trim();
  const title = text("title"), brief = text("brief"), service = text("service"), plan = text("package");
  const timeline = text("timeline"), budget = text("budget"), website = text("website_url");
  const requestId = text("request_id");
  if (title.length < 3 || title.length > 120) return { error: "Give your project a name between 3 and 120 characters." };
  if (brief.length < 30 || brief.length > 6000) return { error: "Tell us a little more about your project (30–6,000 characters)." };
  if (!PORTAL_SERVICES.includes(service as typeof PORTAL_SERVICES[number])) return { error: "Please choose one of our services." };
  if (!PORTAL_PACKAGES.includes(plan as typeof PORTAL_PACKAGES[number])) return { error: "Please choose a package or a custom scope." };
  if (timeline.length > 120 || budget.length > 120) return { error: "Please shorten the budget or timeline field." };
  if (website) {
    try { const url = new URL(website); if (!["https:", "http:"].includes(url.protocol) || website.length > 500) throw new Error(); }
    catch { return { error: "Use a complete website URL, starting with https://, or leave it empty." }; }
  }
  if (!/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i.test(requestId)) return { error: "Please reopen the order form and try again." };
  return { data: { title, brief, service, package: plan, timeline, budget, website_url: website, client_request_id: requestId } };
}

export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const FILE_TYPES = ["application/pdf", "image/png", "image/jpeg", "image/webp", "text/plain", "application/zip", "application/x-zip-compressed", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
export function validateUpload(file: { size: number; type: string; name: string }) {
  if (file.size < 1 || file.size > MAX_FILE_SIZE) return "Choose a non-empty file smaller than 10 MB.";
  if (!FILE_TYPES.includes(file.type)) return "Use a PDF, PNG, JPG, WebP, TXT, ZIP or DOCX file.";
  if (file.name.length > 180 || /\.(html?|svg|js|exe|sh)$/i.test(file.name)) return "This file name or format is not supported.";
  return null;
}
