
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, User, LogOut } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);
  
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Solutions", href: "#solutions" },
    { name: "Advisors", href: "#advisors" },
    { name: "Loans", href: "/loans" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/">
            <div className="h-8 w-8 rounded-full bg-wealth-800"></div>
          </Link>
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
                  <Link
                    key={item.name}
                    to={item.href.startsWith('#') ? `/${item.href}` : item.href}
                    className="px-2 py-2 text-lg font-medium hover:text-wealth-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {user ? (
                  <>
                    <Link 
                      to="/profile" 
                      className="px-2 py-2 text-lg font-medium hover:text-wealth-700 transition-colors flex items-center gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <User size={18} /> My Profile
                    </Link>
                    <Button 
                      className="mt-2 flex items-center gap-2" 
                      variant="outline"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut size={18} /> Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-2 py-2 text-lg font-medium hover:text-wealth-700 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <Button className="mt-2 bg-wealth-800 hover:bg-wealth-900 w-full">Get Started</Button>
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <>
            <nav className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href.startsWith('#') ? `/${item.href}` : item.href}
                  className="hover-underline text-sm font-medium text-wealth-900 hover:text-wealth-700 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <User size={16} />
                      <span>{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/profile">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Link to="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-wealth-800 hover:bg-wealth-900">Get Started</Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}
