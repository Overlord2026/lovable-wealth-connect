
import React from "react";
import { Button } from "@/components/ui/button";
import { PrivacyPreferences } from "../DataPrivacyControl";

interface PrivacyActionsProps {
  showDetails: boolean;
  handleDeclineAll: () => void;
  handleAcceptAll: () => void;
  handleSave: () => void;
}

export function PrivacyActions({
  showDetails,
  handleDeclineAll,
  handleAcceptAll,
  handleSave
}: PrivacyActionsProps) {
  return (
    <div className="py-4 bg-white border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
      <div className="flex gap-3 w-full sm:w-auto">
        <Button 
          variant="outline" 
          onClick={handleDeclineAll}
          className="flex-1 sm:flex-none bg-[#0A1F33] hover:bg-[#0A1F33]/80 border-gray-300 text-gold hover:text-gold transition-colors duration-200"
        >
          Decline All
        </Button>
        <Button 
          variant="default"
          onClick={handleAcceptAll}
          className="flex-1 sm:flex-none bg-gold hover:bg-gold/80 text-navy-950 font-medium transition-colors duration-200"
        >
          Accept All
        </Button>
      </div>
      {showDetails && (
        <Button 
          className="w-full sm:w-auto bg-[#0A1F33] hover:bg-[#0A1F33]/80 text-gold hover:text-gold/90 transition-colors duration-200"
          onClick={handleSave}
        >
          Save Preferences
        </Button>
      )}
    </div>
  );
}
