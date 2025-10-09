import { useState } from "react";
import { MarketplaceLayout } from "../components/layout/MarketplaceLayout";
import { AdvisorGrid } from "../components/advisors/AdvisorGrid";
import { AdvisorFilters } from "../components/advisors/AdvisorFilters";
import { AdvisorSearch } from "../components/advisors/AdvisorSearch";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export interface AdvisorFiltersState {
  search: string;
  specialties: string[];
  regions: string[];
  minExperience: number;
  verifiedOnly: boolean;
  availableNow: boolean;
}

export function AdvisorDirectory() {
  const [filters, setFilters] = useState<AdvisorFiltersState>({
    search: "",
    specialties: [],
    regions: [],
    minExperience: 0,
    verifiedOnly: true,
    availableNow: false,
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const updateFilters = (updates: Partial<AdvisorFiltersState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  return (
    <MarketplaceLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-wealth-100 md:text-4xl">
            Advisor Directory
          </h1>
          <p className="text-lg text-wealth-300">
            Find verified financial professionals who match your needs
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <AdvisorSearch
            value={filters.search}
            onChange={(search) => updateFilters({ search })}
          />
        </div>

        {/* Mobile Filters Button */}
        <div className="mb-6 lg:hidden">
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filter Advisors</SheetTitle>
                <SheetDescription>
                  Refine your search to find the perfect match
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <AdvisorFilters filters={filters} onFilterChange={updateFilters} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-lg border border-wealth-800/20 bg-wealth-950/30 p-6">
              <h2 className="mb-4 text-lg font-semibold text-wealth-100">Filters</h2>
              <AdvisorFilters filters={filters} onFilterChange={updateFilters} />
            </div>
          </aside>

          {/* Advisor Grid */}
          <div className="lg:col-span-3">
            <AdvisorGrid filters={filters} />
          </div>
        </div>
      </div>
    </MarketplaceLayout>
  );
}