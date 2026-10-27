import type { PortalData } from "@/lib/portal";

const clientId = "00000000-0000-4000-8000-000000000001";
const websiteId = "00000000-0000-4000-8000-000000001042";
const workflowId = "00000000-0000-4000-8000-000000001043";
const completedId = "00000000-0000-4000-8000-000000001031";

// Fictional records for the explicitly labelled, development-only design preview.
export const PREVIEW_DATA: PortalData = {
  profile: { id: clientId, full_name: "Umar Hammad", company: "Your company", email: "client@example.com" },
  orders: [
    { id: websiteId, order_number: 1042, client_id: clientId, title: "A new home for your brand", service: "Website & Experience", package: "growth", brief: "A considered, ten-page business website that introduces the brand, explains the services and makes it easy for the right customers to get in touch.", budget: "$1,000–$2,000", timeline: "Within 4 weeks", website_url: "", status: "in_review", progress: 72, quoted_amount_cents: 100000, due_date: "2026-10-29", created_at: "2026-10-12T09:00:00Z", updated_at: "2026-10-27T08:30:00Z" },
    { id: workflowId, order_number: 1043, client_id: clientId, title: "Your enquiries, connected", service: "AI Agents & Automation", package: "custom", brief: "Connect the website enquiry form with our customer workspace, route new requests and keep the team informed with clear, useful notifications.", budget: "Let's define the scope", timeline: "Flexible", website_url: "", status: "in_progress", progress: 38, quoted_amount_cents: 150000, due_date: "2026-11-04", created_at: "2026-10-20T10:00:00Z", updated_at: "2026-10-26T15:00:00Z" },
    { id: completedId, order_number: 1031, client_id: clientId, title: "A focused first impression", service: "Website & Experience", package: "starter", brief: "Design and build a focused business website with five clear pages, responsive layouts and an enquiry form that makes the next step easy.", budget: "$500–$1,000", timeline: "Within 3 weeks", website_url: "", status: "completed", progress: 100, quoted_amount_cents: 50000, due_date: "2026-10-10", created_at: "2026-09-21T10:00:00Z", updated_at: "2026-10-10T13:00:00Z" },
  ],
  messages: [
    { id: "sample-message-1", client_id: clientId, order_id: websiteId, sender_role: "studio", body: "Your homepage design is ready for a look. We've kept the journey focused on your services and made the enquiry flow much clearer. Open your project to see the latest milestone.", created_at: "2026-10-26T14:15:00Z", read_at: null },
    { id: "sample-message-2", client_id: clientId, order_id: workflowId, sender_role: "studio", body: "The workflow architecture is agreed. We're now connecting the enquiry steps and testing how the right context reaches your team.", created_at: "2026-10-27T08:30:00Z", read_at: null },
  ],
  events: [
    { id: "sample-event-1", order_id: websiteId, title: "Homepage ready for your review", description: "The direction is in place. Share your feedback in Messages when you've had a look.", created_at: "2026-10-27T08:30:00Z" },
    { id: "sample-event-2", order_id: workflowId, title: "Your workflow is taking shape", description: "The build has started, with the enquiry routing and notifications connected first.", created_at: "2026-10-26T15:00:00Z" },
    { id: "sample-event-3", order_id: websiteId, title: "Design direction approved", description: "A clear foundation for the website's layout, content and visual language.", created_at: "2026-10-23T10:00:00Z" },
    { id: "sample-event-4", order_id: completedId, title: "Your website is live", description: "The project was accepted, handed over and marked complete.", created_at: "2026-10-10T13:00:00Z" },
    { id: "sample-event-5", order_id: websiteId, title: "Project brief received", description: "Scope and next steps agreed together.", created_at: "2026-10-12T09:00:00Z" },
  ],
  invoices: [
    { id: "sample-invoice-1", client_id: clientId, order_id: websiteId, invoice_number: "BE-INV-1042", description: "Growth website · first project milestone", amount_cents: 50000, status: "issued", due_date: "2026-11-01", paid_at: null, created_at: "2026-10-25T09:00:00Z" },
    { id: "sample-invoice-2", client_id: clientId, order_id: completedId, invoice_number: "BE-INV-1031", description: "Starter website · completed project", amount_cents: 50000, status: "paid", due_date: "2026-10-10", paid_at: "2026-10-08T11:00:00Z", created_at: "2026-09-25T09:00:00Z" },
  ],
  files: [
    { id: "sample-file-1", client_id: clientId, order_id: websiteId, name: "Website direction.pdf", storage_path: "", size_bytes: 2457600, mime_type: "application/pdf", created_at: "2026-10-23T10:00:00Z" },
    { id: "sample-file-2", client_id: clientId, order_id: websiteId, name: "Brand assets.zip", storage_path: "", size_bytes: 5452595, mime_type: "application/zip", created_at: "2026-10-14T09:00:00Z" },
    { id: "sample-file-3", client_id: clientId, order_id: workflowId, name: "Workflow architecture.pdf", storage_path: "", size_bytes: 943718, mime_type: "application/pdf", created_at: "2026-10-24T11:00:00Z" },
  ],
};
