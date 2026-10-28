"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import BrandMark from "@/components/BrandMark";
import { portalAuthHref } from "@/lib/portal";
import { signIn, signUp, forgotPassword, resetPassword, googleSignIn } from "./actions";
import styles from "./auth.module.css";

export type AuthMode = "login" | "signup" | "forgot" | "reset";
const COPY = {
  login: { title: "Welcome back.", description: "A little less back-and-forth. A lot more moving forward.", submit: "Sign in to your workspace" },
  signup: { title: "Your next chapter.", description: "Create your account. Let's make something worth building.", submit: "Create your account" },
  forgot: { title: "Let's get you back in.", description: "Enter your account email and we'll send a reset link.", submit: "Send password reset link" },
  reset: { title: "A fresh start.", description: "Choose a new password for your client workspace.", submit: "Save new password" },
};

function GoogleButton({ configured }: { configured: boolean }) {
  const { pending } = useFormStatus();
  return <button className={styles.googleButton} disabled={!configured || pending} type="submit"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.8 12.2c0-.7-.1-1.4-.2-2.1H12v4h5.5a4.7 4.7 0 0 1-2 3.1v2.6h3.3c1.9-1.8 3-4.4 3-7.6Z" /><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.8-2.5l-3.3-2.6c-.9.6-2.1 1-3.5 1-2.6 0-4.8-1.7-5.6-4.1H3v2.7A10.3 10.3 0 0 0 12 22Z" /><path fill="#FBBC05" d="M6.4 13.8a6.2 6.2 0 0 1 0-3.6V7.5H3a10.1 10.1 0 0 0 0 9l3.4-2.7Z" /><path fill="#EA4335" d="M12 6.1c1.5 0 2.8.5 3.8 1.5l2.9-2.9A9.9 9.9 0 0 0 12 2a10.3 10.3 0 0 0-9 5.5l3.4 2.7A5.9 5.9 0 0 1 12 6.1Z" /></svg>{pending ? "Connecting to Google…" : "Continue with Google"}</button>;
}

