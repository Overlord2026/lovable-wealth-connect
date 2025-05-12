
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export function Header() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Solutions", href: "#solutions" },
    { name: "Advisors", href: "#advisors" },
    { name: "Loans", href: "/loans" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-wealth-800"></div>
          <span className="font-serif text-xl font-semibold text-wealth-950">Wealth<span className="text-gold-500">Connect</span></span>
        </div>
        
        {isMobile ? (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="px-2 py-2 text-lg font-medium hover:text-wealth-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <Button className="mt-4 bg-wealth-800 hover:bg-wealth-900">Get Started</Button>
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <>
            <nav className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="hover-underline text-sm font-medium text-wealth-900 hover:text-wealth-700 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>
            <Button className="hidden md:inline-flex bg-wealth-800 hover:bg-wealth-900">Get Started</Button>
          </>
        )}
      </div>
    </header>
  );
}
