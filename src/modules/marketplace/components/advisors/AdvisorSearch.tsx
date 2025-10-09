import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AdvisorSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function AdvisorSearch({ 
  value, 
  onChange, 
  placeholder = "Search advisors by name, specialty, or location..." 
}: AdvisorSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-wealth-500" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-10 bg-wealth-950/30 border-wealth-800/20 text-wealth-100 placeholder:text-wealth-500"
      />
    </div>
  );
}