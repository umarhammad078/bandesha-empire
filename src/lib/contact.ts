export const CONTACT_EMAIL = "contact@bandeshaempire.com";

// Open a Gmail draft without depending on the visitor's OS mailto handler.
// Do not specify a sender or account index: the visitor uses their own account.
export function getContactEmailHref(subject?: string, body?: string): string {
  const fields = ["view=cm", "fs=1", `to=${encodeURIComponent(CONTACT_EMAIL)}`];

  if (subject) fields.push(`su=${encodeURIComponent(subject)}`);
  if (body) fields.push(`body=${encodeURIComponent(body)}`);

  return `https://mail.google.com/mail/?${fields.join("&")}`;
}

// Keep a native option for Apple Mail, Outlook and other configured mail apps.
export function getNativeContactEmailHref(subject?: string, body?: string): string {
  const fields: string[] = [];

  if (subject) fields.push(`subject=${encodeURIComponent(subject)}`);
  if (body) {
    const normalizedBody = body.replace(/\r\n|\r|\n/g, "\r\n");
    fields.push(`body=${encodeURIComponent(normalizedBody)}`);
  }

  return `mailto:${CONTACT_EMAIL}${fields.length ? `?${fields.join("&")}` : ""}`;
}
