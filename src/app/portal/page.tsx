import { loadPortalData } from "@/lib/portal/server";
import { portalView } from "@/lib/portal";
import PortalWorkspace from "./PortalWorkspace";

export default async function PortalPage({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const params = await searchParams;
  const data = await loadPortalData();
  return <PortalWorkspace data={data} view={portalView(params.view)} />;
}
