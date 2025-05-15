
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
import { Mail, Lock, Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export function LoginForm() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <div className="p-6">
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
      
      <div className="mt-6 text-center text-sm">
        <p className="text-muted-foreground">
          Don't have an account? <Link to="/register" className="text-accent hover:text-accent/90 font-medium hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
