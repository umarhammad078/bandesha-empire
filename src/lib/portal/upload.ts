import { createClient } from "@/lib/supabase/client";
import { validateUpload, type ActionResult } from "@/lib/portal";

// Upload directly to private Storage, not through a serverless request-body limit.
// Both the object and its metadata are independently protected by database RLS.
export async function uploadPortalFile(form: FormData): Promise<ActionResult> {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return { error: "Please sign in again before uploading a file." };
  const file = form.get("file"), orderId = String(form.get("order_id") ?? "");
  if (!(file instanceof File)) return { error: "Please choose a file to upload." };
  const invalid = validateUpload(file);
  if (invalid) return { error: invalid };
  if (orderId) {
    const order = await supabase.from("portal_orders").select("id").eq("id", orderId).eq("client_id", user.id).maybeSingle();
    if (!order.data) return { error: "Please choose one of your own projects." };
  }
  const extension = file.name.split(".").pop()?.replace(/[^a-z0-9]/gi, "").slice(0, 10) || "file";
  const path = `${user.id}/${crypto.randomUUID()}.${extension}`;
  const upload = await supabase.storage.from("portal-files").upload(path, file, { contentType: file.type, upsert: false });
  if (upload.error) return { error: "We couldn't upload your file. Please check the format and try again." };
  const record = await supabase.from("portal_files").insert({ client_id: user.id, order_id: orderId || null, name: file.name, storage_path: path, size_bytes: file.size, mime_type: file.type });
  if (record.error) {
    await supabase.storage.from("portal-files").remove([path]);
    return { error: "The upload couldn't be attached to your workspace. Please try again." };
  }
  return { success: "File uploaded to your private workspace." };
}