export default function AuthPanel({ mode, configured, previewAvailable, notice, next = "/portal" }: { mode: AuthMode; configured: boolean; previewAvailable: boolean; notice?: string; next?: string }) {
  const action = mode === "signup" ? signUp : mode === "forgot" ? forgotPassword : mode === "reset" ? resetPassword : signIn;
  const [result, formAction, pending] = useActionState(action, {});
  const [showPassword, setShowPassword] = useState(false);
  const copy = COPY[mode];
  return <main className={styles.page}>
    <section className={styles.story} aria-label="Bandesha Empire client workspace">
      <Link href="/" className={styles.brand}><span><BrandMark /></span><strong>Bandesha Empire<small>CLIENT WORKSPACE</small></strong></Link>
      <div className={styles.storyCopy}><span className={styles.eyebrow}><i /> A BETTER WAY TO BUILD TOGETHER</span><h2>Good work.<br />Clear direction.<br /><em>One shared space.</em></h2><p>From the first idea to the next milestone. Stay close to the work, without chasing the details.</p></div>
      <div className={styles.workspaceSketch} aria-hidden="true"><div className={styles.sketchHead}><span>YOUR PROJECT, CONNECTED</span><i>↗</i></div><div className={styles.sketchSteps}><span><b>✓</b>Brief</span><i /><span><b>✓</b>Direction</span><i /><span><b className={styles.currentStep}>↗</b>Build</span><i /><span><b>○</b>Launch</span></div><div className={styles.sketchFoot}><span>Clear milestones.</span><span>No loose ends.</span></div></div>
      <div className={styles.storyFoot}><span>Thoughtful work. Shared progress.</span><span>Pakistan · Worldwide</span></div>
    </section>
    <section className={styles.formSide} aria-labelledby="auth-title">
      <Link href="/" className={styles.backLink}><span aria-hidden="true">←</span> Back to website</Link>
      <div className={styles.formWrap}>
        <span className={styles.formKicker}>YOUR CLIENT WORKSPACE</span><h1 id="auth-title">{copy.title}</h1><p className={styles.description}>{copy.description}</p>
        {(mode === "login" || mode === "signup") && <><div className={styles.tabs}><Link href={portalAuthHref("login", next)} className={mode === "login" ? styles.activeTab : ""} aria-current={mode === "login" ? "page" : undefined}>Sign in</Link><Link href={portalAuthHref("signup", next)} className={mode === "signup" ? styles.activeTab : ""} aria-current={mode === "signup" ? "page" : undefined}>Create account</Link></div><form action={googleSignIn}><input type="hidden" name="next" value={next} /><GoogleButton configured={configured} /></form><div className={styles.divider}><span>or continue with email</span></div></>}
        {!configured && <p className={styles.notice}>Client sign-in is being prepared. {previewAvailable ? "Explore the workspace preview while the live connection is set up." : "Please contact the studio for access."}</p>}
        {notice && notice !== "setup" && <p className={styles.notice} role="alert">{notice === "callback" ? "That sign-in link has expired or couldn't be verified. Please sign in again or request a fresh link." : notice === "cancelled" ? "Google sign-in was cancelled. You can try again or continue with email." : "Google sign-in is not available yet. Please use your email or contact the studio."}</p>}
        {result.success ? <div className={styles.success} role="status"><span>✓</span><h2>Check your inbox.</h2><p>{result.success}</p><Link href={portalAuthHref("login", next)}>Back to sign in <span aria-hidden="true">→</span></Link></div> : <form action={formAction} className={styles.form}>
          <input type="hidden" name="next" value={next} />
          {mode === "signup" && <label htmlFor="full_name">Full name<input id="full_name" name="full_name" autoComplete="name" placeholder="Your full name" required minLength={2} maxLength={120} /></label>}
          {mode !== "reset" && <label htmlFor="email">Email address<input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" maxLength={254} required /></label>}
          {mode !== "forgot" && <label htmlFor="password"><span className={styles.labelRow}>{mode === "reset" ? "New password" : "Password"}{mode === "login" && <Link href={portalAuthHref("forgot-password", next)}>Forgot password?</Link>}</span><span className={styles.passwordField}><input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete={mode === "login" ? "current-password" : "new-password"} placeholder={mode === "login" ? "Enter your password" : "At least 10 characters"} minLength={mode === "login" ? 1 : 10} maxLength={256} required /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} onClick={() => setShowPassword(value => !value)}><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M2 10s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5Z" /><circle cx="10" cy="10" r="2.2" />{showPassword && <path d="m3 3 14 14" />}</svg></button></span></label>}
          {mode === "reset" && <label htmlFor="confirm_password">Confirm password<input id="confirm_password" name="confirm_password" type="password" autoComplete="new-password" minLength={10} maxLength={256} required placeholder="Enter your new password again" /></label>}
          {result.error && <p className={styles.error} role="alert">{result.error}</p>}
          <button type="submit" className={styles.submit} disabled={pending || !configured}>{pending ? "Please wait…" : copy.submit}<span aria-hidden="true">↗</span></button>
        </form>}
        {mode === "signup" && <p className={styles.privacy}>Your details are used to manage your account and projects. We never ask for your email account password.</p>}
        {previewAvailable && <Link href="/portal/preview" className={styles.previewLink}>Explore the workspace preview <span aria-hidden="true">↗</span></Link>}
        {(mode === "forgot" || mode === "reset") && <Link href={portalAuthHref("login", next)} className={styles.previewLink}>← Back to sign in</Link>}
      </div>
      <div className={styles.formFoot}><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="2" /><path d="M5 7V5a3 3 0 0 1 6 0v2" /></svg> A private place for your next big thing.</div>
    </section>
  </main>;
}
