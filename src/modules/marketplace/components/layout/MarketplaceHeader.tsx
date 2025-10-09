import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

const platformItems: NavigationItem[] = [
  { label: "Marketplace Home", href: "/marketplace", description: "Browse our network" },
  { label: "Advisor Directory", href: "/marketplace/advisors", description: "Find trusted advisors" },
  { label: "Professional Network", href: "/marketplace/network", description: "Connect with peers" },
  { label: "Client Matching", href: "/marketplace/matching", description: "AI-powered matching" },
];

const solutionsItems: NavigationItem[] = [
  { label: "Wealth Management", href: "/marketplace/solutions/wealth", description: "Comprehensive planning" },
  { label: "Tax Planning", href: "/marketplace/solutions/tax", description: "Strategic optimization" },
  { label: "Estate Planning", href: "/marketplace/solutions/estate", description: "Legacy protection" },
  { label: "Investment Advisory", href: "/marketplace/solutions/investment", description: "Portfolio management" },
];

const servicesItems: NavigationItem[] = [
  { label: "Professional Registration", href: "/marketplace/register/professional", description: "Join our network" },
  { label: "Client Onboarding", href: "/marketplace/register/client", description: "Get started" },
  { label: "Verification Services", href: "/marketplace/verification", description: "Get verified" },
  { label: "Premium Support", href: "/marketplace/support", description: "24/7 assistance" },
];

export function MarketplaceHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-wealth-800/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/marketplace" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-wealth-500 to-wealth-700">
                <span className="text-sm font-bold text-white">FO</span>
              </div>
              <span className="hidden font-semibold sm:inline-block text-wealth-100">
                Family Office Marketplace
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-1">
            {/* Platform Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1 text-wealth-200 hover:text-wealth-100">
                  Platform
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 bg-background/95 backdrop-blur border-wealth-800/20">
                {platformItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link to={item.href} className="flex flex-col items-start px-4 py-3">
                      <span className="font-medium text-wealth-100">{item.label}</span>
                      {item.description && (
                        <span className="text-xs text-wealth-400">{item.description}</span>
                      )}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Solutions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1 text-wealth-200 hover:text-wealth-100">
                  Solutions
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 bg-background/95 backdrop-blur border-wealth-800/20">
                {solutionsItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link to={item.href} className="flex flex-col items-start px-4 py-3">
                      <span className="font-medium text-wealth-100">{item.label}</span>
                      {item.description && (
                        <span className="text-xs text-wealth-400">{item.description}</span>
                      )}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1 text-wealth-200 hover:text-wealth-100">
                  Services
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 bg-background/95 backdrop-blur border-wealth-800/20">
                {servicesItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link to={item.href} className="flex flex-col items-start px-4 py-3">
                      <span className="font-medium text-wealth-100">{item.label}</span>
                      {item.description && (
                        <span className="text-xs text-wealth-400">{item.description}</span>
                      )}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            <Button variant="ghost" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-wealth-700 hover:bg-wealth-800">
              <Link to="/marketplace/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-wealth-800/20 py-4 md:hidden">
            <div className="space-y-4">
              <MobileNavSection title="Platform" items={platformItems} />
              <MobileNavSection title="Solutions" items={solutionsItems} />
              <MobileNavSection title="Services" items={servicesItems} />
              
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild className="bg-wealth-700 hover:bg-wealth-800">
                  <Link to="/marketplace/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function MobileNavSection({ title, items }: { title: string; items: NavigationItem[] }) {
  return (
    <div>
      <h3 className="mb-2 px-4 text-sm font-semibold text-wealth-300">{title}</h3>
      <div className="space-y-1">
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="block px-4 py-2 text-wealth-200 hover:bg-wealth-800/10 hover:text-wealth-100"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
