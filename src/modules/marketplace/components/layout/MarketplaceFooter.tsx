import { Link } from "react-router-dom";

const footerLinks = {
  platform: [
    { label: "Marketplace Home", href: "/marketplace" },
    { label: "Advisor Directory", href: "/marketplace/advisors" },
    { label: "Professional Network", href: "/marketplace/network" },
    { label: "Client Matching", href: "/marketplace/matching" },
  ],
  solutions: [
    { label: "Wealth Management", href: "/marketplace/solutions/wealth" },
    { label: "Tax Planning", href: "/marketplace/solutions/tax" },
    { label: "Estate Planning", href: "/marketplace/solutions/estate" },
    { label: "Investment Advisory", href: "/marketplace/solutions/investment" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Documentation", href: "/docs" },
    { label: "API Access", href: "/api" },
  ],
};

export function MarketplaceFooter() {
  return (
    <footer className="border-t border-wealth-800/20 bg-background/50 backdrop-blur">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-wealth-100">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-wealth-400 hover:text-wealth-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-wealth-100">Solutions</h3>
            <ul className="space-y-2">
              {footerLinks.solutions.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-wealth-400 hover:text-wealth-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-wealth-100">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-wealth-400 hover:text-wealth-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-wealth-100">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-wealth-400 hover:text-wealth-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-wealth-800/20 pt-8">
          <p className="text-center text-sm text-wealth-400">
            © {new Date().getFullYear()} Family Office Marketplace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
