import AuthPanel from "../AuthPanel";
import { isPortalConfigured, redirectSignedInClient } from "@/lib/portal/server";
import { safeAuthNext } from "@/lib/portal";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ notice?: string; next?: string }> }) {
  const { notice, next } = await searchParams;
  await redirectSignedInClient(next);
  return <AuthPanel key="login" mode="login" next={safeAuthNext(next)} configured={isPortalConfigured()} previewAvailable={process.env.NODE_ENV === "development"} notice={notice} />;
}
