import React from "react";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  ScrollText,
  BookOpen,
  MessageSquare,
  Users,
  Plane,
  Eye,
  BarChart3,
} from "lucide-react";
import { 
  Accordion
} from "@/components/ui/accordion";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarSection } from "./SidebarSection";
import { SidebarHelp } from "./SidebarHelp";
import { usePanoramaDefaultView } from "@/hooks/usePanoramaDefaultView";

export function CollapsibleSidebar() {
  const { user } = useAuth();
  const defaultViewId = usePanoramaDefaultView();

  // Don't render the sidebar if the user is not authenticated
  if (!user) return null;

  // Define the sidebar sections
  const sidebarSections = [
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

  return (
    <div className="w-full lg:w-64 shrink-0">
      <div className="bg-navy-900 rounded-lg p-4 sticky top-20">
        <h2 className="text-lg font-semibold mb-4 text-white px-3">Menu</h2>
        
        <nav className="space-y-1">
          {/* HOME section - single item without accordion */}
          <SidebarMenuItem 
            path="/dashboard" 
            name="Dashboard" 
            icon={LayoutDashboard} 
          />
          
          {/* Other sections with accordions */}
          <Accordion 
            type="multiple" 
            defaultValue={sidebarSections.map(section => section.id)} 
            className="space-y-1"
          >
            {sidebarSections.map((section) => (
              <SidebarSection
                key={section.id}
                id={section.id}
                title={section.title}
                items={section.items}
              />
            ))}
          </Accordion>
        </nav>
        
        <SidebarHelp />
      </div>
    </div>
  );
}
