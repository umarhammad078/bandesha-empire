import AuthPanel from "../AuthPanel";
import { isPortalConfigured } from "@/lib/portal/server";

export default function ForgotPasswordPage() {
  return <AuthPanel key="forgot" mode="forgot" configured={isPortalConfigured()} previewAvailable={process.env.NODE_ENV === "development"} />;
}
