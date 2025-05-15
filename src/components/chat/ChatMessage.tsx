
import { Avatar } from "@/components/ui/avatar";
import { User, Bot } from "lucide-react";

interface Message {
  id: string;
  content: string;
  is_assistant: boolean;
  created_at: string;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAi = message.is_assistant;
  
  // Format message content with line breaks
  const formattedContent = message.content
    .split('\n')
    .map((line, i) => <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>);
  
  return (
    <div className={`flex gap-3 ${isAi ? "" : "flex-row-reverse"}`}>
      <div className="flex-shrink-0">
        <Avatar className={`h-8 w-8 ${isAi ? "bg-blue-100" : "bg-green-100"}`}>
          {isAi ? (
            <Bot className="h-5 w-5 text-blue-600" />
          ) : (
            <User className="h-5 w-5 text-green-600" />
          )}
        </Avatar>
      </div>
      
      <div 
        className={`p-3 rounded-lg max-w-[80%] ${
          isAi 
            ? "bg-white border shadow-sm" 
            : "bg-green-50 text-right"
        }`}
      >
        <div className={`text-sm ${isAi ? "text-gray-800" : "text-green-800"}`}>
          {formattedContent}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {new Date(message.created_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
}
