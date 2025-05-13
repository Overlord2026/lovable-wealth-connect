
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div className="hero-gradient min-h-screen flex items-center text-white pt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Secure your financial future with <span className="text-turquoise-400">expert guidance</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 text-gray-100 max-w-2xl leading-relaxed">
            Connect with top financial advisors tailored to your needs. Build wealth, plan your retirement, and achieve your financial goals with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 py-6 rounded-md flex items-center gap-2 group">
              Find an Advisor
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/20 text-lg px-8 py-6 rounded-md">
              Learn More
            </Button>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-turquoise-400">500+</p>
                <p className="text-sm text-gray-200">Financial Advisors</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-turquoise-400">15k+</p>
                <p className="text-sm text-gray-200">Clients Served</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-turquoise-400">98%</p>
                <p className="text-sm text-gray-200">Client Satisfaction</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-turquoise-400">$2B+</p>
                <p className="text-sm text-gray-200">Assets Managed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
