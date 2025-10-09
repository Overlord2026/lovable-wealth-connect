import { ReactNode } from "react";
import { MarketplaceHeader } from "./MarketplaceHeader";
import { MarketplaceFooter } from "./MarketplaceFooter";

interface MarketplaceLayoutProps {
  children: ReactNode;
  className?: string;
}

export function MarketplaceLayout({ children, className = "" }: MarketplaceLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-wealth-950/20">
      <MarketplaceHeader />
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      <MarketplaceFooter />
    </div>
  );
}
