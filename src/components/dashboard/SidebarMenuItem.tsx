
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarMenuItemProps {
  path: string;
  name: string;
  icon: LucideIcon;
}

export function SidebarMenuItem({ path, name, icon: Icon }: SidebarMenuItemProps) {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      className={cn(
        "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive
          ? "bg-navy-800 text-white"
          : "text-gray-300 hover:bg-navy-800/50 hover:text-white"
      )}
    >
      <Icon
        className={cn(
          "mr-3 h-5 w-5",
          isActive ? "text-white" : "text-gray-400"
        )}
      />
      {name}
    </Link>
  );
}
