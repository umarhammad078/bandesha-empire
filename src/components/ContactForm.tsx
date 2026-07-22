"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const SERVICES = [
  "AI Automation",
  "Website Development",
  "Web Application",
  "Custom Integrations",
  "Digital Product",
  "Ongoing Support",
  "Not Sure Yet",
];

const BUDGETS = ["Under $2k", "$2k – $5k", "$5k – $15k", "$15k+", "Not sure"];

const TIMELINES = ["As soon as possible", "1–3 months", "3–6 months", "Flexible"];

type Status = "idle" | "submitting" | "success" | "error";

type Fields = {
  fullName: string;
  email: string;
  company: string;
  service: string;
  summary: string;
  budget: string;
  timeline: string;
};

const EMPTY: Fields = {
  fullName: "",
  email: "",
  company: "",
  service: "",
  summary: "",
  budget: "",
  timeline: "",
};

const inputBase =
  "mt-2 w-full rounded-md border border-border bg-white px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted/70 focus:border-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark/40 aria-[invalid=true]:border-accent-dark";
const labelBase =
  "block text-sm font-medium text-foreground";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>(
    {},
  );
  const [status, setStatus] = useState<Status>("idle");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function update<K extends keyof Fields>(key: K, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): Partial<Record<keyof Fields, string>> {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!fields.fullName.trim()) next.fullName = "Please enter your name.";
    if (!fields.email.trim()) next.email = "Please enter your email.";
    else if (!isEmail(fields.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!fields.service) next.service = "Please choose a service.";
    if (!fields.summary.trim())
      next.summary = "Please tell us a little about the project.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    // Honeypot: a bot filled the hidden field — pretend success, insert nothing.
    if (honeypotRef.current?.value) {
      setStatus("success");
      setFields(EMPTY);
      return;
    }

    const found = validate();
    if (Object.keys(found).length > 0) {
      setErrors(found);
      const firstKey = Object.keys(found)[0];
      const el = formRef.current?.querySelector<HTMLElement>(
        `[name="${firstKey}"]`,
      );
      el?.focus();
      return;
    }

    setStatus("submitting");
    try {
      if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
      ) {
        throw new Error("not-configured");
      }

      const supabase = createClient();
      const { error } = await supabase.from("contact_messages").insert({
        full_name: fields.fullName.trim(),
        email: fields.email.trim(),
        company: fields.company.trim() || null,
        service: fields.service,
        project_summary: fields.summary.trim(),
        budget_range: fields.budget || null,
        timeline: fields.timeline || null,
      });

      if (error) throw error;

      setStatus("success");
      setFields(EMPTY);
      setErrors({});
    } catch {
      // Never surface technical details to the visitor.
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-lg border border-border bg-white p-8 shadow-sm"
        role="status"
        aria-live="polite"
      >
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-tint text-accent-dark"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8.5 6.2 11.5 13 4.5" />
          </svg>
        </span>
        <h3 className="mt-4 text-lg font-semibold text-foreground">
          Thanks — your message is in.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          We read every enquiry and will reply with clear next steps. If
          anything is urgent, feel free to send another note.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent-dark hover:text-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark focus-visible:ring-offset-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="rounded-lg border border-border bg-white p-6 shadow-sm sm:p-8"
    >
      {/* Honeypot — visually hidden, off the tab order, ignored by AT. */}
      <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input
          ref={honeypotRef}
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className={labelBase}>
            Full name <span className="text-accent-dark">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            value={fields.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={inputBase}
          />
          {errors.fullName && (
            <p id="fullName-error" className="mt-1.5 text-xs text-accent-dark">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelBase}>
            Email <span className="text-accent-dark">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputBase}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-accent-dark">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="company" className={labelBase}>
            Company or organisation{" "}
            <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            maxLength={160}
            autoComplete="organization"
            value={fields.company}
            onChange={(e) => update("company", e.target.value)}
            className={inputBase}
          />
        </div>

        <div>
          <label htmlFor="service" className={labelBase}>
            Service needed <span className="text-accent-dark">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            value={fields.service}
            onChange={(e) => update("service", e.target.value)}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "service-error" : undefined}
            className={inputBase}
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.service && (
            <p id="service-error" className="mt-1.5 text-xs text-accent-dark">
              {errors.service}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="summary" className={labelBase}>
          Project summary <span className="text-accent-dark">*</span>
        </label>
        <textarea
          id="summary"
          name="summary"
          required
          rows={5}
          maxLength={4000}
          value={fields.summary}
          onChange={(e) => update("summary", e.target.value)}
          placeholder="What are you trying to improve, launch or connect?"
          aria-invalid={!!errors.summary}
          aria-describedby={errors.summary ? "summary-error" : undefined}
          className={`${inputBase} resize-y`}
        />
        {errors.summary && (
          <p id="summary-error" className="mt-1.5 text-xs text-accent-dark">
            {errors.summary}
          </p>
        )}
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className={labelBase}>
            Budget range{" "}
            <span className="font-normal text-muted">(optional)</span>
          </label>
          <select
            id="budget"
            name="budget"
            value={fields.budget}
            onChange={(e) => update("budget", e.target.value)}
            className={inputBase}
          >
            <option value="">Prefer not to say</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="timeline" className={labelBase}>
            Project timeline{" "}
            <span className="font-normal text-muted">(optional)</span>
          </label>
          <select
            id="timeline"
            name="timeline"
            value={fields.timeline}
            onChange={(e) => update("timeline", e.target.value)}
            className={inputBase}
          >
            <option value="">No fixed timeline</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-lg bg-accent-deep px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
        <p className="text-xs leading-relaxed text-muted">
          We use your details only to respond to this enquiry.
        </p>
      </div>

      {/* Live region for submission status */}
      <div aria-live="polite" className="sr-only">
        {status === "submitting" ? "Sending your message." : ""}
      </div>
      {status === "error" && (
        <p
          role="alert"
          className="mt-4 rounded-md border border-border bg-surface px-4 py-3 text-sm text-foreground"
        >
          Something went wrong sending your message. Please try again in a
          moment—your details have been kept.
        </p>
      )}
    </form>
  );
}
