import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Shield, 
  TrendingUp, 
  Award,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { MarketplaceLayout } from "../components/layout/MarketplaceLayout";

const stats = [
  { label: "Verified Professionals", value: "2,500+", icon: Shield },
  { label: "Active Clients", value: "10,000+", icon: Users },
  { label: "Assets Under Advisory", value: "$50B+", icon: TrendingUp },
  { label: "Success Rate", value: "98%", icon: Award },
];

const features = [
  {
    title: "Verified Professionals",
    description: "All advisors undergo rigorous verification and compliance checks",
    icon: Shield,
  },
  {
    title: "AI-Powered Matching",
    description: "Our algorithm finds the perfect advisor match for your unique needs",
    icon: TrendingUp,
  },
  {
    title: "Secure Platform",
    description: "Enterprise-grade security and data protection for peace of mind",
    icon: CheckCircle2,
  },
  {
    title: "Global Network",
    description: "Access top-tier financial professionals across multiple jurisdictions",
    icon: Users,
  },
];

const professionalTypes = [
  "Wealth Advisors",
  "Tax Strategists",
  "Estate Planners",
  "Investment Managers",
  "Legal Counsel",
  "Risk Advisors",
];

export function MarketplaceHome() {
  return (
    <MarketplaceLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-wealth-900/20 via-transparent to-wealth-800/10" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-wealth-100 sm:text-5xl md:text-6xl">
              Connect with Elite
              <span className="block bg-gradient-to-r from-wealth-400 to-wealth-600 bg-clip-text text-transparent">
                Financial Professionals
              </span>
            </h1>
            <p className="mb-8 text-lg text-wealth-300 md:text-xl">
              The premier marketplace for family offices, high-net-worth individuals, and
              verified financial advisors. Build your network, grow your practice, protect your legacy.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="bg-wealth-700 hover:bg-wealth-800">
                <Link to="/marketplace/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/marketplace/advisors">Browse Advisors</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-wealth-800/20 bg-wealth-950/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="mb-2 flex justify-center">
                    <Icon className="h-8 w-8 text-wealth-500" />
                  </div>
                  <div className="text-3xl font-bold text-wealth-100">{stat.value}</div>
                  <div className="text-sm text-wealth-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-wealth-100 md:text-4xl">
              Why Choose Our Marketplace
            </h2>
            <p className="text-lg text-wealth-300">
              Trust, transparency, and expertise at every step
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="border-wealth-800/20 bg-wealth-950/30">
                  <CardHeader>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-wealth-800/30">
                      <Icon className="h-6 w-6 text-wealth-400" />
                    </div>
                    <CardTitle className="text-wealth-100">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-wealth-400">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Professional Types Section */}
      <section className="border-y border-wealth-800/20 bg-wealth-950/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-wealth-100 md:text-4xl">
              Find Your Perfect Match
            </h2>
            <p className="text-lg text-wealth-300">
              Connect with specialists across all wealth management disciplines
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {professionalTypes.map((type) => (
              <div
                key={type}
                className="rounded-lg border border-wealth-800/20 bg-wealth-900/20 p-6 text-center transition-colors hover:border-wealth-700/40 hover:bg-wealth-900/40"
              >
                <p className="font-medium text-wealth-200">{type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl border border-wealth-800/20 bg-gradient-to-br from-wealth-900/40 to-wealth-950/40 p-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-wealth-100 md:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-lg text-wealth-300">
              Join thousands of professionals and clients building their financial future
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="bg-wealth-700 hover:bg-wealth-800">
                <Link to="/marketplace/register/professional">
                  Join as Professional
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/marketplace/register/client">
                  Find an Advisor
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MarketplaceLayout>
  );
}
