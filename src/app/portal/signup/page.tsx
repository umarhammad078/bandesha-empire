import AuthPanel from "../AuthPanel";
import { isPortalConfigured, redirectSignedInClient } from "@/lib/portal/server";
import { safeAuthNext } from "@/lib/portal";

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  await redirectSignedInClient(next);
  return <AuthPanel key="signup" mode="signup" next={safeAuthNext(next)} configured={isPortalConfigured()} previewAvailable={process.env.NODE_ENV === "development"} />;
}
