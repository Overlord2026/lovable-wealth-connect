
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    onSubmit(input.trim());
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-white flex items-end gap-2">
      <div className="flex-1">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something about personal finance..."
          className="min-h-[80px] resize-none"
          disabled={isLoading}
        />
      </div>
      <Button 
        type="submit" 
        disabled={!input.trim() || isLoading}
        className="h-10"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        <span className="ml-2">Send</span>
      </Button>
    </form>
  );
}
