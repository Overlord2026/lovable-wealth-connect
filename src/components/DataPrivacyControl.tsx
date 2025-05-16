
import React, { useState, useEffect } from "react";
import { Shield, Info, Lock, ChevronUp, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

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
          <SheetHeader className="mb-6 text-left">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-accent" />
              <SheetTitle className="text-2xl font-serif text-neutral-800">Privacy Settings</SheetTitle>
            </div>
            <p className="text-neutral-600 mt-2 text-left leading-relaxed">
              The Boutique Family Office respects your privacy. Please choose which cookies you want to allow on our website. 
              Your privacy choices will be saved for future visits.
            </p>
          </SheetHeader>

          <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center">
            <Lock className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
            <p className="text-sm text-neutral-600">
              Protected by military-grade encryption. We are fully SOC-2 and HIPAA compliant.
            </p>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <p className="font-medium">Cookie Preferences</p>
            <Button 
              variant="ghost" 
              onClick={toggleDetails} 
              className="text-accent flex items-center gap-1 p-2"
            >
              {showDetails ? (
                <>Hide Details <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>Show Details <ChevronDown className="h-4 w-4" /></>
              )}
            </Button>
          </div>

          {!showDetails ? (
            <div className="mb-6 text-sm text-neutral-600">
              <p>
                Necessary cookies are always enabled as they're essential for the website to function. 
                Other cookie types help us improve your experience and our services.
              </p>
            </div>
          ) : (
            <div className="space-y-4 mb-6">
              {/* Necessary Cookies */}
              <div className="border border-gray-200 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-neutral-800">Necessary</h3>
                  <Switch 
                    checked={preferences.necessary} 
                    disabled={true}
                    className="data-[state=checked]:bg-gray-400 data-[state=checked]:opacity-80"
                  />
                </div>
                <p className="text-sm text-neutral-600">
                  Essential for the website to function properly. They enable core functionality such as security and account access.
                </p>
              </div>

              {/* Functional Cookies */}
              <div className="border border-gray-200 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-neutral-800">Functional</h3>
                  <Switch 
                    checked={preferences.functional} 
                    onCheckedChange={() => handleToggle('functional')}
                    className="data-[state=checked]:bg-accent"
                  />
                </div>
                <p className="text-sm text-neutral-600">
                  Enable enhanced functionality and personalization of your experience on our website.
                </p>
              </div>

              {/* Statistical Cookies */}
              <div className="border border-gray-200 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-neutral-800">Statistical</h3>
                  <Switch 
                    checked={preferences.statistical} 
                    onCheckedChange={() => handleToggle('statistical')}
                    className="data-[state=checked]:bg-accent"
                  />
                </div>
                <p className="text-sm text-neutral-600">
                  Help us understand how visitors interact with our website to improve our services.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="border border-gray-200 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-neutral-800">Marketing</h3>
                  <Switch 
                    checked={preferences.marketing} 
                    onCheckedChange={() => handleToggle('marketing')}
                    className="data-[state=checked]:bg-accent"
                  />
                </div>
                <p className="text-sm text-neutral-600">
                  Used to display personalized ads relevant to your interests across the web.
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center mb-4 text-sm text-neutral-600">
            <p>
              View our{" "}
              <a href="/privacy-policy" className="underline hover:text-accent">
                Privacy Policy
              </a>
            </p>
          </div>

          <div className="py-4 bg-white border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex gap-3 w-full sm:w-auto">
              <Button 
                variant="outline" 
                onClick={handleDeclineAll}
                className="flex-1 sm:flex-none border-gray-300 hover:bg-gray-100 text-neutral-800"
              >
                Decline All
              </Button>
              <Button 
                variant="default"
                onClick={handleAcceptAll}
                className="flex-1 sm:flex-none bg-accent hover:bg-accent/90 text-white"
              >
                Accept All
              </Button>
            </div>
            {showDetails && (
              <Button 
                className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-neutral-800"
                onClick={handleSave}
              >
                Save Preferences
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
