"use client";

import { useRef, useState, type FormEvent } from "react";
import { PORTAL_SERVICES, validateOrder, validateUpload, type ActionResult, type PortalOrder, type PortalProfile } from "@/lib/portal";
import Icon from "./PortalIcons";
import styles from "./portal.module.css";

type Submit = (form: FormData) => Promise<ActionResult>;
const formError = "Something didn't go through. Your details are still here; please try again.";

export function NewOrderForm({ onSubmit, preview }: { onSubmit: Submit; preview: boolean }) {
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState("growth");
  const [fields, setFields] = useState({ title: "", service: "Website & Experience", brief: "", timeline: "Within 4 weeks", budget: "Let's define the scope", website_url: "" });
  const [requestId] = useState(() => crypto.randomUUID());
  const [pending, setPending] = useState(false), [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const update = (key: keyof typeof fields, value: string) => setFields(old => ({ ...old, [key]: value }));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    // Enter must never bypass the explicit review-and-send step.
    if (step < 3) {
      if (step === 1 || formRef.current?.reportValidity()) setStep(step + 1);
      return;
    }
    const form = new FormData();
    Object.entries(fields).forEach(([key, value]) => form.set(key, value));
    form.set("package", plan); form.set("request_id", requestId);
    const invalid = validateOrder(form);
    if (invalid.error) { setStep(2); setError(invalid.error); return; }
    setPending(true); setError("");
    try { const result = await onSubmit(form); if (result.error) setError(result.error); }
    catch { setError(formError); }
    finally { setPending(false); }
  }

  return <form ref={formRef} onSubmit={submit} className={styles.orderForm}>
    <div className={styles.formSteps} aria-label={`Step ${step} of 3`}>
      {["Starting point", "Your brief", "Review & send"].map((label, index) => <span key={label} className={step >= index + 1 ? styles.stepActive : ""}><b>{step > index + 1 ? <Icon name="check" /> : index + 1}</b>{label}</span>)}
    </div>
    {step === 1 && <div className={styles.formSection}>
      <h3>A foundation that fits.</h3><p>Pick a starting point. We agree the final scope and price before any work begins.</p>
      <fieldset className={styles.packageChoices}><legend className={styles.srOnly}>Choose a package</legend>{[{ id: "starter", name: "Starter", price: "$500", detail: "A focused business website. Up to 5 designed pages." }, { id: "growth", name: "Growth", price: "$1,000", detail: "A more connected presence. Up to 10 designed pages." }, { id: "custom", name: "Custom", price: "Let's talk", detail: "Commerce, apps, automation or a scope of your own." }].map(item => <label key={item.id} className={plan === item.id ? styles.selectedPackage : ""}><input type="radio" name="package" value={item.id} checked={plan === item.id} onChange={() => setPlan(item.id)} /><span>{item.name}<i aria-hidden="true">{plan === item.id ? "✓" : ""}</i></span><strong>{item.price}</strong><small>{item.detail}</small></label>)}</fieldset>
      <p className={styles.formNote}><Icon name="shield" />No payment is taken when you submit a brief. All amounts shown are USD.</p>
    </div>}
    {step === 2 && <div className={styles.formSection}>
      <h3>Tell us what you have in mind.</h3><p>The goal, the context and what a good result looks like.</p>
      <div className={styles.fields}>
        <label className={styles.fullField}>Project name<input name="title" value={fields.title} onChange={e => update("title", e.target.value)} required minLength={3} maxLength={120} placeholder="e.g. A new website for our next chapter" /></label>
        <label className={styles.fullField}>Service<select name="service" value={fields.service} onChange={e => update("service", e.target.value)}>{PORTAL_SERVICES.map(service => <option key={service}>{service}</option>)}</select></label>
        <label className={styles.fullField}>Your project brief<textarea name="brief" value={fields.brief} onChange={e => update("brief", e.target.value)} required minLength={30} maxLength={6000} rows={4} placeholder="What does your business do, what needs to change, and what would you like us to build?" /><small>At least 30 characters. Share links or context, but never passwords or secret keys.</small></label>
        <label>Preferred timeline<select name="timeline" value={fields.timeline} onChange={e => update("timeline", e.target.value)}>{["Within 2 weeks", "Within 4 weeks", "1–3 months", "Flexible"].map(value => <option key={value}>{value}</option>)}</select></label>
        <label>Budget range<select name="budget" value={fields.budget} onChange={e => update("budget", e.target.value)}>{["Let's define the scope", "$500–$1,000", "$1,000–$2,500", "$2,500–$5,000", "$5,000+"].map(value => <option key={value}>{value}</option>)}</select></label>
        <label className={styles.fullField}>Existing website <small>Optional</small><input name="website_url" type="url" value={fields.website_url} onChange={e => update("website_url", e.target.value)} maxLength={500} placeholder="https://yourwebsite.com" /></label>
      </div>
    </div>}
    {step === 3 && <div className={styles.formSection}>
      <h3>A clear brief. A good beginning.</h3><p>One last look before it reaches the studio.</p>
      <div className={styles.briefReview}><span>{plan.toUpperCase()} · {fields.service}</span><h4>{fields.title}</h4><p>{fields.brief}</p><dl><div><dt>Timeline</dt><dd>{fields.timeline}</dd></div><div><dt>Budget</dt><dd>{fields.budget}</dd></div></dl>{fields.website_url && <small>{fields.website_url}</small>}</div>
      <p className={styles.formNote}><Icon name="messages" />{preview ? "This is a design preview. Your brief stays in this sample workspace and is not sent." : "We'll review your brief and reply here with a considered scope, a clear price and next steps."}</p>
    </div>}
    {error && <p className={styles.formError} role="alert">{error}</p>}
    <div className={styles.formActions}>{step > 1 ? <button type="button" className={styles.secondaryButton} disabled={pending} onClick={() => { setStep(step - 1); setError(""); }}><span aria-hidden="true">←</span> Back</button> : <span className={styles.quietNote}>A good place to start.</span>}{step < 3 ? <button key={`continue-${step}`} type="button" className={styles.primaryButton} onClick={event => { event.preventDefault(); if (step === 1 || formRef.current?.reportValidity()) { setError(""); setStep(step + 1); } }}>{step === 1 ? "Continue to your brief" : "Review your brief"}<Icon name="arrow" /></button> : <button key="send-brief" type="submit" className={styles.primaryButton} disabled={pending}>{pending ? "Saving your brief…" : preview ? "Add preview order" : "Submit project brief"}<Icon name="arrow" /></button>}</div>
  </form>;
}

