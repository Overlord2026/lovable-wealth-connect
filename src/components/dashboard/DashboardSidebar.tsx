
import React from "react";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Home, 
  PieChart, 
  MessageCircle, 
  User, 
  CreditCard, 
  Clock, 
  BookOpen,
  Plane
} from "lucide-react";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ReactNode;
  href: string;
  text: string;
}

function SidebarItem({ icon, href, text }: SidebarItemProps) {
  return (
    <Link
      to={href}
      className="flex items-center space-x-2 rounded-md px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}

export function DashboardSidebar() {
  return (
    <Sidebar className="border-r lg:border-r lg:block">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src="" alt="User Avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className="font-medium">User</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => window.location.href = '/profile'}>
                <Settings className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
              Dashboard
            </h2>
            <SidebarItem
              icon={<Home className="h-4 w-4" />}
              href="/dashboard"
              text="Overview"
            />
            <SidebarItem
              icon={<PieChart className="h-4 w-4" />}
              href="/budget"
              text="Budget"
            />
            <SidebarItem
              icon={<BookOpen className="h-4 w-4" />}
              href="/education"
              text="Education"
            />
            <SidebarItem
              icon={<MessageCircle className="h-4 w-4" />}
              href="/ai-advisor"
              text="AI Advisor"
            />
            <SidebarItem
              icon={<User className="h-4 w-4" />}
              href="/profile"
              text="Profile"
            />
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Financial Tools
          </h2>
          <div className="space-y-1">
            <SidebarItem
              icon={<CreditCard className="h-4 w-4" />}
              href="/loans"
              text="Loans"
            />
            <SidebarItem
              icon={<Clock className="h-4 w-4" />}
              href="/payments"
              text="Payments"
            />
            <SidebarItem
              icon={<Plane className="h-4 w-4" />}
              href="/luxury-travel"
              text="Luxury Travel"
            />
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
