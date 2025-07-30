
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Budget from "./pages/Budget";
import AiAdvisor from "./pages/AiAdvisor";
import Profile from "./pages/Profile";
import Loans from "./pages/Loans";
import Payments from "./pages/Payments";
import { VerificationPending, Advisors, Network } from "@/modules/marketplace/pages";
import NotFound from "./pages/NotFound";
import Education from "./pages/Education";
import ContentDetail from "./pages/ContentDetail";
import LuxuryTravel from "./pages/LuxuryTravel";
import Panorama from "./pages/Panorama";
import PanoramaAnalyze from "./pages/PanoramaAnalyze";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/advisors" element={<Advisors />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/panorama"
          element={
            <ProtectedRoute>
              <Panorama />
            </ProtectedRoute>
          }
        />
        <Route
          path="/panorama/analyze/:viewId"
          element={
            <ProtectedRoute>
              <PanoramaAnalyze />
            </ProtectedRoute>
          }
        />
        <Route
          path="/budget"
          element={
            <ProtectedRoute>
              <Budget />
            </ProtectedRoute>
          }
        />
        <Route
          path="/education"
          element={
            <ProtectedRoute>
              <Education />
            </ProtectedRoute>
          }
        />
        <Route
          path="/education/:slug"
          element={
            <ProtectedRoute>
              <ContentDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/luxury-travel"
          element={
            <ProtectedRoute>
              <LuxuryTravel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-advisor"
          element={
            <ProtectedRoute>
              <AiAdvisor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loans"
          element={
            <ProtectedRoute>
              <Loans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/network"
          element={
            <ProtectedRoute>
              <Network />
            </ProtectedRoute>
          }
        />
        <Route path="/verification-pending" element={<VerificationPending />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
