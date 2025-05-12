
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="hero-gradient min-h-[85vh] flex items-center text-white pt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Connecting Families with <span className="text-gold-400">Expert Financial Advisors</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-2xl">
            Find the perfect financial advisor to help secure your family's future and achieve your wealth management goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-gold-500 hover:bg-gold-600 text-wealth-950 text-lg px-8 py-6">
              Find an Advisor
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/20 text-lg px-8 py-6">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
