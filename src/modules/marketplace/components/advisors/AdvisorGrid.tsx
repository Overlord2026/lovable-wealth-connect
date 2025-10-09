import { AdvisorCard } from "./AdvisorCard";
import { AdvisorFiltersState } from "../../pages/AdvisorDirectory";
import { Advisor } from "../../types/advisor";

interface AdvisorGridProps {
  filters: AdvisorFiltersState;
}

// Mock data - replace with actual API call
const mockAdvisors: Advisor[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Wealth Management Advisor",
    firm: "Johnson Wealth Group",
    specialties: ["Wealth Management", "Estate Planning"],
    region: "North America",
    experience: 15,
    yearsExperience: 15,
    verified: true,
    isVerified: true,
    rating: 4.9,
    reviewCount: 127,
    imageUrl: "/placeholder.svg",
    bio: "Specialized in comprehensive wealth management for ultra-high-net-worth families.",
    availableNow: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Tax Strategy Specialist",
    firm: "Chen & Associates",
    specialties: ["Tax Planning", "Investment Advisory"],
    region: "Asia Pacific",
    experience: 12,
    yearsExperience: 12,
    verified: true,
    isVerified: true,
    rating: 4.8,
    reviewCount: 89,
    imageUrl: "/placeholder.svg",
    bio: "Expert in international tax optimization and cross-border wealth structuring.",
    availableNow: false,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    title: "Estate Planning Counsel",
    firm: "Rodriguez Legal Advisory",
    specialties: ["Estate Planning", "Risk Management"],
    region: "Europe",
    experience: 20,
    yearsExperience: 20,
    verified: true,
    isVerified: true,
    rating: 5.0,
    reviewCount: 156,
    imageUrl: "/placeholder.svg",
    bio: "Over 20 years helping families preserve and transfer generational wealth.",
    availableNow: true,
  },
];

export function AdvisorGrid({ filters }: AdvisorGridProps) {
  // Filter advisors based on current filters
  const filteredAdvisors = mockAdvisors.filter((advisor) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        advisor.name.toLowerCase().includes(searchLower) ||
        advisor.title.toLowerCase().includes(searchLower) ||
        advisor.firm.toLowerCase().includes(searchLower) ||
        advisor.specialties.some((s) => s.toLowerCase().includes(searchLower));
      
      if (!matchesSearch) return false;
    }

    // Verified filter
    if (filters.verifiedOnly && !advisor.isVerified) return false;

    // Available filter
    if (filters.availableNow && !advisor.availableNow) return false;

    // Specialties filter
    if (filters.specialties.length > 0) {
      const hasSpecialty = filters.specialties.some((specialty) =>
        advisor.specialties.includes(specialty)
      );
      if (!hasSpecialty) return false;
    }

    // Regions filter
    if (filters.regions.length > 0 && !filters.regions.includes(advisor.region)) {
      return false;
    }

    // Experience filter
    if (advisor.yearsExperience < filters.minExperience) return false;

    return true;
  });

  if (filteredAdvisors.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-wealth-800/20 bg-wealth-950/30 p-12 text-center">
        <div>
          <p className="text-lg font-medium text-wealth-200">No advisors found</p>
          <p className="mt-2 text-sm text-wealth-400">
            Try adjusting your filters or search criteria
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-wealth-400">
          {filteredAdvisors.length} {filteredAdvisors.length === 1 ? "advisor" : "advisors"} found
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredAdvisors.map((advisor) => (
          <AdvisorCard key={advisor.id} advisor={advisor} />
        ))}
      </div>
    </div>
  );
}