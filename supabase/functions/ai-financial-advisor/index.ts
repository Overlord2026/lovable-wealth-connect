
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openaiApiKey = Deno.env.get("OPENAI_API_KEY");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// System prompt with financial expertise context
const getSystemPrompt = (topic: string) => `You are a helpful financial advisor assistant specialized in ${topic}. 
Your goal is to provide accurate, helpful information about financial topics in a clear, concise manner, 
with a focus on ${topic.toLowerCase()}.

You can answer questions about investment strategies, retirement accounts (like Roth IRAs, 401ks), 
budgeting, saving strategies, tax considerations, and other personal finance topics, 
but you're especially knowledgeable about ${topic.toLowerCase()}.

Provide specific, actionable advice when appropriate, but make it clear that you're offering general 
information and not personalized financial advice. If you're unsure about something, acknowledge the 
limitations of your knowledge rather than providing potentially incorrect information.

Format your responses clearly using paragraphs, bullet points, or numbered lists when appropriate 
to make your information easier to understand.`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key is missing" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const { message, conversationHistory, topic = "General Advice" } = await req.json();
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Format conversation history for OpenAI API
    const messages = [
      { role: "system", content: getSystemPrompt(topic) },
    ];
    
    // Add conversation history if available
    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationHistory.forEach(msg => {
        messages.push({
          role: msg.is_assistant ? "assistant" : "user",
          content: msg.content
        });
      });
    }
    
    // Add the current message
    messages.push({ role: "user", content: message });
    
    // Make request to OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Using a cost-effective model with good capabilities
        messages: messages,
        temperature: 0.7,
        max_tokens: 800,
      })
    });
    
    const responseData = await response.json();
    
    if (responseData.error) {
      console.error("OpenAI API error:", responseData.error);
      return new Response(
        JSON.stringify({ error: "Error with AI service", details: responseData.error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const aiResponse = responseData.choices[0].message.content;
    
    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
