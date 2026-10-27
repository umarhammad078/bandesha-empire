import { notFound } from "next/navigation";
import { portalView } from "@/lib/portal";
import PortalWorkspace from "../PortalWorkspace";
import { PREVIEW_DATA } from "./data";

export default async function PreviewPage({ searchParams }: { searchParams: Promise<{ view?: string; state?: string }> }) {
  if (process.env.NODE_ENV !== "development") notFound();
  const params = await searchParams;
  const empty = params.state === "empty";
  const data = empty ? { ...PREVIEW_DATA, orders: [], messages: [], events: [], invoices: [], files: [] } : PREVIEW_DATA;
  return <PortalWorkspace key={empty ? "empty" : "sample"} data={data} view={portalView(params.view)} preview previewEmpty={empty} />;
}
