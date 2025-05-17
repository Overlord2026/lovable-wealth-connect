
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
  Eye,
  BarChart3,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function CollapsibleSidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const [defaultViewId, setDefaultViewId] = useState<string | null>(null);

  // Fetch the default panorama view ID for the "Analyze" link
  useEffect(() => {
    const fetchDefaultViewId = async () => {
      const { data, error } = await supabase
        .from('panorama_views')
        .select('id')
        .eq('is_default', true)
        .single();

      if (data && !error) {
        setDefaultViewId(data.id);
      } else {
        // Fallback - get first view if no default is set
        const { data: firstView } = await supabase
          .from('panorama_views')
          .select('id')
          .limit(1)
          .single();
          
        if (firstView) {
          setDefaultViewId(firstView.id);
        }
      }
    };

    // Only fetch when user is authenticated
    if (user) {
      fetchDefaultViewId();
    }
  }, [user]);

  // Don't render the sidebar if the user is not authenticated
  if (!user) return null;

  // Define the sidebar sections
  const sidebarSections = [
    {
      id: "home",
      title: "HOME",
      items: [
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: LayoutDashboard,
        }
      ]
    },
    {
      id: "education",
      title: "EDUCATION & SOLUTIONS",
      items: [
        {
          name: "Education",
          path: "/education",
          icon: BookOpen,
        },
        {
          name: "AI Advisor",
          path: "/ai-advisor",
          icon: MessageSquare,
        }
      ]
    },
    {
      id: "wealth",
      title: "WEALTH MANAGEMENT",
      items: [
        {
          name: "Panorama",
          path: "/panorama",
          icon: Eye,
        },
        {
          name: "Analyze",
          path: defaultViewId ? `/panorama/analyze/${defaultViewId}` : "/panorama",
          icon: BarChart3,
        },
        {
          name: "Budget",
          path: "/budget",
          icon: Wallet,
        }
      ]
    },
    {
      id: "planning",
      title: "PLANNING & SERVICES",
      items: [
        {
          name: "Loans",
          path: "/loans",
          icon: ScrollText,
        },
        {
          name: "Luxury Travel",
          path: "/luxury-travel",
          icon: Plane,
        },
        {
          name: "Network",
          path: "/network",
          icon: Users,
        }
      ]
    }
  ];

  const renderSingleMenuItem = (item) => {
    const isActive = location.pathname === item.path;
    const ItemIcon = item.icon;
    
    return (
      <Link
        key={item.path}
        to={item.path}
        className={cn(
          "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
          isActive
            ? "bg-navy-800 text-white"
            : "text-gray-300 hover:bg-navy-800/50 hover:text-white"
        )}
      >
        <ItemIcon
          className={cn(
            "mr-3 h-5 w-5",
            isActive ? "text-white" : "text-gray-400"
          )}
        />
        {item.name}
      </Link>
    );
  };

  return (
    <div className="w-full lg:w-64 shrink-0">
      <div className="bg-navy-900 rounded-lg p-4 sticky top-20">
        <h2 className="text-lg font-semibold mb-4 text-white px-3">Menu</h2>
        
        <nav className="space-y-1">
          {/* HOME section - single item without accordion */}
          {renderSingleMenuItem(sidebarSections[0].items[0])}
          
          {/* Other sections with accordions */}
          <Accordion 
            type="multiple" 
            defaultValue={sidebarSections.map(section => section.id)} 
            className="space-y-1"
          >
            {sidebarSections.slice(1).map((section) => (
              <AccordionItem 
                key={section.id} 
                value={section.id}
                className="border-b-0"
              >
                <AccordionTrigger className="py-2 px-3 text-xs font-semibold text-gray-400 hover:text-white hover:no-underline">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className="pt-1 pb-2">
                  <div className="flex flex-col space-y-1 pl-3">
                    {section.items.map((item) => {
                      const isActive = location.pathname === item.path;
                      const ItemIcon = item.icon;
                      
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={cn(
                            "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                            isActive
                              ? "bg-navy-800 text-white"
                              : "text-gray-300 hover:bg-navy-800/50 hover:text-white"
                          )}
                        >
                          <ItemIcon
                            className={cn(
                              "mr-3 h-5 w-5",
                              isActive ? "text-white" : "text-gray-400"
                            )}
                          />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </nav>
        
        <div className="mt-8 pt-6 border-t border-navy-800">
          <div className="px-3 py-2">
            <div className="flex items-center">
              <LifeBuoy className="h-5 w-5 text-gold" />
              <h3 className="ml-2 text-sm font-medium text-gray-200">Need Help?</h3>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Contact your dedicated advisor for assistance with any financial matters.
            </p>
            <Link
              to="/advisors"
              className="mt-2 block text-xs font-medium text-gold hover:text-gold-light"
            >
              Contact Advisor →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
