
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: ReactNode;
  activeTab: "login" | "register";
}

export function AuthCard({ children, activeTab }: AuthCardProps) {
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="font-serif text-3xl font-bold text-glow">WealthConnect</h1>
        <p className="mt-2 text-muted-foreground">Your financial future starts here</p>
      </div>
      
      <div className="premium-card rounded-xl shadow-xl border border-border/50 overflow-hidden bg-neutral-800/80 backdrop-blur-sm">
        <div className="flex space-x-1 bg-[#1B1E2E] rounded-t-lg p-1">
          <Link 
            to="/login"
            className={cn(
              "flex-1 text-center rounded-md py-2 font-semibold transition-colors",
              activeTab === "login" 
                ? "bg-[#25293F] text-white border-b-2 border-[#00B8BF]" 
                : "text-[#6B7280] hover:text-white"
            )}
          >
            Login
          </Link>
          <Link 
            to="/register"
            className={cn(
              "flex-1 text-center rounded-md py-2 font-semibold transition-colors",
              activeTab === "register" 
                ? "bg-[#25293F] text-white border-b-2 border-[#00B8BF]" 
                : "text-[#6B7280] hover:text-white"
            )}
          >
            Sign Up
          </Link>
        </div>
        
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
