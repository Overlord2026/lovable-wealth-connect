
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NetworkManager } from "@/components/network/NetworkManager";
import { useAuth } from "@/contexts/AuthContext";

const Network = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <div className="pt-24">
          <NetworkManager user={user} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Network;
