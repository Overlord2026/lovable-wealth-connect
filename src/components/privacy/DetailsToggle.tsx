
import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DetailsToggleProps {
  showDetails: boolean;
  toggleDetails: () => void;
}

export function DetailsToggle({ showDetails, toggleDetails }: DetailsToggleProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <p className="font-medium">Cookie Preferences</p>
      <Button 
        variant="ghost" 
        onClick={toggleDetails} 
        className="text-accent flex items-center gap-1 p-2 hover:bg-accent/10"
      >
        {showDetails ? (
          <>Hide Details <ChevronUp className="h-4 w-4" /></>
        ) : (
          <>Show Details <ChevronDown className="h-4 w-4" /></>
        )}
      </Button>
    </div>
  );
}
