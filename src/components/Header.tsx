
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
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Solutions", href: "#solutions" },
    { name: "Advisors", href: "#advisors" },
    { name: "Loans", href: "/loans" },
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

  return (
    <header className={`fixed w-full z-5 transition-all duration-300 ${
      isScrolled ? 'bg-[#1B1E2E]/90 backdrop-blur-md shadow-md' : 'bg-[#1B1E2E]'
    }`}>
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/">
            <div className="h-10 w-10 rounded-full bg-navy-700 flex items-center justify-center">
              <span className="text-white font-serif font-bold text-lg">W</span>
            </div>
          </Link>
          <span className="font-serif text-xl font-semibold text-neutral-300">Wealth<span className="text-[#00B8BF]">Connect</span></span>
        </div>
        
        {isMobile ? (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-neutral-300">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="py-6 border-b">
                  <span className="font-serif text-xl font-semibold text-neutral-300">Wealth<span className="text-[#00B8BF]">Connect</span></span>
                </div>
                <nav className="flex flex-col gap-4 mt-8 flex-grow">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href.startsWith('#') ? `/${item.href}` : item.href}
                      className="px-2 py-3 text-lg font-medium text-neutral-300 hover:text-[#00B8BF] transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="py-6 border-t mt-auto">
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 px-2">
                        <div className="h-10 w-10 rounded-full bg-navy-100 flex items-center justify-center text-neutral-300">
                          <User size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-neutral-300">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Link to="/profile" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full justify-start">
                            My Profile
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start text-destructive hover:text-destructive"
                          onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-3">
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full">Sign In</Button>
                      </Link>
                      <Link to="/register" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-[#00B8BF] hover:bg-[#00B8BF]/90 text-white">Get Started</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
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
                    <Button variant="ghost" className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-navy-100 flex items-center justify-center text-neutral-300">
                        <User size={16} />
                      </div>
                      <span className="font-medium text-neutral-300">{user.name}</span>
                      <ChevronDown className="h-4 w-4 text-neutral-300" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-2 text-sm text-muted-foreground">
                      <p>{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="text-destructive focus:text-destructive"
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
                  <Button variant="ghost" className="text-neutral-300">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-[#00B8BF] text-white hover:bg-[#00B8BF]/90">Get Started</Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}
