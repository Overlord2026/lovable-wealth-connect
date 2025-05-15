
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { Send, Loader2 } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { v4 as uuidv4 } from "uuid";

interface Message {
  id: string;
  content: string;
  is_assistant: boolean;
  created_at: string;
}

export function ChatInterface() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Create a new conversation if needed
  useEffect(() => {
    if (user && !conversationId) {
      createNewConversation();
    }
  }, [user]);
  
  // Load previous messages if conversation exists
  useEffect(() => {
    if (conversationId) {
      loadMessages();
    }
  }, [conversationId]);
  
  async function createNewConversation() {
    try {
      const { data, error } = await supabase
        .from("chat_conversations")
        .insert({
          title: "New Conversation",
          user_id: user?.id // Add user_id here
        })
        .select("id")
        .single();
        
      if (error) throw error;
      
      setConversationId(data.id);
    } catch (error) {
      console.error("Error creating conversation:", error);
      toast.error("Failed to initialize chat");
    }
  }
  
  async function loadMessages() {
    if (!conversationId) return;
    
    try {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });
        
      if (error) throw error;
      
      if (data) {
        setMessages(data);
      }
    } catch (error) {
      console.error("Error loading messages:", error);
      toast.error("Failed to load message history");
    }
  }
  
  async function saveMessage(content: string, isAssistant: boolean) {
    if (!conversationId || !user) return null;
    
    try {
      const newMessage = {
        id: uuidv4(),
        conversation_id: conversationId,
        content,
        is_assistant: isAssistant,
        created_at: new Date().toISOString(),
        user_id: user.id // Add user_id here
      };
      
      const { error } = await supabase
        .from("chat_messages")
        .insert([newMessage]);
        
      if (error) throw error;
      
      return newMessage;
    } catch (error) {
      console.error("Error saving message:", error);
      toast.error("Failed to save message");
      return null;
    }
  }
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!input.trim() || isLoading || !user) return;
    
    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);
    
    // Add user message to UI immediately
    const tempUserMessage: Message = {
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
      
      try {
        // Call Supabase Edge Function
        const { data, error } = await supabase.functions.invoke('ai-financial-advisor', {
          body: {
            message: userMessage,
            conversationHistory: messages,
          },
        });
        
        if (error) throw error;
        
        if (data && data.response) {
          // Save AI response to Supabase
          const savedAssistantMessage = await saveMessage(data.response, true);
          
          if (savedAssistantMessage) {
            setMessages(prev => [...prev, savedAssistantMessage]);
          }
        } else {
          throw new Error("Invalid response from AI service");
        }
      } catch (error) {
        console.error("Error getting AI response:", error);
        toast.error("Failed to get a response from the AI advisor");
      }
    }
    
    setIsLoading(false);
  }
  
  // Add a welcome message if no messages exist
  useEffect(() => {
    if (messages.length === 0 && conversationId && !isLoading) {
      const welcomeMessage = {
        id: "welcome-" + Date.now(),
        content: "Hello! I'm your AI financial advisor. How can I assist you today? You can ask me about topics like retirement accounts, investment strategies, or budgeting tips.",
        is_assistant: true,
        created_at: new Date().toISOString(),
      };
      
      saveMessage(welcomeMessage.content, true).then(savedMessage => {
        if (savedMessage) {
          setMessages([savedMessage]);
        }
      });
    }
  }, [conversationId, messages.length, isLoading]);

  return (
    <div className="flex flex-col h-[600px] border rounded-lg bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id}
            message={message}
          />
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 p-3 rounded-lg bg-blue-50 max-w-[80%] ml-auto">
            <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
            <p className="text-sm text-blue-700">Thinking...</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
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
    </div>
  );
}
