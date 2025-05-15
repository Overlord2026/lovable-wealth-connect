
import { useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ChatMessage } from "./ChatMessage";
import { LoadingIndicator } from "./LoadingIndicator";
import { ChatInput } from "./ChatInput";
import { useConversation } from "@/hooks/useConversation";
import { getAIResponse } from "@/services/aiService";

export function ChatInterface() {
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { 
    messages, 
    setMessages, 
    isLoading, 
    setIsLoading,
    saveMessage
  } = useConversation(user);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  async function handleSubmit(userMessage: string) {
    if (isLoading || !user) return;
    
    setIsLoading(true);
    
    // Add user message to UI immediately
    const tempUserMessage = {
      id: "temp-" + Date.now(),
      content: userMessage,
      is_assistant: false,
      created_at: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, tempUserMessage]);
    
    // Save user message to Supabase
    const savedUserMessage = await saveMessage(userMessage, false);
    
    if (savedUserMessage) {
      // Replace temporary message with saved one
      setMessages(prev => 
        prev.map(msg => msg.id === tempUserMessage.id ? savedUserMessage : msg)
      );
      
      // Get AI response
      const aiResponse = await getAIResponse(userMessage, messages);
      
      if (aiResponse) {
        // Save AI response to Supabase
        const savedAssistantMessage = await saveMessage(aiResponse, true);
        
        if (savedAssistantMessage) {
          setMessages(prev => [...prev, savedAssistantMessage]);
        }
      }
    }
    
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col h-[600px] border rounded-lg bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id}
            message={message}
          />
        ))}
        {isLoading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
