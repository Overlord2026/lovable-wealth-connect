
import React from "react";
import { Link } from "react-router-dom";
import { LifeBuoy } from "lucide-react";

export function SidebarHelp() {
  return (
    <div className="mt-8 pt-6 border-t border-navy-800">
      <div className="px-3 py-2">
        <div className="flex items-center">
          <LifeBuoy className="h-5 w-5 text-gold" />
          <h3 className="ml-2 text-sm font-medium text-gray-200">Need Help?</h3>
        </div>
        <p className="mt-1 text-xs text-gray-400">
          Contact your dedicated advisor for assistance with any financial matters.
        </p>
        <Link
          to="/advisors"
          className="mt-2 block text-xs font-medium text-gold hover:text-gold-light"
        >
          Contact Advisor →
        </Link>
      </div>
    </div>
  );
}
