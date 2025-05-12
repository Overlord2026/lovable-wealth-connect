
import { Button } from "@/components/ui/button";

export function Footer() {
  const navigation = {
    solutions: [
      { name: "Financial Planning", href: "#" },
      { name: "Investment Management", href: "#" },
      { name: "Retirement Planning", href: "#" },
      { name: "Estate Planning", href: "#" },
    ],
    support: [
      { name: "FAQ", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Resources", href: "#" },
    ],
    company: [
      { name: "About", href: "#" },
      { name: "Team", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
    ],
    legal: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Licenses", href: "#" },
    ],
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-wealth-950 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-white"></div>
              <span className="font-serif text-xl font-semibold">Wealth<span className="text-gold-500">Connect</span></span>
            </div>
            <p className="text-gray-400 mb-6">
              Connecting families with expert financial advisors to achieve their wealth management goals.
            </p>
            <div className="space-y-3">
              <Button variant="outline" className="w-full border-gray-700 hover:bg-wealth-900 text-white">
                Advisor Login
              </Button>
              <Button className="w-full bg-gold-500 hover:bg-gold-600 text-wealth-950">
                Find an Advisor
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
              Solutions
            </h3>
            <ul className="space-y-3">
              {navigation.solutions.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">
              Subscribe to our newsletter
            </h3>
            <p className="text-gray-400 mb-4">
              Get the latest updates and resources delivered to your inbox.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded bg-wealth-900 border border-wealth-800 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
              <Button type="submit" className="bg-gold-500 hover:bg-gold-600 text-wealth-950">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-wealth-900 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} WealthConnect. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            {navigation.legal.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-400 hover:text-white text-sm">
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
