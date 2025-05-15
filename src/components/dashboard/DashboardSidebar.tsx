
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  ChartBar,
  CreditCard,
  DollarSign,
  FileText,
  Home,
  PieChart,
  Settings,
  User,
  Bot,
} from "lucide-react";

export function DashboardSidebar() {
  const { user } = useAuth();
  
  const menuItems = [
    { name: "Overview", icon: Home, path: "/dashboard" },
    { name: "AI Advisor", icon: Bot, path: "/ai-advisor" },
    { name: "Accounts", icon: CreditCard, path: "/accounts" },
    { name: "Budgeting", icon: PieChart, path: "/budget" },
    { name: "Investments", icon: ChartBar, path: "/investments" },
    { name: "Financial Goals", icon: DollarSign, path: "/goals" },
    { name: "Documents", icon: FileText, path: "/documents" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Settings", icon: Settings, path: "/settings" }
  ];
  
  return (
    <div className="w-full lg:w-64 bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="h-12 w-12 rounded-full bg-navy-100 flex items-center justify-center text-navy-800">
          <User size={24} />
        </div>
        <div>
          <p className="font-medium text-navy-900">{user?.name || "User"}</p>
          <p className="text-sm text-navy-600 truncate max-w-[150px]">{user?.email}</p>
        </div>
      </div>
      
      <div className="mt-8">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-3 py-3 rounded-md transition-colors
                ${(window.location.pathname === item.path)
                  ? 'bg-wealth-700/10 text-wealth-700'
                  : 'text-gray-700 hover:bg-gray-100'}
              `}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto pt-8 border-t border-gray-200 mt-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-800">Need help?</h3>
          <p className="text-sm text-blue-600 mt-1">Connect with an advisor</p>
          <Link
            to="/advisors"
            className="mt-3 block text-sm font-medium text-blue-700 hover:underline"
          >
            Find an Advisor →
          </Link>
        </div>
      </div>
    </div>
  );
}
