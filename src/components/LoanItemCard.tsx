
import React from "react";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface LoanItemCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  rightIcon?: React.ReactNode;
}

export function LoanItemCard({ 
  id, 
  title, 
  description, 
  icon: Icon, 
  onClick,
  rightIcon
}: LoanItemCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <Button
      variant="outline"
      className={`flex items-start justify-between h-auto p-6 transition-all duration-300 w-full rounded-xl shadow-sm ${
        isHovered 
          ? 'bg-white shadow-lg border-teal-200 translate-y-[-2px]' 
          : 'bg-white hover:border-teal-200'
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      aria-label={`Select ${title}`}
    >
      <div className="flex items-center gap-4">
        <div className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 ${
          isHovered ? 'bg-teal-500 text-white' : 'bg-teal-100 text-teal-700'
        }`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="text-left">
          <h3 className="font-bold text-navy-800">{title}</h3>
          <p className="text-sm text-navy-600 mt-1">{description}</p>
        </div>
      </div>
      {rightIcon && (
        <div className="flex-shrink-0 ml-4">
          {rightIcon}
        </div>
      )}
    </Button>
  );
}
