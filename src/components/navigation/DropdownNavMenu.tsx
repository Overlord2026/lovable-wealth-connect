
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

// Define the navigation menu structure
export const navigationItems = {
  platform: {
    title: 'Platform',
    items: [
      { name: 'Analysis', href: '/analysis' },
      { name: 'Intelligence', href: '/intelligence' },
      { name: 'Panorama', href: '/panorama' },
      { name: 'Data Management', href: '/data-management' },
    ]
  },
  solutions: {
    title: 'Solutions',
    items: [
      { name: 'Wealth Management', href: '/wealth-management' },
      { name: 'Family Office', href: '/family-office' },
      { name: 'Private Equity', href: '/private-equity' },
      { name: 'Advisors', href: '/advisors' },
    ]
  },
  services: {
    title: 'Services',
    items: [
      { name: 'Education', href: '/education' },
      { name: 'Concierge', href: '/luxury-travel' },
      { name: 'Network', href: '/network' },
      { name: 'Contact', href: '#contact' },
    ]
  }
};

// Type definitions
interface NavItemProps {
  name: string;
  href: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ name, href, active }) => {
  return (
    <Link 
      to={href.startsWith('#') ? `/${href}` : href}
      className={cn(
        "block px-4 py-2 text-sm transition-colors",
        active 
          ? "text-white font-medium" 
          : "text-neutral-300 hover:text-white hover:bg-[#25293F]/80"
      )}
    >
      {name}
    </Link>
  );
};

// Custom hamburger menu icon component - IMPROVED for visibility
const MenuIcon = () => (
  <div className="flex flex-col justify-center items-center space-y-1.5 ml-1.5 h-4 w-4">
    <span className="block w-4 h-0.5 bg-white rounded-sm"></span>
    <span className="block w-4 h-0.5 bg-white rounded-sm"></span>
    <span className="block w-4 h-0.5 bg-white rounded-sm"></span>
  </div>
);

interface DropdownNavMenuProps {
  className?: string;
}

export const DropdownNavMenu: React.FC<DropdownNavMenuProps> = ({ className }) => {
  const location = useLocation();
  
  return (
    <NavigationMenu className={cn("hidden md:flex", className)}>
      <NavigationMenuList className="gap-1">
        {Object.values(navigationItems).map((category) => (
          <NavigationMenuItem key={category.title}>
            <NavigationMenuTrigger 
              className="bg-transparent hover:bg-[#25293F]/80 text-neutral-300 hover:text-white px-4 py-2 text-sm group flex items-center z-50"
            >
              <span className="mr-1">{category.title}</span>
              <MenuIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-[#1B1E2E] border border-navy-800 min-w-[220px]">
              <div className="p-2">
                {category.items.map((item) => (
                  <NavItem 
                    key={item.name} 
                    name={item.name} 
                    href={item.href} 
                    active={location.pathname === item.href}
                  />
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

// Simple version of the menu to be used in other places
export const SimpleNavLinks: React.FC<{ className?: string }> = ({ className }) => {
  const location = useLocation();
  
  // Combine all items for a simple navigation list
  const allItems = [
    ...navigationItems.platform.items,
    ...navigationItems.solutions.items,
    ...navigationItems.services.items,
  ];
  
  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      {allItems.map((item) => (
        <NavItem 
          key={item.name} 
          name={item.name} 
          href={item.href} 
          active={location.pathname === item.href}
        />
      ))}
    </div>
  );
};
