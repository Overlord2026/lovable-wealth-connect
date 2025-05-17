
import React from "react";
import { Switch } from "@/components/ui/switch";

interface CookieToggleProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

export function CookieToggle({
  title,
  description,
  checked,
  onChange,
  disabled = false,
}: CookieToggleProps) {
  return (
    <div className="border border-gray-200 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-neutral-800">{title}</h3>
        <Switch 
          checked={checked} 
          onCheckedChange={onChange} 
          disabled={disabled}
          className={disabled ? "data-[state=checked]:opacity-80" : ""}
        />
      </div>
      <p className="text-sm text-neutral-600">{description}</p>
    </div>
  );
}
