
import { 
  Briefcase, 
  Users, 
  Wallet 
} from "lucide-react";

export function FeatureSection() {
  const features = [
    {
      name: "Vetted Professionals",
      description: "Our advisors undergo a rigorous screening process to ensure they meet our high standards of expertise and client service.",
      icon: Briefcase,
    },
    {
      name: "Tailored Matches",
      description: "We match you with advisors who specialize in your specific financial needs and goals.",
      icon: Users,
    },
    {
      name: "Transparent Pricing",
      description: "Understand exactly what you're paying for with our clear fee structure and no hidden costs.",
      icon: Wallet,
    },
  ];

  return (
    <div id="solutions" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-wealth-950">
            Why Choose <span className="text-wealth-700">WealthConnect</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We've built a platform that makes finding the right financial advisor simple, transparent, and tailored to your needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.name} 
              className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-full bg-wealth-100 flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-wealth-800" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-wealth-900">
                {feature.name}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
