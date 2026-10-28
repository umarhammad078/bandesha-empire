import { loadPortalData } from "@/lib/portal/server";
import { portalPackage, portalView, startProjectHref } from "@/lib/portal";
import PortalWorkspace from "./PortalWorkspace";

export default async function PortalPage({ searchParams }: { searchParams: Promise<{ view?: string; action?: string; package?: string }> }) {
  const params = await searchParams;
  const startNewOrder = params.action === "new-order";
  const view = startNewOrder ? "orders" : portalView(params.view);
  const next = startNewOrder ? startProjectHref(params.package) : view === "overview" ? "/portal" : `/portal?view=${view}`;
  const data = await loadPortalData(next);
  return <PortalWorkspace data={data} view={view} startNewOrder={startNewOrder} initialPackage={portalPackage(params.package)} />;
}
