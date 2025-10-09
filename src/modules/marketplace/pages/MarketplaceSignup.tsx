import { useState } from "react";
import { Link } from "react-router-dom";
import { MarketplaceLayout } from "../components/layout/MarketplaceLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  Users, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react";

type UserType = "professional" | "client" | null;

const professionalBenefits = [
  "Access to high-net-worth clients",
  "Verified professional badge",
  "Lead generation tools",
  "Compliance support",
  "Network with peers",
  "Marketing resources",
];

const clientBenefits = [
  "AI-powered advisor matching",
  "Verified professionals only",
  "Transparent fee structures",
  "Secure communication",
  "Multi-advisor comparison",
  "Personalized recommendations",
];

export function MarketplaceSignup() {
  const [selectedType, setSelectedType] = useState<UserType>(null);

  return (
    <MarketplaceLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-wealth-100 md:text-5xl">
            Join Our Marketplace
          </h1>
          <p className="text-lg text-wealth-300">
            Choose your account type to get started
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {/* Professional Card */}
          <Card 
            className={`cursor-pointer border-2 transition-all hover:border-wealth-600 ${
              selectedType === "professional" 
                ? "border-wealth-600 bg-wealth-900/30" 
                : "border-wealth-800/20 bg-wealth-950/30"
            }`}
            onClick={() => setSelectedType("professional")}
          >
            <CardHeader>
              <div className="mb-4 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-wealth-800/30">
                  <Briefcase className="h-8 w-8 text-wealth-400" />
                </div>
              </div>
              <CardTitle className="text-center text-2xl text-wealth-100">
                I'm a Professional
              </CardTitle>
              <CardDescription className="text-center text-wealth-300">
                Financial advisors, wealth managers, and consultants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="mb-6 space-y-3">
                {professionalBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start">
                    <CheckCircle2 className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-wealth-500" />
                    <span className="text-sm text-wealth-300">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full bg-wealth-700 hover:bg-wealth-800" 
                asChild
                disabled={selectedType !== "professional"}
              >
                <Link to="/marketplace/register/professional">
                  Register as Professional
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Client Card */}
          <Card 
            className={`cursor-pointer border-2 transition-all hover:border-wealth-600 ${
              selectedType === "client" 
                ? "border-wealth-600 bg-wealth-900/30" 
                : "border-wealth-800/20 bg-wealth-950/30"
            }`}
            onClick={() => setSelectedType("client")}
          >
            <CardHeader>
              <div className="mb-4 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-wealth-800/30">
                  <Users className="h-8 w-8 text-wealth-400" />
                </div>
              </div>
              <CardTitle className="text-center text-2xl text-wealth-100">
                I'm a Client
              </CardTitle>
              <CardDescription className="text-center text-wealth-300">
                Family offices and high-net-worth individuals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="mb-6 space-y-3">
                {clientBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start">
                    <CheckCircle2 className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-wealth-500" />
                    <span className="text-sm text-wealth-300">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full bg-wealth-700 hover:bg-wealth-800" 
                asChild
                disabled={selectedType !== "client"}
              >
                <Link to="/marketplace/register/client">
                  Register as Client
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-wealth-400">
            Already have an account?{" "}
            <Link to="/login" className="text-wealth-300 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Info Section */}
        <div className="mx-auto mt-16 max-w-3xl rounded-lg border border-wealth-800/20 bg-wealth-950/30 p-8">
          <h2 className="mb-4 text-center text-2xl font-semibold text-wealth-100">
            Why Join Our Marketplace?
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-wealth-400">2,500+</div>
              <div className="text-sm text-wealth-300">Verified Professionals</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-wealth-400">10,000+</div>
              <div className="text-sm text-wealth-300">Active Clients</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-wealth-400">$50B+</div>
              <div className="text-sm text-wealth-300">Assets Under Advisory</div>
            </div>
          </div>
        </div>
      </div>
    </MarketplaceLayout>
  );
}
