import BrandMark from "@/components/BrandMark";

const FOOTER_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="relative block h-7 w-7">
                <BrandMark className="h-full w-full" />
              </span>
              <span className="text-lg font-semibold tracking-tight text-foreground">
                Bandesha Empire
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              A digital studio building websites, automations and connected
              systems that help businesses run with clarity.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Navigate
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-foreground transition-colors hover:text-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {year} Bandesha Empire. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Built with intention. Maintained with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
