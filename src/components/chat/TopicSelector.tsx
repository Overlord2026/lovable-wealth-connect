
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export type FinancialTopic = 
  | "General Advice"
  | "Retirement Planning"
  | "Investment Strategies"
  | "Debt Management"
  | "Budgeting"
  | "Tax Planning";

interface TopicSelectorProps {
  selectedTopic: FinancialTopic;
  onSelectTopic: (topic: FinancialTopic) => void;
  disabled?: boolean;
}

const topics: FinancialTopic[] = [
  "General Advice",
  "Retirement Planning",
  "Investment Strategies",
  "Debt Management",
  "Budgeting",
  "Tax Planning"
];

export function TopicSelector({ selectedTopic, onSelectTopic, disabled }: TopicSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          disabled={disabled}
          className="flex items-center gap-2"
        >
          {selectedTopic}
          <ChevronDown className="h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {topics.map((topic) => (
          <DropdownMenuItem 
            key={topic}
            onClick={() => onSelectTopic(topic)}
            className="cursor-pointer"
          >
            {topic}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
