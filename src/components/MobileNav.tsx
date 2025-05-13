
import { Link, useLocation } from "react-router-dom";
import { Home, User, Search, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const location = useLocation();

  const navItems = [
    {
      label: "Home",
      icon: Home,
      href: "/",
    },
    {
      label: "Search",
      icon: Search,
      href: "/search",
    },
    {
      label: "Profile",
      icon: User,
      href: "/profile",
    },
    {
      label: "Menu",
      icon: Menu,
      href: "#menu",
      sheet: true,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-white shadow-lg border-t border-gray-100">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link 
                key={item.label}
                to={item.href}
                className={cn(
                  "flex flex-col items-center p-3",
                  isActive ? "text-teal-600" : "text-gray-500"
                )}
              >
                <item.icon className={cn(
                  "h-6 w-6",
                  isActive ? "text-teal-600" : "text-gray-500"
                )} />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
