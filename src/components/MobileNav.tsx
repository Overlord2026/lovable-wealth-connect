
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
      <div className="bg-card shadow-lg border-t border-border glass-nav">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link 
                key={item.label}
                to={item.href}
                className={cn(
                  "flex flex-col items-center p-3 transition-all duration-200",
                  isActive 
                    ? "text-accent text-glow" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className={cn(
                  "h-6 w-6",
                  isActive 
                    ? "text-accent" 
                    : "text-muted-foreground"
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
