
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
                      className="pl-10 py-6 rounded-md bg-secondary/50 border-border focus:border-accent focus-visible:ring-accent" 
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
                <FormLabel className="text-foreground">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-10 py-6 rounded-md bg-secondary/50 border-border focus:border-accent focus-visible:ring-accent" 
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-accent hover:text-accent/90 hover:underline">
              Forgot your password?
            </Link>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-accent hover:bg-accent/90 text-white py-6 rounded-md font-medium transition-colors hover:shadow-lg hover-glow" 
            disabled={isLoading}
          >
            {isLoading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-neutral-800 px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

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
    </div>
  );
}
