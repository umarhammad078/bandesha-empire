# Bandesha Empire — Client Portal

## Current state

The portal UI and Supabase integration code are implemented locally. The owner confirmed on 27 October 2026 that the live Supabase/Google setup is not ready. Live authentication and database operations have **not** been verified or activated. Do not advertise the portal as live until the setup and two-account access tests below pass.

- `/portal/login` — email/password sign-in and Google sign-in.
- `/portal/signup` — registration and email confirmation.
- `/portal/forgot-password` — verified-email password recovery.
- `/portal/reset-password` — requires an authenticated recovery session.
- `/portal` — protected dashboard; `?view=orders`, `messages`, `invoices`, `files`, `support` and `settings` select workspace views.
- `/portal/preview` — **development-only** interactive design preview, clearly labelled with fictional data. Not an authentication bypass; it never loads real client records. It returns 404 in production. Preview edits are session-only and are not sent or charged.
- `/portal/preview?state=empty` — the same preview as a brand-new client with no projects, invoices, files or messages yet.

The homepage Login / View My Project buttons and shared navigation link to the portal. The workspace has its own navigation instead of the marketing header.

## 1. Create or select your Supabase project

Use your own Supabase account. Keep the project under the business's ownership. No account passwords, database passwords, Google client secrets or Supabase service-role keys belong in chat or browser-visible code.

In local `.env.local`, and in the deployment environment, configure:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLIC_PUBLISHABLE_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
PORTAL_ENABLED=false
```

For production, set `NEXT_PUBLIC_SITE_URL=https://bandeshaempire.com` (or the exact canonical origin that serves the deployed website). Redirect any www/alternate domain to this same origin. OAuth cookies must return to the origin where the login was started.

`PORTAL_ENABLED` is a **server-only launch gate**. Keep it false until the database and auth configuration are complete. It is not a substitute for RLS, and does not revoke access for previously authenticated Supabase clients. Never expose a service-role or secret key through a `NEXT_PUBLIC_` variable.

## 2. Apply the portal migration

Back up an existing project before migrations. Use the Supabase SQL Editor, or the project's normal Supabase migration pipeline, to apply:

`supabase/migrations/20261027000000_client_portal.sql`

It creates:

- `portal_profiles` — client-editable name/company, never authentication roles.
- `portal_orders` — client-owned project briefs with studio-controlled status, progress and agreed pricing.
- `portal_order_events` — studio-managed milestone history; an initial event is inserted automatically on a new order.
- `portal_messages` — private client/studio conversations; clients cannot impersonate the studio.
- `portal_invoices` — read-only invoices/payment records for clients.
- `portal_files` — private workspace file records.
- A **private** `portal-files` Storage bucket with a 10 MB file limit and allowed MIME types.

The migration enables row-level security, removes anonymous access and gives authenticated clients only the necessary column-level privileges. Composite foreign keys prevent attaching messages/files/invoices to another client's project. Clients cannot write progress, status, quoted amounts or studio replies. Idempotency IDs stop a repeated order submission from creating duplicates.

The migration deliberately fails rather than silently altering an existing table of the same name. Inspect/resolve any name collision before proceeding. If a `portal-files` bucket already exists, confirm that it is **private** and its file restrictions match the migration; the script does not overwrite an existing bucket's settings.

## 3. Configure email/password authentication

In Supabase Authentication:

1. Enable the Email provider and password-based sign-in.
2. Keep email confirmation enabled; require a minimum password length of 10 characters.
3. Set the Site URL to the production website origin.
4. Add these explicit redirect URLs for development and production:

```text
http://localhost:3000/auth/callback
http://localhost:3000/auth/callback?next=/portal/reset-password
https://bandeshaempire.com/auth/callback
https://bandeshaempire.com/auth/callback?next=/portal/reset-password
```

5. Configure your own SMTP sender and verify the sending domain before opening registration to clients. Supabase's built-in mail service is not a production delivery setup. Check current sender/rate restrictions in the dashboard.
6. Set the confirmation email template link to:

```html
<a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email">Confirm your email</a>
```

Set the password recovery template link to:

```html
<a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery">Reset your password</a>
```

For local email-flow testing, temporarily use localhost as the Supabase Site URL or a separate development project, since these templates use `.SiteURL`. Restore the production Site URL before launch. Do not disable verification just to make a demo appear functional.

## 4. Enable Google sign-in

1. In your Google Cloud / Google Auth Platform project, configure the application's brand and audience.
2. Create a Web application OAuth client.
3. Add the Supabase authentication callback shown by your Supabase project's Google provider settings as an authorized redirect URI. It normally ends with `/auth/v1/callback` on your Supabase project domain.
4. Enter the Google client ID and client secret **inside Supabase's Google provider configuration**, not in the website source.
5. Enable the Google provider. Only basic identity scopes (`openid`, email and profile) are needed; this portal does not read a client's Gmail messages.
6. If Google's app audience is still in testing, add the intended test users or complete the relevant launch requirements before inviting all clients.

