
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  ScrollText,
  BookOpen,
  MessageSquare,
  Users,
  LifeBuoy,
  Plane,
  Eye
} from "lucide-react";

const sidebarItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Panorama", path: "/panorama", icon: Eye },
  { name: "Budget", path: "/budget", icon: Wallet },
  { name: "Loans", path: "/loans", icon: ScrollText },
  { name: "Education", path: "/education", icon: BookOpen },
  { name: "AI Advisor", path: "/ai-advisor", icon: MessageSquare },
  { name: "Network", path: "/network", icon: Users },
  { name: "Luxury Travel", path: "/luxury-travel", icon: Plane },
];

export function DashboardSidebar() {
  const location = useLocation();

  return (
    <div className="w-full lg:w-64 shrink-0">
      <div className="bg-white rounded-lg shadow p-6 sticky top-20">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Menu</h2>
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            const ItemIcon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-wealth-50 text-wealth-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ItemIcon
                  className={`mr-3 h-5 w-5 ${
                    isActive ? "text-wealth-700" : "text-gray-400"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="px-3 py-2">
            <div className="flex items-center">
              <LifeBuoy className="h-5 w-5 text-wealth-600" />
              <h3 className="ml-2 text-sm font-medium text-gray-900">Need Help?</h3>
            </div>
            <p className="mt-1 text-xs text-gray-600">
              Contact your dedicated advisor for assistance with any financial matters.
            </p>
            <Link
              to="/advisors"
              className="mt-2 block text-xs font-medium text-wealth-700 hover:text-wealth-800"
            >
              Contact Advisor →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
