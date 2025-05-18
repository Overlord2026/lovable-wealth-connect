
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { navigationItems } from './DropdownNavMenu';
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar";

// Custom hamburger menu icon component
const MenuIcon = () => (
  <div className="flex flex-col justify-center items-center space-y-1 ml-1.5 h-3 w-4">
    <span className="block w-4 h-0.5 bg-current rounded-sm"></span>
    <span className="block w-4 h-0.5 bg-current rounded-sm"></span>
    <span className="block w-4 h-0.5 bg-current rounded-sm"></span>
  </div>
);

export function LoginPageNav() {
  return (
    <div className="hidden md:flex items-center gap-6">
      <Menubar className="border-0 bg-transparent">
        {Object.values(navigationItems).map((category) => (
          <MenubarMenu key={category.title}>
            <MenubarTrigger className="text-neutral-300 hover:text-white hover:bg-[#25293F]/80 px-4 font-medium flex items-center">
              <span className="mr-1">{category.title}</span>
              <MenuIcon />
            </MenubarTrigger>
            <MenubarContent className="bg-[#1B1E2E] border border-navy-800 min-w-[220px]">
              {category.items.map((item) => (
                <MenubarItem key={item.name} asChild>
                  <Link
                    to={item.href.startsWith('#') ? `/${item.href}` : item.href}
                    className="text-neutral-300 hover:text-white hover:bg-[#25293F]/80 cursor-pointer"
                  >
                    {item.name}
                  </Link>
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        ))}
      </Menubar>
      
      <Link to="/register">
        <Button className="bg-gold text-navy-900 hover:bg-gold-dark font-medium">Get Started</Button>
      </Link>
    </div>
  );
}
