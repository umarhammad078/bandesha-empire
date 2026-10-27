export type IconName = "overview" | "orders" | "messages" | "invoices" | "files" | "support" | "settings" | "arrow" | "plus" | "bell" | "logout" | "search" | "check" | "clock" | "close" | "upload" | "download" | "shield" | "calendar" | "spark" | "menu" | "external";

export default function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  const paths = {
    overview: <><rect x="3.5" y="3.5" width="6" height="6" rx="1.5" /><rect x="14.5" y="3.5" width="6" height="6" rx="1.5" /><rect x="3.5" y="14.5" width="6" height="6" rx="1.5" /><rect x="14.5" y="14.5" width="6" height="6" rx="1.5" /></>,
    orders: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V2.5h6V4M9 10h6M9 14h6M9 18h3" /></>,
    messages: <path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6 3V6a2 2 0 0 1 2-2Z" />,
    invoices: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3 10h18M7 15h4" /></>,
    files: <path d="M3 7a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />,
    support: <><circle cx="12" cy="12" r="9" /><path d="M9.8 9a2.3 2.3 0 1 1 3 2.4c-.8.3-.8 1-.8 1.6M12 16.5h.01" /></>,
    settings: <><path d="m10 3-.6 2-1.8 1-2-.5-2 3.5L5 10.5v2.1L3.6 14l2 3.5 2-.5 1.8 1 .6 2h4l.6-2 1.8-1 2 .5 2-3.5-1.4-1.4v-2.1L20.4 9l-2-3.5-2 .5-1.8-1-.6-2h-4Z" /><circle cx="12" cy="11.5" r="3" /></>,
    arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" /></>,
    logout: <><path d="M9 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M13 7l5 5-5 5M8 12h11" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    check: <path d="m5 12 4.5 4.5L19 7" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    upload: <><path d="M12 16V3M7 8l5-5 5 5M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" /></>,
    download: <><path d="M12 3v13M7 11l5 5 5-5M4 16v4h16v-4" /></>,
    shield: <><path d="m12 3 8 3v5c0 5-4 8-8 10-4-2-8-5-8-10V6l8-3Z" /><path d="m8 12 3 3 5-6" /></>,
    calendar: <><rect x="3.5" y="5" width="17" height="16" rx="2" /><path d="M7 3v4M17 3v4M3.5 10h17M8 14h2M14 14h2" /></>,
    spark: <path d="m12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7L12 2Z" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    external: <path d="M6 18 18 6M6 6h12v12" />,
  };
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
