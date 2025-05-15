
import { 
  Briefcase, 
  Users, 
  Wallet,
  Shield
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function FeatureSection() {
  const features = [
    {
      name: "Vetted Professionals",
      description: "Our platform features only the most qualified financial advisors, each thoroughly vetted to ensure they meet the highest standards of expertise and integrity.",
      icon: Briefcase,
      color: "bg-teal-50 text-teal-600",
    },
    {
      name: "Personalized Matching",
      description: "Our sophisticated algorithm connects you with advisors who specialize in your specific financial needs, ensuring a perfect match for your goals.",
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      name: "Fee Transparency",
      description: "Full transparency on advisor fees and commission structures ensures you know exactly what you're paying for with no hidden costs.",
      icon: Wallet,
      color: "bg-amber-50 text-amber-600",
    },
    {
      name: "Secure & Private",
      description: "Your financial data and personal information are protected with enterprise-grade security protocols and strict privacy policies.",
      icon: Shield,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div id="solutions" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-[#0F172A]">
            Wealth Management <span className="text-[#00B8BF]">Simplified</span>
          </h2>
          <p className="text-lg text-[#374151] max-w-2xl mx-auto">
            We've built a platform that makes finding the right financial advisor simple, transparent, and tailored to your unique financial journey.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.name} 
              className="border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden bg-white rounded-xl"
            >
              <CardContent className="p-8">
                <div className={`h-12 w-12 rounded-xl ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#0F172A]">
                  {feature.name}
                </h3>
                <p className="text-[#374151]">
                  {feature.description}
                </p>
              </CardContent>
              <div className="h-1 bg-gradient-to-r from-teal-500 to-blue-500 transform translate-y-px"></div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
