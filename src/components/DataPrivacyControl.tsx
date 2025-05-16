
import React, { useState } from "react";
import { Shield, Info, Lock } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

  const handleToggle = (key: keyof PrivacyPreferences) => {
    if (key === 'necessary') return; // Cannot toggle necessary
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAcceptAll = () => {
    setPreferences({
      necessary: true,
      functional: true,
      statistical: true,
      marketing: true,
    });
    onSave({
      necessary: true,
      functional: true,
      statistical: true,
      marketing: true,
    });
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
    onOpenChange(false);
  };

  const handleSave = () => {
    onSave(preferences);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="bg-neutral-900 text-white p-0 rounded-t-xl border-t border-white/10 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-center pt-2">
          <div className="h-1.5 w-12 bg-white/20 rounded-full mb-4"></div>
        </div>
        
        <div className="container max-w-4xl mx-auto px-6">
          <SheetHeader className="mb-6 text-left">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              <SheetTitle className="text-2xl font-serif text-white">You control your data</SheetTitle>
            </div>
            <p className="text-muted-foreground/90 mt-2 text-left">
              The Boutique Family Office uses military-grade security measures and is fully SOC-2 and HIPAA compliant.
              Choose which cookies you want to allow on our website.
            </p>
          </SheetHeader>

          <div className="space-y-5 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Necessary Cookies */}
              <div className="bg-neutral-800/50 p-5 rounded-xl border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-white text-lg">Necessary</h3>
                  <Switch 
                    checked={preferences.necessary} 
                    disabled={true}
                    className="data-[state=checked]:bg-accent/60 data-[state=checked]:opacity-80"
                  />
                </div>
                <p className="text-sm text-muted-foreground/90">
                  Essential for the website to function properly. They enable core functionality such as security and account access.
                </p>
              </div>

              {/* Functional Cookies */}
              <div className="bg-neutral-800/50 p-5 rounded-xl border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-white text-lg">Functional</h3>
                  <Switch 
                    checked={preferences.functional} 
                    onCheckedChange={() => handleToggle('functional')}
                    className="data-[state=checked]:bg-accent"
                  />
                </div>
                <p className="text-sm text-muted-foreground/90">
                  Enable enhanced functionality and personalization of your experience on our website.
                </p>
              </div>

              {/* Statistical Cookies */}
              <div className="bg-neutral-800/50 p-5 rounded-xl border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-white text-lg">Statistical</h3>
                  <Switch 
                    checked={preferences.statistical} 
                    onCheckedChange={() => handleToggle('statistical')}
                    className="data-[state=checked]:bg-accent"
                  />
                </div>
                <p className="text-sm text-muted-foreground/90">
                  Help us understand how visitors interact with our website to improve our services.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-neutral-800/50 p-5 rounded-xl border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-white text-lg">Marketing</h3>
                  <Switch 
                    checked={preferences.marketing} 
                    onCheckedChange={() => handleToggle('marketing')}
                    className="data-[state=checked]:bg-accent"
                  />
                </div>
                <p className="text-sm text-muted-foreground/90">
                  Used to display personalized ads relevant to your interests across the web.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center mb-4 text-sm text-muted-foreground/80">
            <Lock className="h-4 w-4 mr-2" />
            <p>
              Protected by military-grade encryption. View our{" "}
              <a href="/privacy-policy" className="underline hover:text-accent">
                Privacy Policy
              </a>
            </p>
          </div>

          <div className="sticky bottom-0 py-6 bg-neutral-900 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex gap-3 w-full sm:w-auto">
              <Button 
                variant="outline" 
                onClick={handleDeclineAll}
                className="flex-1 sm:flex-none border-white/20 hover:bg-white/5 hover:border-white/30 text-white"
              >
                Decline All
              </Button>
              <Button 
                variant="default"
                onClick={handleAcceptAll}
                className="flex-1 sm:flex-none bg-accent hover:bg-accent/90"
              >
                Accept All
              </Button>
            </div>
            <Button 
              className="w-full sm:w-auto bg-secondary/60 hover:bg-secondary/80"
              onClick={handleSave}
            >
              Save Preferences
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
