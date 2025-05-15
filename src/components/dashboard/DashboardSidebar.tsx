
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  PieChart,
  MessageSquarePlus,
  User,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      href: "/budget",
      label: "Budget",
      icon: <PieChart className="mr-2 h-4 w-4" />,
    },
    {
      href: "/payments",
      label: "Payments",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
    },
    {
      href: "/loans",
      label: "Loans",
      icon: <Wallet className="mr-2 h-4 w-4" />,
    },
    {
      href: "/ai-advisor",
      label: "AI Advisor",
      icon: <MessageSquarePlus className="mr-2 h-4 w-4" />,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: <User className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <div className="w-full lg:w-64 mb-6 lg:mb-0">
      <div className="bg-sidebar-background border border-sidebar-border rounded-lg overflow-hidden">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-sidebar-foreground">
            Dashboard
          </h2>
          <div className="space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center rounded-md px-4 py-2 text-sm font-medium",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )
                }
                end
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
