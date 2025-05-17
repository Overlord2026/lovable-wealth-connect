
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "@/components/ui/sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please sign in to access this page");
      // Store the current path for redirection after login
      const returnUrl = location.pathname + location.search;
      sessionStorage.setItem("returnTo", returnUrl);
      navigate('/login');
    }
  }, [user, loading, navigate, location]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wealth-800"></div>
      </div>
    );
  }

  return user ? <>{children}</> : null;
};
