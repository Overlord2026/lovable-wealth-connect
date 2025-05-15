
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, Loader2, CheckCircle } from "lucide-react";
import { Provider } from '@supabase/supabase-js';

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export function LoginForm() {
  const { login, loginWithOAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<Provider | null>(null);
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await login(values.email, values.password);
      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      toast.error("Invalid email or password. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleOAuthLogin(provider: Provider) {
    setSocialLoading(provider);
    try {
      await loginWithOAuth(provider);
      // No success toast here as page will redirect
    } catch (error) {
      console.error(`${provider} login error:`, error);
    } finally {
      setSocialLoading(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <button 
          onClick={() => handleOAuthLogin('google')}
          disabled={socialLoading !== null}
          className="w-full flex items-center justify-center gap-2 py-2 bg-white text-black rounded-md border border-neutral-600 hover:bg-gray-100 transition-colors"
        >
          {socialLoading === 'google' ? (
            <Loader2 className="w-5 h-5 mr-1 animate-spin" />
          ) : (
            <img src="/icons/google.svg" className="w-5 h-5" alt="Google" />
          )}
          Continue with Google
          {socialLoading === 'google' && <CheckCircle className="w-5 h-5 text-green-500" />}
        </button>
        
        <button 
          onClick={() => handleOAuthLogin('azure')}
          disabled={socialLoading !== null}
          className="w-full flex items-center justify-center gap-2 py-2 bg-white text-black rounded-md border border-neutral-600 hover:bg-gray-100 transition-colors"
        >
          {socialLoading === 'azure' ? (
            <Loader2 className="w-5 h-5 mr-1 animate-spin" />
          ) : (
            <img src="/icons/microsoft.svg" className="w-5 h-5" alt="Microsoft" />
          )}
          Continue with Microsoft
          {socialLoading === 'azure' && <CheckCircle className="w-5 h-5 text-green-500" />}
        </button>
      </div>

      <div className="flex items-center my-4">
        <hr className="flex-grow border-neutral-600"/>
        <span className="px-2 text-xs text-neutral-500">OR CONTINUE WITH</span>
        <hr className="flex-grow border-neutral-600"/>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <Input 
                      type="email" 
                      placeholder="you@example.com" 
                      className="pl-10 py-6 rounded-md bg-neutral-800 border-neutral-600 focus:border-amber-400 focus:ring-2 focus:ring-amber-400" 
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel className="text-foreground">Password</FormLabel>
                  <Link to="/forgot-password" className="text-xs text-amber-400 hover:text-amber-300 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Lock className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-10 py-6 rounded-md bg-neutral-800 border-neutral-600 focus:border-amber-400 focus:ring-2 focus:ring-amber-400" 
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md h-auto" 
            disabled={isLoading}
          >
            {isLoading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
