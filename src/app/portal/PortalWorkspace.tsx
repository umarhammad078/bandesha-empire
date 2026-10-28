"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import BrandMark from "@/components/BrandMark";
import { getContactEmailHref } from "@/lib/contact";
import { ORDER_STATUS, money, orderReference, validateOrder, type ActionResult, type PortalData, type PortalOrder, type PortalView } from "@/lib/portal";
import { createOrder, sendMessage, signOut, updateProfile, downloadFile, markMessagesRead } from "./actions";
import { uploadPortalFile } from "@/lib/portal/upload";
import { MessageForm, NewOrderForm, ProfileForm, UploadForm } from "./PortalForms";
import Icon, { type IconName } from "./PortalIcons";
import styles from "./portal.module.css";

const NAV: { id: PortalView; label: string; icon: IconName }[] = [
  { id: "overview", label: "Overview", icon: "overview" },
  { id: "orders", label: "Orders", icon: "orders" },
  { id: "messages", label: "Messages", icon: "messages" },
  { id: "invoices", label: "Invoices", icon: "invoices" },
  { id: "files", label: "Files", icon: "files" },
  { id: "support", label: "Support", icon: "support" },
  { id: "settings", label: "Settings", icon: "settings" },
];
type ModalState = { type: "new-order"; plan?: string } | { type: "upload" } | { type: "order" | "invoice"; id: string } | { type: "message"; orderId?: string } | null;
const date = (value: string | null, long = false) => value ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: long ? "long" : "short", year: long ? "numeric" : undefined, timeZone: "UTC" }).format(new Date(value)) : "To be agreed";
const size = (bytes: number) => bytes >= 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.ceil(bytes / 1024)} KB`;

function Status({ status }: { status: PortalOrder["status"] }) {
  return <span className={`${styles.status} ${styles[`status_${status}`]}`}><i />{ORDER_STATUS[status]}</span>;
}

function Modal({ title, subtitle, onClose, children }: { title: string; subtitle?: string; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, []);
  return <dialog ref={ref} className={styles.dialog} onClose={onClose} aria-labelledby="workspace-dialog-title" onClick={event => { if (event.target === event.currentTarget) ref.current?.close(); }}><div className={styles.dialogInner}><div className={styles.dialogHeader}><div><span className={styles.kicker}>BANDESHA EMPIRE · YOUR WORKSPACE</span><h2 id="workspace-dialog-title">{title}</h2>{subtitle && <p>{subtitle}</p>}</div><button type="button" className={styles.iconButton} aria-label="Close dialog" onClick={() => ref.current?.close()} autoFocus><Icon name="close" /></button></div>{children}</div></dialog>;
}

function EmptyState({ icon, title, description, action }: { icon: IconName; title: string; description: string; action?: ReactNode }) {
  return <div className={styles.emptyState}><span><Icon name={icon} /></span><h3>{title}</h3><p>{description}</p>{action}</div>;
}

export default function PortalWorkspace({ data, view, preview = false, previewEmpty = false, startNewOrder = false, initialPackage = "growth" }: { data: PortalData; view: PortalView; preview?: boolean; previewEmpty?: boolean; startNewOrder?: boolean; initialPackage?: string }) {
  const router = useRouter();
  const [previewData, setPreviewData] = useState(data);
  const workspace = preview ? previewData : data;
  const { profile, orders, messages, events, invoices, files } = workspace;
  const [menuOpen, setMenuOpen] = useState(false), [modal, setModal] = useState<ModalState>(null);
  const [toast, setToast] = useState<{ text: string; error?: boolean } | null>(null);
  const [search, setSearch] = useState(""), [filter, setFilter] = useState("all"), [messageProject, setMessageProject] = useState("");
  const [readPending, startReadTransition] = useTransition();
  const activeOrders = orders.filter(order => !["completed", "cancelled"].includes(order.status));
  const unread = messages.filter(message => message.sender_role === "studio" && !message.read_at).length;
  const completed = orders.filter(order => order.status === "completed").length;
  const totalPaid = invoices.filter(invoice => invoice.status === "paid").reduce((total, invoice) => total + invoice.amount_cents, 0);
  const featured = activeOrders.find(order => order.status === "in_review") ?? activeOrders[0];
  const firstName = profile.full_name.split(" ")[0];
  const initials = profile.full_name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase();
  const base = preview ? "/portal/preview" : "/portal";
  const viewHref = (next: PortalView) => {
    const params = new URLSearchParams();
    if (previewEmpty) params.set("state", "empty");
    if (next !== "overview") params.set("view", next);
    return params.size ? `${base}?${params}` : base;
  };
  const projectName = (id: string | null) => orders.find(order => order.id === id)?.title ?? "Your workspace";
  const notify = (text: string, error = false) => setToast({ text, error });
  const open = (value: ModalState) => { if (workspace.loadError) { notify("The workspace connection needs attention. Please contact the studio.", true); return; } setModal(value); };

  useEffect(() => {
    if (!startNewOrder || workspace.loadError) return;
    setModal({ type: "new-order", plan: initialPackage });
    // Consume the navigation intent, not the brief: refresh must not reopen a
    // dismissed dialog, and entering the portal must never submit an order.
    router.replace(`${preview ? "/portal/preview" : "/portal"}?view=orders${previewEmpty ? "&state=empty" : ""}`, { scroll: false });
  }, [startNewOrder, initialPackage, workspace.loadError, router, preview, previewEmpty]);

  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(null), 6500); return () => clearTimeout(timer); }, [toast]);
  useEffect(() => { if (preview) return; const timer = setInterval(() => { if (document.visibilityState === "visible") router.refresh(); }, 30000); return () => clearInterval(timer); }, [preview, router]);
  useEffect(() => { if (!menuOpen) return; const close = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); }; window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, [menuOpen]);

  async function submitOrder(form: FormData): Promise<ActionResult> {
    if (preview) {
      const checked = validateOrder(form); if (checked.error || !checked.data) return { error: checked.error };
      const now = new Date().toISOString(), id = crypto.randomUUID();
      const order: PortalOrder = { ...checked.data, id, order_number: Math.max(0, ...orders.map(item => item.order_number)) + 1, client_id: profile.id, status: "submitted", progress: 0, quoted_amount_cents: null, due_date: null, created_at: now, updated_at: now };
      setPreviewData(old => ({ ...old, orders: [order, ...old.orders], events: [{ id: crypto.randomUUID(), order_id: id, title: "Project brief received", description: "Preview only. This brief has not been sent to the studio.", created_at: now }, ...old.events] }));
      setModal({ type: "order", id }); notify("Preview order added. Nothing has been sent to the studio."); return { success: "Preview order added", id };
    }
    const result = await createOrder(form);
    if (!result.error) { setModal(null); notify(result.success!); router.refresh(); }
    return result;
  }

  async function submitMessage(form: FormData): Promise<ActionResult> {
    if (preview) {
      const body = String(form.get("body") ?? "").trim();
      if (!body || body.length > 4000) return { error: "Write a message between 1 and 4,000 characters." };
      setPreviewData(old => ({ ...old, messages: [...old.messages, { id: crypto.randomUUID(), client_id: profile.id, order_id: String(form.get("order_id") || "") || null, sender_role: "client", body, read_at: null, created_at: new Date().toISOString() }] }));
      notify("Preview message added. Nothing has been sent."); setModal(null); return { success: "Preview message added" };
    }
    const result = await sendMessage(form);
    if (!result.error) { notify(result.success!); setModal(null); router.refresh(); }
    return result;
  }

  async function submitProfile(form: FormData): Promise<ActionResult> {
    if (preview) { setPreviewData(old => ({ ...old, profile: { ...old.profile, full_name: String(form.get("full_name")), company: String(form.get("company") ?? "") } })); return { success: "Preview profile updated for this workspace session." }; }
    const result = await updateProfile(form); if (!result.error) router.refresh(); return result;
  }

  async function submitFile(form: FormData): Promise<ActionResult> {
    if (preview) {
      const file = form.get("file") as File;
      setPreviewData(old => ({ ...old, files: [{ id: crypto.randomUUID(), client_id: profile.id, order_id: String(form.get("order_id") || "") || null, name: file.name, storage_path: "", size_bytes: file.size, mime_type: file.type, created_at: new Date().toISOString() }, ...old.files] }));
      notify("Preview file listed. Its contents have not been uploaded."); setModal(null); return { success: "Preview file added" };
    }
    const result = await uploadPortalFile(form);
    if (!result.error) { notify(result.success!); setModal(null); router.refresh(); } return result;
  }

  async function getFile(id: string) {
    if (preview) { notify("This is a sample file. Private file downloads activate after the live setup."); return; }
    try { const result = await downloadFile(id); if (result.error) notify(result.error, true); else if (result.url) window.location.assign(result.url); }
    catch { notify("We couldn't prepare your download. Please try again.", true); }
  }

  function markRead() {
    if (preview) { setPreviewData(old => ({ ...old, messages: old.messages.map(message => message.sender_role === "studio" ? { ...message, read_at: new Date().toISOString() } : message) })); return; }
    startReadTransition(async () => { const result = await markMessagesRead(); if (result.error) notify(result.error, true); else router.refresh(); });
  }

  const newOrderButton = <button className={styles.primaryButton} type="button" onClick={() => open({ type: "new-order" })}>Create a project brief<Icon name="plus" /></button>;
  const sortedEvents = [...events].sort((a, b) => b.created_at.localeCompare(a.created_at));

  function orderTable(items: PortalOrder[]) {
    return <div className={styles.tableScroll}><table className={styles.orderTable}><thead><tr><th>PROJECT</th><th>STATUS</th><th>PROGRESS</th><th><span className={styles.srOnly}>Open project</span></th></tr></thead><tbody>{items.map(order => <tr key={order.id}><td><button className={styles.projectName} type="button" onClick={() => open({ type: "order", id: order.id })}><span className={styles.projectIcon}><Icon name={order.service.includes("AI") ? "spark" : "orders"} /></span><span><strong>{order.title}</strong><small>{orderReference(order.order_number)} <i>·</i> {order.service}</small></span></button></td><td><Status status={order.status} /></td><td><div className={styles.miniProgress}><span><i style={{ width: `${order.progress}%` }} /></span><b>{order.progress}%</b></div></td><td><button type="button" className={styles.iconButton} aria-label={`View ${order.title}`} onClick={() => open({ type: "order", id: order.id })}><Icon name="external" /></button></td></tr>)}</tbody></table></div>;
  }

  const selectedOrder = modal?.type === "order" ? orders.find(order => order.id === modal.id) : undefined;
  const selectedInvoice = modal?.type === "invoice" ? invoices.find(invoice => invoice.id === modal.id) : undefined;
  const filteredOrders = orders.filter(order => (filter === "all" || (filter === "active" ? !["completed", "cancelled"].includes(order.status) : order.status === filter)) && `${order.title} ${order.service} ${orderReference(order.order_number)}`.toLowerCase().includes(search.toLowerCase()));

  return <div className={styles.app}>
    <a className={styles.skipLink} href="#workspace-main">Skip to workspace</a>
    {menuOpen && <button className={styles.scrim} aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
    <aside id="workspace-navigation" className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ""}`}>
      <Link href="/" className={styles.brand}><span><BrandMark /></span><strong>Bandesha Empire<small>CLIENT WORKSPACE</small></strong></Link>
      <div className={styles.sidebarLabel}>YOUR WORKSPACE</div>
      <nav aria-label="Client portal navigation">{NAV.map((item, index) => <Link key={item.id} href={viewHref(item.id)} prefetch={false} onClick={() => setMenuOpen(false)} aria-current={view === item.id ? "page" : undefined} className={`${styles.navLink} ${view === item.id ? styles.navActive : ""} ${index === 5 ? styles.navDivider : ""}`}><Icon name={item.icon} /><span>{item.label}</span>{item.id === "orders" && activeOrders.length > 0 && <b>{activeOrders.length}</b>}{item.id === "messages" && unread > 0 && <b className={styles.unreadBadge}>{unread}</b>}{view === item.id && <i />}</Link>)}</nav>
      <div className={styles.sidebarBottom}><div className={styles.studioNote}><span><i /> A DIRECT LINE TO THE STUDIO</span><p>Good questions.<br />Thoughtful answers.</p><Link href={viewHref("messages")} prefetch={false}>Let's talk <Icon name="arrow" /></Link></div><div className={styles.sidebarProfile}><span className={styles.avatar}>{initials}</span><span><strong>{profile.full_name}</strong><small>Client account</small></span>{preview ? <Link href="/portal/login" aria-label="Exit preview"><Icon name="logout" /></Link> : <form action={signOut}><button type="submit" aria-label="Sign out"><Icon name="logout" /></button></form>}</div></div>
    </aside>

    <div className={styles.mainColumn}>
      {preview && <div className={styles.previewBar}><span><i /> DESIGN PREVIEW <b>·</b> Sample data. Nothing is sent or charged.</span><Link href="/portal/login">View sign-in screen <Icon name="external" /></Link></div>}
      <header className={styles.topbar}><div className={styles.topbarTitle}><button className={`${styles.iconButton} ${styles.mobileMenu}`} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-controls="workspace-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}><Icon name={menuOpen ? "close" : "menu"} /></button><span>YOUR WORKSPACE<small>{NAV.find(item => item.id === view)?.label}</small></span></div><div className={styles.topbarActions}><button type="button" className={styles.topNewOrder} disabled={workspace.loadError} onClick={() => open({ type: "new-order" })}><Icon name="plus" /><span>New order</span></button><Link href={viewHref("messages")} className={styles.notificationButton} aria-label={`Messages${unread ? `, ${unread} unread` : ""}`}><Icon name="bell" />{unread > 0 && <i />}</Link><span className={styles.topbarDivider} /><Link href={viewHref("settings")} className={styles.topAvatar} aria-label="Account settings">{initials}</Link></div></header>

      <main id="workspace-main" className={styles.content}>
        {workspace.loadError ? <div className={styles.connectionError}><Icon name="shield" /><h1>Your workspace needs a connection.</h1><p>Your account is signed in, but we couldn't load the project records. Nothing here has been lost. Please contact the studio while we check the connection.</p><a className={styles.primaryButton} href={getContactEmailHref("Client portal connection issue")}>Contact the studio<Icon name="arrow" /></a></div> : <>
        {view === "overview" && <>
          <div className={styles.welcome}><div><span className={styles.kicker}>A LITTLE CLARITY GOES A LONG WAY</span><h1>Welcome back, {firstName}<em>.</em></h1><p>Here's where things stand. And where we go next.</p></div><span className={styles.workspaceSignal}><i /> Your shared workspace</span></div>
          <section className={styles.featureCard} aria-labelledby="feature-title"><div className={styles.featureCopy}><span>{featured ? "GOOD THINGS ARE TAKING SHAPE" : "EVERY GOOD PROJECT STARTS SOMEWHERE"}</span><h2 id="feature-title">{featured ? <>Your next chapter.<br /><em>Already in motion.</em></> : <>A good idea.<br /><em>A clear place to start.</em></>}</h2><p>{featured ? "Every brief, milestone and next step. Connected, considered and all right here." : "Tell us what you're building. We'll help shape the scope, the investment and a sensible way forward."}</p><button type="button" onClick={() => open(featured ? { type: "order", id: featured.id } : { type: "new-order" })}>{featured ? "See your latest project" : "Create your first brief"}<Icon name="external" /></button></div><div className={styles.featureNext}><div><i />{featured?.status === "in_review" ? "YOUR NEXT STEP" : "THE WAY FORWARD"}</div><span className={styles.featureNextIcon}><Icon name={featured?.status === "in_review" ? "check" : "spark"} /></span><h3>{featured?.status === "in_review" ? "A fresh perspective.\nReady for your feedback." : featured ? "Steady progress.\nA clear next milestone." : "Bring the ambition.\nWe'll bring the direction."}</h3><p>{featured ? featured.title : "Share the goal, the context and what a good result looks like."}</p><span className={styles.featureMeta}>{featured ? <><Icon name="calendar" />{featured.due_date ? `Next milestone · ${date(featured.due_date)}` : "Milestone dates to be agreed"}</> : <><Icon name="shield" />No payment taken on submission</>}</span></div></section>
          <section className={styles.statGrid} aria-label="Your workspace at a glance">{[{ icon: "orders" as IconName, value: activeOrders.length, label: "Active orders", note: "Good work in motion", route: "orders" as PortalView }, { icon: "messages" as IconName, value: unread, label: "Unread messages", note: unread ? "A little something from us" : "You're all caught up", route: "messages" as PortalView }, { icon: "invoices" as IconName, value: money(totalPaid), label: "Total paid", note: "Across your projects · USD", route: "invoices" as PortalView }, { icon: "check" as IconName, value: completed, label: "Completed projects", note: "Built. Delivered. Yours.", route: "orders" as PortalView }].map(stat => <Link href={viewHref(stat.route)} className={styles.stat} key={stat.label}><div><span><Icon name={stat.icon} /></span><Icon name="external" /></div><strong>{stat.value}</strong><span>{stat.label}</span><small>{stat.note}</small></Link>)}</section>
          <div className={styles.overviewGrid}><section className={styles.panel} aria-labelledby="recent-projects-title"><div className={styles.panelHeading}><div><h2 id="recent-projects-title">Your projects</h2><span>The work, without the guesswork.</span></div><Link href={viewHref("orders")} className={styles.textLink}>View all<Icon name="arrow" /></Link></div>{orders.length ? orderTable(orders.slice(0, 3)) : <EmptyState icon="orders" title="Your next project belongs here." description="Share a brief, and we'll turn the first conversation into a clear plan." action={newOrderButton} />}</section><section className={`${styles.panel} ${styles.activityPanel}`} aria-labelledby="activity-title"><div className={styles.panelHeading}><div><h2 id="activity-title">The latest</h2><span>Little steps. Real progress.</span></div><span className={styles.activityDot} /></div>{sortedEvents.length ? <ol className={styles.activityList}>{sortedEvents.slice(0, 3).map((event, index) => <li key={event.id}><i className={index === 0 ? styles.latestDot : ""} /><button type="button" onClick={() => open({ type: "order", id: event.order_id })}>{event.title}</button><small>{date(event.created_at)} <span>·</span> {orderReference(orders.find(order => order.id === event.order_id)?.order_number ?? 0)}</small></li>)}</ol> : <div className={styles.activityEmpty}><Icon name="clock" /><p>Your project milestones will appear here as the work moves forward.</p></div>}<div className={styles.activityFooter}><Icon name="shield" />A shared record of the work.</div></section></div>
          <div className={styles.quickHeading}><h2>A good next step.</h2><span>Less searching. More doing.</span></div><section className={styles.quickGrid} aria-label="Quick actions">{[{ icon: "plus" as IconName, title: "Start a new project", text: "Give your next idea a home.", action: () => open({ type: "new-order" }) }, { icon: "messages" as IconName, title: "Message the team", text: "A direct line. No loose ends.", action: () => open({ type: "message" }) }, { icon: "files" as IconName, title: "Share a file", text: "Keep the right context close.", action: () => open({ type: "upload" }) }].map(item => <button type="button" key={item.title} onClick={item.action}><span><Icon name={item.icon} /></span><div><strong>{item.title}</strong><small>{item.text}</small></div><Icon name="external" /></button>)}</section>
        </>}

        {view === "orders" && <><PageHeading kicker="THE WORK, IN ONE PLACE" title="Your projects." description="From the first brief to the final handover. Follow every step." action={newOrderButton} /><section className={styles.panel}><div className={styles.orderToolbar}><div className={styles.filterTabs} aria-label="Filter orders">{[{ id: "all", label: "All projects" }, { id: "active", label: "In progress" }, { id: "in_review", label: "For review" }, { id: "completed", label: "Completed" }].map(item => <button key={item.id} className={filter === item.id ? styles.filterActive : ""} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)} type="button">{item.label}</button>)}</div><label className={styles.searchField}><Icon name="search" /><span className={styles.srOnly}>Search projects</span><input type="search" placeholder="Find a project…" value={search} onChange={event => setSearch(event.target.value)} /></label></div>{filteredOrders.length ? orderTable(filteredOrders) : <EmptyState icon="orders" title={orders.length ? "No projects match just yet." : "Your next chapter starts here."} description={orders.length ? "Try a different search or project filter." : "Create your first brief. We'll help you work out the best way forward."} action={!orders.length ? newOrderButton : undefined} />}</section><div className={styles.reassurance}><Icon name="shield" /><p>Submitting a brief starts a conversation, not a charge. Scope, milestones and pricing are agreed together before work begins.</p></div></>}

        {view === "messages" && <><PageHeading kicker="A DIRECT LINE TO THE STUDIO" title="Good conversations." description="The context, the questions and the next steps. Together." action={unread > 0 ? <button className={styles.secondaryButton} type="button" onClick={markRead} disabled={readPending}>{readPending ? "Updating…" : "Mark all as read"}<Icon name="check" /></button> : undefined} /><div className={styles.messageLayout}><section className={styles.panel}><div className={styles.panelHeading}><div><h2>The conversation</h2><span>Your account and the studio. No one else.</span></div><label className={styles.messageFilter}><span className={styles.srOnly}>Filter messages by project</span><select value={messageProject} onChange={event => setMessageProject(event.target.value)}><option value="">All projects</option>{orders.map(order => <option key={order.id} value={order.id}>{order.title}</option>)}</select></label></div><div className={styles.conversation}>{messages.filter(message => !messageProject || message.order_id === messageProject).length ? messages.filter(message => !messageProject || message.order_id === messageProject).map(message => <article key={message.id} className={`${styles.message} ${message.sender_role === "client" ? styles.messageOwn : ""}`}><span className={styles.messageAvatar}>{message.sender_role === "studio" ? "BE" : initials}</span><div><header><strong>{message.sender_role === "studio" ? "Bandesha Empire" : "You"}</strong><time dateTime={message.created_at}>{date(message.created_at)}</time>{message.sender_role === "studio" && !message.read_at && <i aria-label="Unread" />}</header><small>{projectName(message.order_id)}</small><p>{message.body}</p></div></article>) : <EmptyState icon="messages" title="Start the conversation." description="A question, a quick update or a useful bit of context. The studio is a message away." />}</div></section><section className={`${styles.panel} ${styles.composePanel}`}><div className={styles.panelHeading}><div><h2>Over to you.</h2><span>Let's keep things moving.</span></div><Icon name="messages" /></div><MessageForm orders={orders} orderId={messageProject} onSubmit={submitMessage} preview={preview} /></section></div></>}

        {view === "invoices" && <><PageHeading kicker="CLEAR INVESTMENT. NO GUESSWORK." title="The numbers, clearly." description="Your project invoices and confirmed payments, all in USD." /><div className={styles.invoiceSummary}><div><span>Confirmed paid</span><strong>{money(totalPaid)}</strong><small>Recorded by the studio</small></div><div><span>Outstanding invoices</span><strong>{money(invoices.filter(invoice => invoice.status === "issued").reduce((sum, invoice) => sum + invoice.amount_cents, 0))}</strong><small>From issued invoices only</small></div><p><Icon name="shield" />Payment arrangements are confirmed directly with the studio. This portal does not collect card details.</p></div><section className={styles.panel}><div className={styles.panelHeading}><div><h2>Your invoices</h2><span>A clear record of your investment.</span></div><span className={styles.countLabel}>{invoices.length} total</span></div>{invoices.length ? <div className={styles.tableScroll}><table className={styles.invoiceTable}><thead><tr><th>INVOICE</th><th>STATUS</th><th>AMOUNT</th><th>DUE</th><th><span className={styles.srOnly}>Details</span></th></tr></thead><tbody>{invoices.map(invoice => <tr key={invoice.id}><td><strong>{invoice.invoice_number}</strong><small>{invoice.description}</small></td><td><span className={`${styles.status} ${invoice.status === "paid" ? styles.status_completed : styles.status_scoping}`}><i />{invoice.status === "issued" ? "Awaiting payment" : invoice.status === "paid" ? "Paid" : "Void"}</span></td><td className={styles.amount}>{money(invoice.amount_cents)}</td><td>{date(invoice.due_date)}</td><td><button className={styles.iconButton} type="button" aria-label={`View invoice ${invoice.invoice_number}`} onClick={() => open({ type: "invoice", id: invoice.id })}><Icon name="external" /></button></td></tr>)}</tbody></table></div> : <EmptyState icon="invoices" title="All clear for now." description="Once the scope and payment milestones are agreed, your invoices will appear here." />}</section></>}

        {view === "files" && <><PageHeading kicker="THE DETAILS THAT MAKE A DIFFERENCE" title="Everything in its place." description="The assets, references and documents that keep your projects connected." action={<button className={styles.primaryButton} type="button" onClick={() => open({ type: "upload" })}>Upload a file<Icon name="upload" /></button>} /><div className={styles.fileNotice}><span><Icon name="shield" /></span><div><strong>Your context stays close.</strong><p>Files are private to your account and the studio. Keep passwords, access tokens and other secrets out of uploads.</p></div><small>UP TO 10 MB / FILE</small></div><section className={styles.panel}><div className={styles.panelHeading}><div><h2>Workspace files</h2><span>{files.length} shared {files.length === 1 ? "file" : "files"}</span></div></div>{files.length ? <div className={styles.fileList}>{files.map(file => <article key={file.id}><span className={styles.fileType}>{file.name.split(".").pop()?.toUpperCase().slice(0, 4)}</span><div><strong>{file.name}</strong><small>{projectName(file.order_id)} <i>·</i> {size(file.size_bytes)}</small></div><time dateTime={file.created_at}>{date(file.created_at)}</time><button className={styles.iconButton} type="button" aria-label={`Download ${file.name}`} onClick={() => getFile(file.id)}><Icon name="download" /></button></article>)}</div> : <EmptyState icon="files" title="A home for the useful things." description="Share your brand assets, reference documents or project context. We'll keep them together here." action={<button className={styles.primaryButton} type="button" onClick={() => open({ type: "upload" })}>Share your first file<Icon name="upload" /></button>} />}</section></>}

        {view === "support" && <><PageHeading kicker="PEOPLE, NOT A TICKET NUMBER" title="We're here to help." description="A project question, an account detail or something that needs a closer look." /><div className={styles.supportGrid}><section className={styles.panel}><div className={styles.panelHeading}><div><h2>Tell us what's happening.</h2><span>We'll keep the conversation in your workspace.</span></div></div><MessageForm orders={orders} onSubmit={submitMessage} preview={preview} support /></section><div className={styles.supportAside}><div className={styles.supportCard}><span className={styles.kicker}>A THOUGHTFUL NEXT STEP</span><h2>Let's work<br />it out<em>.</em></h2><p>For anything project-related, a workspace message keeps the context close to the work.</p><a href={getContactEmailHref("Client portal support")} className={styles.supportLink}>Email the studio<Icon name="external" /></a><a href="https://wa.me/923023634078" target="_blank" rel="noreferrer" className={styles.supportLink}>Message on WhatsApp<Icon name="external" /></a></div><div className={styles.supportFaq}><h3>A few useful things.</h3><details><summary>How do project updates work?</summary><p>The studio updates your project's status, progress and milestones as the work moves forward. Your workspace refreshes automatically while open.</p></details><details><summary>Does submitting a brief charge me?</summary><p>No. We agree the scope, final price and payment milestones before work begins. A submitted brief is not a payment.</p></details><details><summary>Where should I share feedback?</summary><p>Use Messages and choose the related project. Your comments stay connected to the right work.</p></details></div></div></div></>}

        {view === "settings" && <><PageHeading kicker="A WORKSPACE THAT FEELS LIKE YOURS" title="The personal details." description="Keep your profile up to date so we can work better together." /><section className={`${styles.panel} ${styles.settingsPanel}`}><div className={styles.profileHeader}><span className={styles.profileAvatar}>{initials}</span><div><h2>{profile.full_name}</h2><span>{profile.email}</span><small>CLIENT ACCOUNT</small></div><Icon name="shield" /></div><ProfileForm profile={profile} onSubmit={submitProfile} /></section><div className={styles.securityNote}><Icon name="shield" /><div><strong>Your account, kept private.</strong><p>Only your account can access your client records. For password changes, use the verified email reset flow.</p></div><Link className={styles.textLink} href="/portal/forgot-password">Reset password<Icon name="external" /></Link></div></>}
        </>}
        <footer className={styles.workspaceFooter}><span><i />Built around your next chapter.</span><Link href="/">Bandesha Empire<Icon name="external" /></Link></footer>
      </main>
    </div>
    {toast && <div className={`${styles.toast} ${toast.error ? styles.toastError : ""}`} role={toast.error ? "alert" : "status"}><Icon name={toast.error ? "support" : "check"} /><span>{toast.text}</span><button type="button" onClick={() => setToast(null)} aria-label="Dismiss message"><Icon name="close" /></button></div>}
    {modal?.type === "new-order" && <Modal key="new-order" title="Start something good." subtitle="A little context now. A clearer path forward." onClose={() => setModal(null)}><NewOrderForm onSubmit={submitOrder} preview={preview} initialPackage={modal.plan} /></Modal>}
    {modal?.type === "message" && <Modal key="message" title="A good conversation starts here." subtitle="A direct line to the people building with you." onClose={() => setModal(null)}><MessageForm orders={orders} orderId={modal.orderId} onSubmit={submitMessage} preview={preview} /></Modal>}
    {modal?.type === "upload" && <Modal key="upload" title="The right context. Shared." subtitle="Assets, references and documents—kept close to the work." onClose={() => setModal(null)}><UploadForm orders={orders} onSubmit={submitFile} preview={preview} /></Modal>}
    {selectedOrder && <Modal key={selectedOrder.id} title={selectedOrder.title} subtitle={`${orderReference(selectedOrder.order_number)} · ${selectedOrder.service}`} onClose={() => setModal(null)}><div className={styles.orderDetail}><div className={styles.detailStatus}><Status status={selectedOrder.status} /><span>{selectedOrder.progress}% complete</span></div><div className={styles.detailProgress}><i style={{ width: `${selectedOrder.progress}%` }} /></div><dl className={styles.projectFacts}><div><dt>Starting point</dt><dd>{selectedOrder.package}</dd></div><div><dt>Agreed investment</dt><dd>{selectedOrder.quoted_amount_cents === null ? "To be agreed" : money(selectedOrder.quoted_amount_cents)}</dd></div><div><dt>Next milestone</dt><dd>{date(selectedOrder.due_date)}</dd></div></dl><h3>The brief</h3><p className={styles.detailBrief}>{selectedOrder.brief}</p><div className={styles.timelineHeading}><h3>The journey so far</h3><span>STUDIO UPDATES</span></div><ol className={styles.orderTimeline}>{sortedEvents.filter(event => event.order_id === selectedOrder.id).map((event, index) => <li key={event.id}><span>{index === 0 ? <Icon name="check" /> : <i />}</span><div><time dateTime={event.created_at}>{date(event.created_at, true)}</time><h4>{event.title}</h4><p>{event.description}</p></div></li>)}</ol><div className={styles.detailActions}><span>Context makes good work better.</span><button className={styles.primaryButton} type="button" onClick={() => setModal({ type: "message", orderId: selectedOrder.id })}>Message about this project<Icon name="messages" /></button></div></div></Modal>}
    {selectedInvoice && <Modal key={selectedInvoice.id} title={selectedInvoice.invoice_number} subtitle="A clear record of your investment." onClose={() => setModal(null)}><div className={styles.invoiceDetail}><div className={styles.invoiceDetailTop}><span className={styles.kicker}>{selectedInvoice.status === "paid" ? "PAYMENT RECORDED" : selectedInvoice.status === "void" ? "VOID INVOICE" : "ISSUED INVOICE"}</span><strong>{money(selectedInvoice.amount_cents)}<small>USD</small></strong></div><p>{selectedInvoice.description}</p><dl className={styles.projectFacts}><div><dt>Project</dt><dd>{projectName(selectedInvoice.order_id)}</dd></div><div><dt>Issued</dt><dd>{date(selectedInvoice.created_at)}</dd></div><div><dt>{selectedInvoice.status === "paid" ? "Paid" : "Due"}</dt><dd>{date(selectedInvoice.status === "paid" ? selectedInvoice.paid_at : selectedInvoice.due_date)}</dd></div></dl><div className={styles.reassurance}><Icon name="shield" /><p>Payment details are agreed directly with the studio. Do not share card numbers or banking passwords in messages.</p></div><button type="button" className={styles.primaryButton} onClick={() => setModal({ type: "message", orderId: selectedInvoice.order_id || undefined })}>Ask about this invoice<Icon name="messages" /></button></div></Modal>}
  </div>;
}

function PageHeading({ kicker, title, description, action }: { kicker: string; title: string; description: string; action?: ReactNode }) {
  return <div className={styles.pageHeading}><div><span className={styles.kicker}>{kicker}</span><h1>{title}</h1><p>{description}</p></div>{action}</div>;
}