The website's `/auth/callback` performs the PKCE session-code exchange. Authentication destinations are allowlisted, with no arbitrary external `next` redirect.

## 5. Activate and test

Set `PORTAL_ENABLED=true`, restart local development and rebuild/redeploy the website with its correct environment variables. All portal pages are dynamic and marked noindex; authenticated responses use `private, no-store`. The Next.js 16 Proxy refreshes verified session tokens, and every protected page/server action independently verifies the user.

Run local checks:

```bash
node --test tests/contact.test.mjs tests/portal.test.mjs tests/portal-database.test.mjs
npx tsc --noEmit
npm run build
```

The database test uses an in-memory PostgreSQL engine (PGlite) and the actual migration to check grants, RLS, cross-client foreign keys, triggers and file-isolation rules. It mocks the Supabase-owned `auth` and `storage` schemas; it does not replace real provider/SMTP/Storage HTTP testing.

Next.js and its matching ESLint configuration were updated to 16.4.3 as part of the portal security baseline. Compatible dependency fixes were applied; the local dependency audit reported zero known vulnerabilities at the time of verification. This is not a guarantee against all security issues or future advisories.

Then use **two disposable test accounts you control**, A and B, to verify in the real configured environment:

1. Email signup → confirmation → sign-in → sign-out → password reset.
2. Google signup/sign-in and returning sessions after a refresh.
3. Signed-out users cannot load `/portal` or perform any workspace action.
4. A submits a brief; refreshing preserves the order and creates its initial event. A double submission does not duplicate it.
5. B cannot read A's orders, messages, invoice rows, profile or files, even through direct Supabase requests with known record IDs.
6. Client requests cannot write studio messages, change delivery progress/prices/status, mark invoices as paid or access another user's Storage path.
7. A uploads a permitted file, downloads it through a short-lived signed URL, and cannot upload HTML/SVG/executable files or files over 10 MB.
8. Password reset tokens, signed file URLs and sessions expire correctly. A signed-out client cannot request new downloads.
9. Preview is unavailable on the production build; production does not contain fictional client records in live query results.
10. Review Supabase Auth rate limits/bot protection and SMTP deliverability before public registration. Configure abuse protection appropriate to expected traffic.

Uploads go directly from the authenticated browser to private Supabase Storage, avoiding serverless request-body limits. File metadata is saved only after the upload succeeds; failed metadata registration triggers cleanup. Downloads are authorized on the server and expire after 60 seconds. Consider malware scanning and a retention policy before accepting sensitive business files.

## Studio operations

This is a **client portal**, not a staff administration system. Until a separate staff interface is built, authorized business staff manage records through the protected Supabase dashboard. Do not give clients dashboard access or service-role credentials.

- Read new requests in `portal_orders`. Confirm scope/payment arrangements with the client before work starts.
- Update order `status`, `progress`, `quoted_amount_cents` and `due_date`. Amounts are integer USD cents (`100000` = $1,000). The package shown on a brief is a starting point, not an automatic charge.
- Add a `portal_order_events` record for each meaningful milestone. The dashboard refreshes every 30 seconds while visible.
- Reply in `portal_messages` using the correct `client_id`, optional matching `order_id`, `sender_role='studio'` and `read_at=null`. Clients can mark these replies as read.
- Create and reconcile `portal_invoices` against actual agreed invoices/payments. A client cannot mark an invoice paid. The portal has no card collection, payment gateway or automatic email-notification service.
- Store staff-delivered files under the client's own UUID folder in the private bucket, then register their metadata in `portal_files`. Never make the bucket public.

The initial UI fetches the latest 100 orders/invoices/files and 200 messages/events for the signed-in client. Add server-side pagination before high-volume use; do not treat this initial workspace as an unlimited archive viewer.

## References

- [Supabase server-side Next.js clients and session refresh](https://supabase.com/docs/guides/auth/server-side/creating-a-client?framework=nextjs)
- [Google sign-in configuration](https://supabase.com/docs/guides/auth/social-sign-in/auth-google)
- [Row-level security and database grants](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp)

## Local verification — 27 October 2026

- 24 automated checks passed, including the in-memory PostgreSQL migration/access-policy checks.
- TypeScript checks and the Next.js 16.4.3 production build passed.
- Workspace and authentication screens were checked at 1440, 768, 390 and 320 px without page-level horizontal overflow.
- Browser checks covered the explicit order review step, final submission, order timeline, project-linked preview messages, unread-message state, invoice details, profile edits, mobile menu and brand-new-client empty state.
- The local production server returned 200 for the existing public pages, redirected protected portal routes to sign-in, returned 404 for `/portal/preview`, and applied `private, no-store` to portal/auth responses. Invalid callback destinations were not followed externally.
- Dependency audit reported zero known vulnerabilities. The database/browser tests use fictional local data; real Supabase OAuth, SMTP delivery, persistent client sessions and Storage HTTP flows still require the live setup above.

No production credentials, live customer accounts, database migrations or external provider settings were changed as part of the local design implementation.
