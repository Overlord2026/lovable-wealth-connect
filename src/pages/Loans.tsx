
import { useState } from "react";
import { ChevronRight, Home, Briefcase, CreditCard, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LoanItemCard } from "@/components/LoanItemCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Mock loan types that would typically come from an API
const LOAN_OPTIONS = [
  {
    id: "mortgage",
    title: "Mortgage Loans",
    description: "Home purchase financing with competitive rates",
    icon: Home,
  },
  {
    id: "business",
    title: "Business Loans",
    description: "Capital for business growth and expansion",
    icon: Briefcase,
  },
  {
    id: "personal",
    title: "Personal Loans",
    description: "Flexible financing for your personal needs",
    icon: CreditCard,
  },
  {
    id: "investment",
    title: "Investment Property Loans",
    description: "Financing for income properties and investments",
    icon: DollarSign,
  },
];

export default function Loans() {
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null);

  const handleLoanSelect = (loanId: string) => {
    setSelectedLoan(loanId);
    // In a real app, this would navigate to a specific loan details page
    console.log(`Selected loan: ${loanId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-28 pb-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl animate-fade-in">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2 text-navy-800">Loan Solutions</h1>
          <p className="text-navy-600 mb-10">
            Explore our range of loan products designed to meet your financial needs
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
            {LOAN_OPTIONS.map((loan) => (
              <LoanItemCard
                key={loan.id}
                id={loan.id}
                title={loan.title}
                description={loan.description}
                icon={loan.icon}
                onClick={() => handleLoanSelect(loan.id)}
                rightIcon={
                  loan.id === "mortgage" ? (
                    <Badge className="bg-teal-100 text-teal-800 border-teal-300">
                      Popular
                    </Badge>
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )
                }
              />
            ))}
          </div>

          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold mb-6 text-navy-800">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="p-6 rounded-xl border border-gray-100 shadow-md bg-white">
                <div className="h-12 w-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mb-4 text-lg font-bold">
                  1
                </div>
                <h3 className="font-medium text-lg mb-2 text-navy-800">Select a Loan Type</h3>
                <p className="text-navy-600">
                  Choose the loan type that best fits your financial goals and needs
                </p>
              </div>
              
              <div className="p-6 rounded-xl border border-gray-100 shadow-md bg-white">
                <div className="h-12 w-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mb-4 text-lg font-bold">
                  2
                </div>
                <h3 className="font-medium text-lg mb-2 text-navy-800">Complete Application</h3>
                <p className="text-navy-600">
                  Fill out your information and submit required documents securely
                </p>
              </div>
              
              <div className="p-6 rounded-xl border border-gray-100 shadow-md bg-white">
                <div className="h-12 w-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mb-4 text-lg font-bold">
                  3
                </div>
                <h3 className="font-medium text-lg mb-2 text-navy-800">Get Approved</h3>
                <p className="text-navy-600">
                  Work with an advisor to finalize your loan terms and options
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
