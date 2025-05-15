
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { v4 as uuidv4 } from "uuid";
import { User } from "@supabase/supabase-js";

export interface Message {
  id: string;
  content: string;
  is_assistant: boolean;
  created_at: string;
}

export function useConversation(user: User | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
  
  async function createNewConversation() {
    try {
      const { data, error } = await supabase
        .from("chat_conversations")
        .insert({
          title: "New Conversation",
          user_id: user?.id
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
        user_id: user.id
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

  return {
    messages,
    setMessages,
    conversationId,
    isLoading,
    setIsLoading,
    saveMessage
  };
}
