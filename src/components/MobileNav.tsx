
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart3, Wallet, Menu, Eye, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import { navigationItems } from "@/components/navigation/DropdownNavMenu";

export function MobileNav() {
  const location = useLocation();
  const { user } = useAuth();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Navigation items for bottom bar - only shown when authenticated
  const bottomNavItems = user ? [
    {
      label: "Home",
      icon: Home,
      href: "/dashboard",
    },
    {
      label: "Panorama",
      icon: Eye,
      href: "/panorama",
    },
    {
      label: "Analyze",
      icon: BarChart3,
      href: "/panorama/analyze/default",
    },
    {
      label: "Budget",
      icon: Wallet,
      href: "/budget",
    },
    {
      label: "Menu",
      icon: Menu,
      href: "#",
      isMenuTrigger: true,
    },
  ] : [
    {
      label: "Home",
      icon: Home,
      href: "/",
    },
    {
      label: "Login",
      icon: LogIn,
      href: "/login",
    }
  ];

  // Map our navigation structure to the mobile sidebar format
  const navSections = [
    {
      id: "platform",
      title: navigationItems.platform.title.toUpperCase(),
      items: navigationItems.platform.items
    },
    {
      id: "solutions",
      title: navigationItems.solutions.title.toUpperCase(),
      items: navigationItems.solutions.items
    },
    {
      id: "services",
      title: navigationItems.services.title.toUpperCase(),
      items: navigationItems.services.items
    }
  ];

  // Only render the mobile nav if there are items to show
  if (bottomNavItems.length === 0) return null;

  return (
    <>
      {/* Main Mobile Navigation Bar at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-navy-900 border-t border-navy-800 glass-nav">
          <div className="flex items-center justify-around">
            {bottomNavItems.map((item) => {
              const isActive = location.pathname === item.href;
              
              if (item.isMenuTrigger) {
                return (
                  <Sheet key={item.label} open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                      <button 
                        className={cn(
                          "flex flex-col items-center p-3 transition-all duration-200",
                          isActive 
                            ? "text-gold text-glow" 
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <item.icon className={cn(
                          "h-6 w-6",
                          isActive 
                            ? "text-gold" 
                            : "text-gray-400"
                        )} />
                        <span className="text-xs mt-1">{item.label}</span>
                      </button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px] z-50 bg-navy-900 border-navy-800 text-white" onCloseAutoFocus={(e) => e.preventDefault()}>
                      <div className="flex flex-col h-full">
                        <div className="py-6 border-b border-navy-800">
                          <span className="text-xl font-serif font-bold text-white">Family Office <span className="text-gold">Marketplace</span></span>
                        </div>
                        
                        <div className="flex flex-col gap-2 mt-4 overflow-auto">
                          {navSections.map((section) => {
                            return (
                              <Accordion 
                                key={section.id} 
                                type="multiple" 
                                defaultValue={[section.id]}
                                className="border-b border-navy-800"
                              >
                                <AccordionItem value={section.id} className="border-b-0">
                                  <AccordionTrigger className="py-2 px-3 text-xs font-semibold text-gray-400 hover:text-white hover:no-underline">
                                    {section.title}
                                  </AccordionTrigger>
                                  <AccordionContent className="pt-1 pb-2">
                                    <div className="flex flex-col space-y-1 pl-3">
                                      {section.items.map((item) => {
                                        const isItemActive = location.pathname === item.href;
                                        
                                        return (
                                          <Link
                                            key={item.href}
                                            to={item.href}
                                            className={cn(
                                              "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                              isItemActive
                                                ? "bg-navy-800 text-white"
                                                : "text-gray-300 hover:bg-navy-800/50 hover:text-white"
                                            )}
                                            onClick={() => setIsSheetOpen(false)}
                                          >
                                            <span>{item.name}</span>
                                          </Link>
                                        );
                                      })}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            );
                          })}
                        </div>
                        
                        {!user && (
                          <div className="mt-4 p-3 border-t border-navy-800">
                            <div className="flex flex-col space-y-2">
                              <Link 
                                to="/login" 
                                className="w-full py-2 px-3 text-center bg-navy-800 text-white rounded-md hover:bg-navy-700 transition-colors"
                                onClick={() => setIsSheetOpen(false)}
                              >
                                Sign In
                              </Link>
                              <Link 
                                to="/register" 
                                className="w-full py-2 px-3 text-center bg-gold text-navy-900 rounded-md hover:bg-gold-dark transition-colors"
                                onClick={() => setIsSheetOpen(false)}
                              >
                                Register
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </SheetContent>
                  </Sheet>
                );
              }
              
              return (
                <Link 
                  key={item.label}
                  to={item.href}
                  className={cn(
                    "flex flex-col items-center p-3 transition-all duration-200",
                    isActive 
                      ? "text-gold text-glow" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className={cn(
                    "h-6 w-6",
                    isActive 
                      ? "text-gold" 
                      : "text-gray-400"
                  )} />
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
