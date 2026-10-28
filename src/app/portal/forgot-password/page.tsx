import AuthPanel from "../AuthPanel";
import { isPortalConfigured } from "@/lib/portal/server";
import { safeAuthNext } from "@/lib/portal";

export default async function ForgotPasswordPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return <AuthPanel key="forgot" mode="forgot" next={safeAuthNext(next)} configured={isPortalConfigured()} previewAvailable={process.env.NODE_ENV === "development"} />;
}
