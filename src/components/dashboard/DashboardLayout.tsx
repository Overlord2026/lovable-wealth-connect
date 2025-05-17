
import React from "react";
import { CollapsibleSidebar } from "./CollapsibleSidebar";
import { DashboardContent } from "./DashboardContent";
import { MobileNav } from "@/components/MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {!isMobile && <CollapsibleSidebar />}
      <DashboardContent>
        {children}
      </DashboardContent>
      <MobileNav />
    </div>
  );
}
