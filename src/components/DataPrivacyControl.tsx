
import React, { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { PrivacyHeader } from "./privacy/PrivacyHeader";
import { SecurityNotice } from "./privacy/SecurityNotice";
import { DetailsToggle } from "./privacy/DetailsToggle";
import { CookieDetails } from "./privacy/CookieDetails";
import { PrivacyActions } from "./privacy/PrivacyActions";

interface DataPrivacyControlProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (preferences: PrivacyPreferences) => void;
}

export interface PrivacyPreferences {
  necessary: boolean; // Always true
  functional: boolean;
  statistical: boolean;
  marketing: boolean;
}

export function DataPrivacyControl({ open, onOpenChange, onSave }: DataPrivacyControlProps) {
  const [preferences, setPreferences] = useState<PrivacyPreferences>({
    necessary: true, // Always enabled
    functional: true,
    statistical: false,
    marketing: false,
  });
  const [showDetails, setShowDetails] = useState(false);

  const handleToggle = (key: keyof PrivacyPreferences) => {
    if (key === 'necessary') return; // Cannot toggle necessary
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAcceptAll = () => {
    const allAcceptedPrefs = {
      necessary: true,
      functional: true,
      statistical: true,
      marketing: true,
    };
    setPreferences(allAcceptedPrefs);
    onSave(allAcceptedPrefs);
    saveToLocalStorage(allAcceptedPrefs, true);
    onOpenChange(false);
  };

  const handleDeclineAll = () => {
    const minimalPreferences = {
      necessary: true, // Always keep necessary
      functional: false,
      statistical: false,
      marketing: false,
    };
    setPreferences(minimalPreferences);
    onSave(minimalPreferences);
    saveToLocalStorage(minimalPreferences, true);
    onOpenChange(false);
  };

  const handleSave = () => {
    onSave(preferences);
    saveToLocalStorage(preferences, true);
    onOpenChange(false);
  };

  const saveToLocalStorage = (prefs: PrivacyPreferences, hasConsented: boolean) => {
    localStorage.setItem('privacyPreferences', JSON.stringify(prefs));
    localStorage.setItem('privacyConsentGiven', hasConsented.toString());
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="bg-white text-neutral-800 p-0 rounded-t-xl border-t border-gray-200 max-h-[90vh] overflow-y-auto shadow-lg"
      >
        <div className="flex justify-center pt-2">
          <div className="h-1.5 w-12 bg-gray-300 rounded-full mb-4"></div>
        </div>
        
        <div className="container max-w-4xl mx-auto px-6 pb-6">
          <PrivacyHeader />
          <SecurityNotice />
          <DetailsToggle showDetails={showDetails} toggleDetails={toggleDetails} />
          <CookieDetails 
            preferences={preferences} 
            handleToggle={handleToggle} 
            showDetails={showDetails} 
          />

          <div className="flex items-center mb-4 text-sm text-neutral-600">
            <p>
              View our{" "}
              <a href="/privacy-policy" className="underline hover:text-accent">
                Privacy Policy
              </a>
            </p>
          </div>

          <PrivacyActions 
            showDetails={showDetails}
            handleDeclineAll={handleDeclineAll}
            handleAcceptAll={handleAcceptAll}
            handleSave={handleSave}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
