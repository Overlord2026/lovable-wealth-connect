import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { AdvisorFiltersState } from "../../pages/AdvisorDirectory";

interface AdvisorFiltersProps {
  filters: AdvisorFiltersState;
  onFilterChange: (updates: Partial<AdvisorFiltersState>) => void;
}

const specialties = [
  "Wealth Management",
  "Tax Planning",
  "Estate Planning",
  "Investment Advisory",
  "Risk Management",
  "Retirement Planning",
];

const regions = [
  "North America",
  "Europe",
  "Asia Pacific",
  "Middle East",
  "Latin America",
];

export function AdvisorFilters({ filters, onFilterChange }: AdvisorFiltersProps) {
  const toggleSpecialty = (specialty: string) => {
    const newSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter((s) => s !== specialty)
      : [...filters.specialties, specialty];
    onFilterChange({ specialties: newSpecialties });
  };

  const toggleRegion = (region: string) => {
    const newRegions = filters.regions.includes(region)
      ? filters.regions.filter((r) => r !== region)
      : [...filters.regions, region];
    onFilterChange({ regions: newRegions });
  };

  return (
    <div className="space-y-6">
      {/* Verified Only */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="verified"
            checked={filters.verifiedOnly}
            onCheckedChange={(checked) => 
              onFilterChange({ verifiedOnly: checked as boolean })
            }
          />
          <Label htmlFor="verified" className="text-sm text-wealth-300">
            Verified professionals only
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="available"
            checked={filters.availableNow}
            onCheckedChange={(checked) => 
              onFilterChange({ availableNow: checked as boolean })
            }
          />
          <Label htmlFor="available" className="text-sm text-wealth-300">
            Available now
          </Label>
        </div>
      </div>

      <Separator className="bg-wealth-800/20" />

      {/* Specialties */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-wealth-200">Specialties</h3>
        <div className="space-y-2">
          {specialties.map((specialty) => (
            <div key={specialty} className="flex items-center space-x-2">
              <Checkbox
                id={specialty}
                checked={filters.specialties.includes(specialty)}
                onCheckedChange={() => toggleSpecialty(specialty)}
              />
              <Label htmlFor={specialty} className="text-sm text-wealth-300">
                {specialty}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-wealth-800/20" />

      {/* Regions */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-wealth-200">Regions</h3>
        <div className="space-y-2">
          {regions.map((region) => (
            <div key={region} className="flex items-center space-x-2">
              <Checkbox
                id={region}
                checked={filters.regions.includes(region)}
                onCheckedChange={() => toggleRegion(region)}
              />
              <Label htmlFor={region} className="text-sm text-wealth-300">
                {region}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-wealth-800/20" />

      {/* Experience */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-wealth-200">
            Minimum Experience
          </h3>
          <span className="text-sm text-wealth-400">{filters.minExperience} years</span>
        </div>
        <Slider
          value={[filters.minExperience]}
          onValueChange={([value]) => onFilterChange({ minExperience: value })}
          min={0}
          max={30}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  );
}