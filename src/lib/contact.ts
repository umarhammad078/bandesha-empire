export const CONTACT_EMAIL = "contact@bandeshaempire.com";

// Use this URL in a native <a> so the browser can open the visitor's mail app.
export function getContactEmailHref(subject?: string, body?: string): string {
  const fields: string[] = [];

  if (subject) fields.push(`subject=${encodeURIComponent(subject)}`);
  if (body) {
    const normalizedBody = body.replace(/\r\n|\r|\n/g, "\r\n");
    fields.push(`body=${encodeURIComponent(normalizedBody)}`);
  }

  return `mailto:${CONTACT_EMAIL}${fields.length ? `?${fields.join("&")}` : ""}`;
}
