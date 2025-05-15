
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body
    const requestData = await req.json();
    
    // Extract user information and payment details
    const { userId, amount = 100 } = requestData;
    
    if (!userId) {
      throw new Error("User ID is required");
    }

    // Create a mock payment response
    const mockPaymentResponse = {
      id: crypto.randomUUID(),
      amount: amount,
      currency: "USD",
      status: "succeeded",
      created: Date.now(),
      payment_method: "mock_card",
      description: "Advisor Fee Payment",
      transaction_id: crypto.randomUUID()
    };

    // Connect to Supabase to store the transaction
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Insert the transaction into the database
    const { data, error } = await supabase
      .from("transactions")
      .insert({
        user_id: userId,
        amount: -amount, // Negative amount because it's an expense/payment
        transaction_date: new Date().toISOString().split("T")[0],
        category: "advisor_fee",
        description: "Advisor Fee Payment",
        metadata: { 
          payment_id: mockPaymentResponse.id,
          payment_status: mockPaymentResponse.status
        }
      })
      .select()
      .single();
      
    if (error) {
      throw error;
    }

    // Return the mock payment response with transaction data
    return new Response(
      JSON.stringify({ 
        success: true, 
        payment: mockPaymentResponse,
        transaction: data 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error) {
    // Return error response
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400 
      }
    );
  }
});
