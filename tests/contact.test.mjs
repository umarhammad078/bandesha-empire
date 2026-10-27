import assert from "node:assert/strict";
import test from "node:test";
import {
  CONTACT_EMAIL,
  getContactEmailHref,
  getNativeContactEmailHref,
} from "../src/lib/contact.ts";

test("email links open Gmail compose with the business as recipient, not sender", () => {
  const url = new URL(getContactEmailHref());
  assert.equal(url.origin, "https://mail.google.com");
  assert.equal(url.pathname, "/mail/");
  assert.equal(url.searchParams.get("view"), "cm");
  assert.equal(url.searchParams.get("fs"), "1");
  assert.equal(url.searchParams.get("to"), CONTACT_EMAIL);
  assert.equal(url.searchParams.has("from"), false);
  assert.equal(url.searchParams.has("authuser"), false);
});

test("Gmail preserves the full subject and message without extra recipients", () => {
  const subject = "Let's plan a project — A+B & growth? #1";
  const body = "Hello,\n\nBudget: $1,000 + support\nA&B = 100%\nThank you.";
  const url = new URL(getContactEmailHref(subject, body));
  assert.equal(url.searchParams.get("su"), subject);
  assert.equal(url.searchParams.get("body"), body);
  assert.deepEqual(url.searchParams.getAll("to"), [CONTACT_EMAIL]);
  assert.equal(url.searchParams.has("bcc"), false);
});

test("existing service-specific subject suffixes remain part of the subject", () => {
  const url = new URL(`${getContactEmailHref("Let's plan a project")}%20%E2%80%94%20Focused%20build`);
  assert.equal(url.searchParams.get("su"), "Let's plan a project — Focused build");
  assert.equal(url.searchParams.get("to"), CONTACT_EMAIL);
});

test("other mail apps receive a native mailto with the same recipient", () => {
  assert.equal(getNativeContactEmailHref(), `mailto:${CONTACT_EMAIL}`);
  const href = getNativeContactEmailHref("A+B & growth", "Line 1\nLine 2\rLine 3\r\nLine 4");
  const url = new URL(href);
  assert.equal(url.protocol, "mailto:");
  assert.equal(url.pathname, CONTACT_EMAIL);
  assert.equal(url.searchParams.get("subject"), "A+B & growth");
  assert.equal(url.searchParams.get("body"), "Line 1\r\nLine 2\r\nLine 3\r\nLine 4");
  assert.ok(href.includes("A%2BB%20%26%20growth"));
});
