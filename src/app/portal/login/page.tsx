import AuthPanel from "../AuthPanel";
import { isPortalConfigured } from "@/lib/portal/server";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ notice?: string }> }) {
  const { notice } = await searchParams;
  return <AuthPanel key="login" mode="login" configured={isPortalConfigured()} previewAvailable={process.env.NODE_ENV === "development"} notice={notice} />;
}
