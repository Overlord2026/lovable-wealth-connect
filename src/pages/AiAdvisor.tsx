
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default function AiAdvisor() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-6">
              <DashboardSidebar />
              
              <div className="flex-1">
                <div className="bg-white rounded-lg shadow p-6">
                  <h1 className="text-2xl font-semibold mb-6">AI Financial Advisor</h1>
                  <p className="text-gray-600 mb-6">
                    Ask any financial questions and get instant advice from our AI advisor.
                    Try questions about investments, retirement accounts, budgeting, and more.
                  </p>
                  <ChatInterface />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
