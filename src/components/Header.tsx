
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, User, LogOut, ChevronDown } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Solutions", href: "#solutions" },
    { name: "Advisors", href: "/advisors" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  // The header no longer needs its own mobile menu as it's consolidated in MobileNav
  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#1B1E2E]/90 backdrop-blur-md shadow-md' : 'bg-[#1B1E2E] shadow-sm'
    }`}>
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center">
          <Link to="/">
            <div className="flex items-center">
              <span className="text-xl font-serif font-bold text-white">Family Office <span className="text-gold">Marketplace</span></span>
            </div>
          </Link>
        </div>
        
        {isMobile ? (
          // Mobile view - only show logo, leave navigation to MobileNav component
          <div className="w-6"></div> {/* Spacer for layout balance */}
        ) : (
          <>
            <nav className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href.startsWith('#') ? `/${item.href}` : item.href}
                  className="hover-underline text-sm font-medium text-neutral-300 hover:text-[#00B8BF] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 text-neutral-300 hover:text-white hover:bg-[#25293F]">
                      <div className="h-8 w-8 rounded-full bg-navy-800 flex items-center justify-center text-neutral-300">
                        <User size={16} />
                      </div>
                      <span className="font-medium text-neutral-300">{user.name}</span>
                      <ChevronDown className="h-4 w-4 text-neutral-300" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-[#25293F] border-border text-neutral-300">
                    <div className="px-2 py-2 text-sm text-muted-foreground">
                      <p>{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer hover:text-white">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer hover:text-white">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="text-red-400 focus:text-red-300 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Link to="/login">
                  <Button variant="ghost" className="text-neutral-300 hover:text-white hover:bg-[#25293F]">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gold text-navy-900 hover:bg-gold-dark font-medium">Get Started</Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}
