
import React from "react";
import { Shield } from "lucide-react";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";

export function PrivacyHeader() {
  return (
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
  );
}
