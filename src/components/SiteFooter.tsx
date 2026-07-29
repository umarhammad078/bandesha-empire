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
    <footer id="footer" className="site-footer">
      <div className="site-footer-ambient" aria-hidden="true" />
      <div className="site-footer-shell">
        <div className="site-footer-directory">
          <div className="site-footer-studio">
            <span>Studio</span>
            <strong>Pakistan · Working worldwide</strong>
            <p>Direct remote collaboration, clear ownership and senior delivery.</p>

            <div className="site-footer-leadership">
              <i aria-hidden="true">UH</i>
              <span>
                <small>Chief Executive Officer</small>
                <b>Umar Hammad</b>
              </span>
            </div>

            <div className="site-footer-contact" aria-label="Contact Bandesha Empire">
              <a href="mailto:bandeshaempire@gmail.com">
                <i aria-hidden="true">
                  <svg viewBox="0 0 20 20">
                    <rect x="2.5" y="4" width="15" height="12" rx="2.5" />
                    <path d="m4 6 6 4.8L16 6" />
                  </svg>
                </i>
                <span>
                  <small>Email</small>
                  <b>bandeshaempire@gmail.com</b>
                </span>
                <svg className="site-footer-contact-arrow" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
                </svg>
              </a>

              <a
                href="https://wa.me/923023634078"
                target="_blank"
                rel="noreferrer"
              >
                <i aria-hidden="true">
                  <svg viewBox="0 0 20 20">
                    <path d="M16.3 13.9a7.1 7.1 0 1 0-2.5 2.1l3.5.7-1-2.8Z" />
                    <path d="M7.1 6.7c.2-.4.4-.4.7-.4h.4c.1 0 .3 0 .4.4l.7 1.7c.1.2 0 .4-.1.5l-.5.6c-.2.2-.1.4 0 .6.5.9 1.2 1.6 2.1 2.1.2.1.4.2.6 0l.7-.8c.2-.2.4-.2.6-.1l1.7.8c.2.1.4.2.4.4 0 .2-.1 1.1-.6 1.5-.4.5-1 .7-1.7.7-.5 0-1.2-.1-2.1-.5-1.1-.5-4.5-1.7-6.1-5.9-.4-1-.1-1.5.1-1.9Z" />
                  </svg>
                </i>
                <span>
                  <small>WhatsApp</small>
                  <b>+92 302 363 4078</b>
                </span>
                <svg className="site-footer-contact-arrow" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
                </svg>
              </a>
            </div>
          </div>

          <nav className="site-footer-nav" aria-label="Footer navigation">
            <span>Explore</span>
            <ul>
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>
                    <span>{link.label}</span>
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="site-footer-wordmark" aria-hidden="true">
          Bandesha Empire
        </div>

        <div className="site-footer-bottom">
          <p>© {year} Bandesha Empire. All rights reserved.</p>
          <p>Built with intention. Maintained with care.</p>
        </div>
      </div>
    </footer>
  );
}
