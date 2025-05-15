
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Thank you for your message. We'll be in touch soon!");
      
      // Reset form - in a real app, you'd use a form library like react-hook-form
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 1500);
  };
  
  return (
    <div id="contact" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-[#0F172A]">
              Ready to <span className="text-[#00B8BF]">Get Started?</span>
            </h2>
            <p className="text-lg text-[#374151] mb-6">
              Fill out the form, and we'll connect you with a financial advisor who matches your needs and goals.
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 mb-8">
              <h3 className="text-xl font-bold mb-4 text-[#0F172A]">What happens next?</h3>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-[#00B8BF]/10 text-[#00B8BF] flex items-center justify-center text-sm font-medium">1</span>
                  <p className="text-[#374151]">We'll review your information and needs</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-[#00B8BF]/10 text-[#00B8BF] flex items-center justify-center text-sm font-medium">2</span>
                  <p className="text-[#374151]">Our team will match you with suitable advisors</p>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-[#00B8BF]/10 text-[#00B8BF] flex items-center justify-center text-sm font-medium">3</span>
                  <p className="text-[#374151]">Schedule a free consultation with your matches</p>
                </li>
              </ol>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-xl">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="investmentAmount">Investment Amount</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select amount" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under100k">Under $100,000</SelectItem>
                      <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                      <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                      <SelectItem value="500k-1m">$500,000 - $1 million</SelectItem>
                      <SelectItem value="over1m">Over $1 million</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="goals">Financial Goals</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retirement">Retirement Planning</SelectItem>
                      <SelectItem value="wealth">Wealth Accumulation</SelectItem>
                      <SelectItem value="estate">Estate Planning</SelectItem>
                      <SelectItem value="tax">Tax Optimization</SelectItem>
                      <SelectItem value="education">Education Funding</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Additional Information</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us more about your financial situation and goals..."
                    rows={4}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#00B8BF] hover:bg-[#00B8BF]/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Connect With an Advisor"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
