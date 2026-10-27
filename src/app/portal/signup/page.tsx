import AuthPanel from "../AuthPanel";
import { isPortalConfigured } from "@/lib/portal/server";

export default function SignupPage() {
  return <AuthPanel key="signup" mode="signup" configured={isPortalConfigured()} previewAvailable={process.env.NODE_ENV === "development"} />;
}
