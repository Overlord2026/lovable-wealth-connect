
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  isLoading?: boolean;
  text?: string;
  type?: "submit" | "button";
  onClick?: () => void;
  variant?: "default" | "outline" | "ghost";
  disabled?: boolean;
  className?: string;
}

export function SubmitButton({ 
  isLoading = false, 
  text = "Submit", 
  type = "button", 
  onClick,
  variant = "default",
  disabled,
  className
}: SubmitButtonProps) {
  return (
    <Button 
      type={type}
      className={`${variant === "default" ? "bg-wealth-800 hover:bg-wealth-900" : ""} ${className || ""}`}
      variant={variant}
      disabled={disabled || isLoading} 
      onClick={onClick}
    >
      {isLoading ? (
        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
      ) : (
        text
      )}
    </Button>
  );
}
