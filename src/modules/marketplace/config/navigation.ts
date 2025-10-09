// Navigation configuration for the Marketplace module

export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export const marketplaceNavigation: NavigationSection[] = [
  {
    title: "Platform",
    items: [
      { 
        label: "Marketplace Home", 
        href: "/marketplace", 
        description: "Browse our network" 
      },
      { 
        label: "Advisor Directory", 
        href: "/marketplace/advisors", 
        description: "Find trusted advisors" 
      },
      { 
        label: "Professional Network", 
        href: "/marketplace/network", 
        description: "Connect with peers" 
      },
      { 
        label: "Client Matching", 
        href: "/marketplace/matching", 
        description: "AI-powered matching" 
      },
    ],
  },
  {
    title: "Solutions",
    items: [
      { 
        label: "Wealth Management", 
        href: "/marketplace/solutions/wealth", 
        description: "Comprehensive planning" 
      },
      { 
        label: "Tax Planning", 
        href: "/marketplace/solutions/tax", 
        description: "Strategic optimization" 
      },
      { 
        label: "Estate Planning", 
        href: "/marketplace/solutions/estate", 
        description: "Legacy protection" 
      },
      { 
        label: "Investment Advisory", 
        href: "/marketplace/solutions/investment", 
        description: "Portfolio management" 
      },
    ],
  },
  {
    title: "Services",
    items: [
      { 
        label: "Professional Registration", 
        href: "/marketplace/register/professional", 
        description: "Join our network" 
      },
      { 
        label: "Client Onboarding", 
        href: "/marketplace/register/client", 
        description: "Get started" 
      },
      { 
        label: "Verification Services", 
        href: "/marketplace/verification", 
        description: "Get verified" 
      },
      { 
        label: "Premium Support", 
        href: "/marketplace/support", 
        description: "24/7 assistance" 
      },
    ],
  },
];

export const footerNavigation = {
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

// Quick access routes
export const marketplaceRoutes = {
  home: "/marketplace",
  advisors: "/marketplace/advisors",
  network: "/marketplace/network",
  matching: "/marketplace/matching",
  signup: "/marketplace/signup",
  registerProfessional: "/marketplace/register/professional",
  registerClient: "/marketplace/register/client",
  verification: "/marketplace/verification",
} as const;
