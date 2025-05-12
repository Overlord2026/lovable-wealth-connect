
import { useState } from "react";
import { ChevronRight, Home, Briefcase, CreditCard, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LoanItemCard } from "@/components/LoanItemCard";

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
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Loan Options</h1>
      <p className="text-muted-foreground mb-8">
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
                <Badge variant="outline" className="bg-gold-100 text-gold-800 border-gold-300">
                  Popular
                </Badge>
              ) : (
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              )
            }
          />
        ))}
      </div>

      <div className="mt-12">
        <h2 className="font-serif text-2xl font-bold mb-4">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="p-6 rounded-lg border bg-card">
            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              1
            </div>
            <h3 className="font-medium text-lg mb-2">Select a Loan Type</h3>
            <p className="text-muted-foreground">
              Choose the loan type that best fits your financial goals
            </p>
          </div>
          
          <div className="p-6 rounded-lg border bg-card">
            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              2
            </div>
            <h3 className="font-medium text-lg mb-2">Complete Application</h3>
            <p className="text-muted-foreground">
              Fill out your information and submit required documents
            </p>
          </div>
          
          <div className="p-6 rounded-lg border bg-card">
            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              3
            </div>
            <h3 className="font-medium text-lg mb-2">Get Approved</h3>
            <p className="text-muted-foreground">
              Work with an advisor to finalize your loan terms
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