export function MessageForm({ orders, orderId = "", onSubmit, preview, support = false }: { orders: PortalOrder[]; orderId?: string; onSubmit: Submit; preview: boolean; support?: boolean }) {
  const [pending, setPending] = useState(false), [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (pending) return;
    const element = event.currentTarget, form = new FormData(element);
    if (support) form.set("body", `[Support · ${form.get("topic")}]\n${form.get("body")}`);
    setPending(true); setError("");
    try { const result = await onSubmit(form); if (result.error) setError(result.error); else element.reset(); }
    catch { setError(formError); } finally { setPending(false); }
  }
  return <form className={styles.composeForm} onSubmit={submit}>
    <div className={styles.fields}>
      {support && <label className={styles.fullField}>What can we help with?<select name="topic"><option>A question about my project</option><option>Account access</option><option>An invoice or payment question</option><option>Something else</option></select></label>}
      <label className={styles.fullField}>Related project<select key={orderId} name="order_id" defaultValue={orderId}><option value="">General conversation</option>{orders.map(order => <option key={order.id} value={order.id}>{order.title}</option>)}</select></label>
      <label className={styles.fullField}>{support ? "How can we help?" : "Your message"}<textarea name="body" rows={support ? 5 : 4} required maxLength={support ? 3800 : 4000} placeholder={support ? "Tell us what's happening and how we can help." : "A question, an idea or your latest feedback…"} /></label>
    </div>
    {error && <p className={styles.formError} role="alert">{error}</p>}
    <div className={styles.formActions}><small className={styles.quietNote}>{preview ? "Preview only · nothing is sent" : "A direct conversation with the studio."}</small><button className={styles.primaryButton} disabled={pending} type="submit">{pending ? "Sending…" : support ? "Send support request" : "Send message"}<Icon name="arrow" /></button></div>
  </form>;
}

export function UploadForm({ orders, onSubmit, preview }: { orders: PortalOrder[]; onSubmit: Submit; preview: boolean }) {
  const [pending, setPending] = useState(false), [error, setError] = useState(""), [fileName, setFileName] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (pending) return;
    const form = new FormData(event.currentTarget), file = form.get("file");
    if (!(file instanceof File)) return;
    const invalid = validateUpload(file); if (invalid) { setError(invalid); return; }
    setPending(true); setError("");
    try { const result = await onSubmit(form); if (result.error) setError(result.error); }
    catch { setError(formError); } finally { setPending(false); }
  }
  return <form onSubmit={submit} className={styles.composeForm}><label className={styles.uploadZone}><Icon name="upload" /><strong>{fileName || "Choose a file to share"}</strong><span>PDF, images, DOCX, TXT or ZIP · up to 10 MB</span><input name="file" type="file" required accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.zip,.docx" onChange={event => setFileName(event.target.files?.[0]?.name || "")} /></label><div className={styles.fields}><label className={styles.fullField}>Attach to a project<select name="order_id"><option value="">General workspace files</option>{orders.map(order => <option key={order.id} value={order.id}>{order.title}</option>)}</select></label></div>{error && <p className={styles.formError} role="alert">{error}</p>}<div className={styles.formActions}><small className={styles.quietNote}>{preview ? "Preview only · file contents are not uploaded" : "Only your account and the studio can access this file."}</small><button className={styles.primaryButton} type="submit" disabled={pending}>{pending ? "Uploading…" : preview ? "Add preview file" : "Upload file"}<Icon name="upload" /></button></div></form>;
}

export function ProfileForm({ profile, onSubmit }: { profile: PortalProfile; onSubmit: Submit }) {
  const [pending, setPending] = useState(false), [result, setResult] = useState<ActionResult>({});
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (pending) return; const form = new FormData(event.currentTarget);
    setPending(true); setResult({});
    try { setResult(await onSubmit(form)); } catch { setResult({ error: formError }); } finally { setPending(false); }
  }
  return <form onSubmit={submit} className={styles.composeForm}><div className={styles.fields}><label>Full name<input name="full_name" defaultValue={profile.full_name} required minLength={2} maxLength={120} autoComplete="name" /></label><label>Company <small>Optional</small><input name="company" defaultValue={profile.company} maxLength={160} autoComplete="organization" placeholder="Your company" /></label><label className={styles.fullField}>Account email<input type="email" value={profile.email} readOnly /><small>Your sign-in email is managed by your authentication provider. Contact the studio if it needs to change.</small></label></div>{result.error && <p className={styles.formError} role="alert">{result.error}</p>}{result.success && <p className={styles.formSuccess} role="status">{result.success}</p>}<div className={styles.formActions}><small className={styles.quietNote}>A few details. A more personal workspace.</small><button type="submit" className={styles.primaryButton} disabled={pending}>{pending ? "Saving…" : "Save changes"}<Icon name="check" /></button></div></form>;
}
