import AuthPanel from "../AuthPanel";
import { requirePortalClient } from "@/lib/portal/server";

export default async function ResetPasswordPage() {
  await requirePortalClient("/portal/reset-password");
  return <AuthPanel key="reset" mode="reset" configured previewAvailable={false} />;
}
