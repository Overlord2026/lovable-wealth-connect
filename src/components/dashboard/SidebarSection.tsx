
import React from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { LucideIcon } from "lucide-react";

interface SidebarSectionItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

interface SidebarSectionProps {
  id: string;
  title: string;
  items: SidebarSectionItem[];
}

export function SidebarSection({ id, title, items }: SidebarSectionProps) {
  return (
    <AccordionItem 
      value={id}
      className="border-b-0"
    >
      <AccordionTrigger className="py-2 px-3 text-xs font-semibold text-gray-400 hover:text-white hover:no-underline">
        {title}
      </AccordionTrigger>
      <AccordionContent className="pt-1 pb-2">
        <div className="flex flex-col space-y-1 pl-3">
          {items.map((item) => (
            <SidebarMenuItem 
              key={item.path} 
              path={item.path} 
              name={item.name} 
              icon={item.icon} 
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
