import React from "react";
import { Sidebar, SidebarItem } from "@/components/ui/sidebar";
import { useSession, signOut } from "next-auth/react";
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
  BookOpen
} from "lucide-react";
import { Settings } from "lucide-react";
import { useRouter } from 'next/navigation';

export function DashboardSidebar() {
  const { data: session } = useSession();
  const router = useRouter();
  
  return (
    <Sidebar className="border-r lg:border-r lg:block">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "Avatar"} />
                  <AvatarFallback>{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{session?.user?.name}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/profile')}>
                <Settings className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
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
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
