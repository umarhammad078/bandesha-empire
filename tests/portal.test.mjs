import assert from "node:assert/strict";
import test from "node:test";
import { validateOrder, validateUpload, safeAuthNext, portalAuthHref, startProjectHref, portalPackage, portalView, money, orderReference, MAX_FILE_SIZE } from "../src/lib/portal.ts";

function brief(overrides = {}) {
  const form = new FormData();
  Object.entries({ title: "Our new business website", service: "Website & Experience", package: "growth", brief: "We need a clear, accessible website that introduces our business and connects customers to our team.", timeline: "Within 4 weeks", budget: "$1,000–$2,500", website_url: "https://example.com", request_id: "12345678-1234-4234-8234-123456789abc", ...overrides }).forEach(([key, value]) => form.set(key, value));
  return form;
}

test("order validation returns only client-writable brief fields", () => {
  const result = validateOrder(brief({ client_id: "another-client", status: "completed", progress: "100", quoted_amount_cents: "1", due_date: "2026-01-01" }));
  assert.ok(result.data);
  for (const field of ["client_id", "status", "progress", "quoted_amount_cents", "due_date"]) assert.equal(field in result.data, false);
  assert.equal(result.data.package, "growth");
});

test("orders reject incomplete briefs, unknown packages and unknown services", () => {
  for (const fields of [{ title: "a" }, { brief: "too short" }, { package: "free" }, { service: "not a service" }, { request_id: "not-a-uuid" }, { title: "a".repeat(121) }, { brief: "a".repeat(6001) }]) assert.ok(validateOrder(brief(fields)).error);
});

test("website links cannot use executable or local URL protocols", () => {
  for (const url of ["javascript:alert(1)", "data:text/html,test", "file:///etc/passwd", "example.com"]) assert.ok(validateOrder(brief({ website_url: url })).error);
  assert.ok(validateOrder(brief({ website_url: "" })).data);
  assert.ok(validateOrder(brief({ website_url: "https://example.com/?a=1&b=2" })).data);
});

test("safe authentication destinations never accept external redirects", () => {
  for (const input of [null, undefined, ["/portal"], "https://evil.example", "//evil.example", "/\\evil.example", "/portal/preview", "/admin", "/portal/../admin", "/portal?view=admin", "/portal?next=https://evil.example", "/portal#//evil.example", "/portal?view=orders\nLocation:evil", "/portal?view=%2F%2Fevil.example"]) assert.equal(safeAuthNext(input), "/portal");
  assert.equal(safeAuthNext("/portal/reset-password"), "/portal/reset-password");
});

test("login destinations retain only known workspace intent and package choices", () => {
  assert.equal(safeAuthNext("/portal?view=orders"), "/portal?view=orders");
  assert.equal(safeAuthNext("/portal?action=new-order&package=starter&admin=true"), "/portal?view=orders&action=new-order&package=starter");
  assert.equal(safeAuthNext("/portal?view=messages&action=new-order&package=free"), "/portal?view=orders&action=new-order&package=growth");
  assert.equal(portalPackage("custom"), "custom");
  assert.equal(portalPackage("unknown"), "growth");
  assert.equal(startProjectHref("starter"), "/portal?view=orders&action=new-order&package=starter");
  for (const mode of ["login", "signup", "forgot-password"]) {
    const link = new URL(portalAuthHref(mode, startProjectHref("custom")), "https://example.com");
    assert.equal(link.pathname, `/portal/${mode}`);
    assert.equal(link.searchParams.get("next"), startProjectHref("custom"));
  }
  assert.equal(portalAuthHref("login", "//evil.example"), "/portal/login");
});

test("workspace views are explicitly allowlisted", () => {
  assert.equal(portalView("messages"), "messages");
  assert.equal(portalView("settings"), "settings");
  assert.equal(portalView("admin"), "overview");
  assert.equal(portalView(undefined), "overview");
});

test("private uploads enforce size, type and unsafe file-name restrictions", () => {
  assert.equal(validateUpload({ name: "brief.pdf", type: "application/pdf", size: 1024 }), null);
  assert.equal(validateUpload({ name: "assets.zip", type: "application/x-zip-compressed", size: 2048 }), null);
  assert.ok(validateUpload({ name: "empty.pdf", type: "application/pdf", size: 0 }));
  assert.ok(validateUpload({ name: "large.pdf", type: "application/pdf", size: MAX_FILE_SIZE + 1 }));
  assert.ok(validateUpload({ name: "script.svg", type: "image/svg+xml", size: 1024 }));
  assert.ok(validateUpload({ name: "script.html", type: "application/pdf", size: 1024 }));
  assert.ok(validateUpload({ name: "application.exe", type: "application/zip", size: 1024 }));
});

test("project references and cents-based amounts have stable display formatting", () => {
  assert.equal(orderReference(42), "BE-0042");
  assert.equal(money(100000), "$1,000");
  assert.equal(money(50000), "$500");
  assert.equal(money(12345), "$123.45");
});
