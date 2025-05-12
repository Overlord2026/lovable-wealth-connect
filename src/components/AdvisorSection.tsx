
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Advisor = {
  id: number;
  name: string;
  title: string;
  image: string;
  specialties: string[];
  experience: string;
  location: string;
};

const advisors: Advisor[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Financial Advisor",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop",
    specialties: ["Retirement Planning", "Estate Planning"],
    experience: "15+ years",
    location: "New York, NY",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Wealth Management Specialist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop",
    specialties: ["Investment Strategy", "Tax Planning"],
    experience: "12+ years",
    location: "San Francisco, CA",
  },
  {
    id: 3,
    name: "Olivia Rodriguez",
    title: "Family Wealth Advisor",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop",
    specialties: ["Family Office", "Inheritance Planning"],
    experience: "10+ years",
    location: "Chicago, IL",
  },
];

export function AdvisorSection() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  
  const specialties = [
    "All",
    "Retirement Planning",
    "Estate Planning",
    "Investment Strategy",
    "Tax Planning",
    "Family Office",
    "Inheritance Planning",
  ];
  
  const filteredAdvisors = selectedSpecialty && selectedSpecialty !== "All"
    ? advisors.filter(advisor => advisor.specialties.includes(selectedSpecialty))
    : advisors;

  return (
    <div id="advisors" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-wealth-950">
            Meet Our <span className="text-wealth-700">Expert Advisors</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our network of experienced professionals is ready to help you navigate your financial journey.
          </p>
        </div>
        
        <div className="mb-10 flex flex-wrap gap-2 justify-center">
          {specialties.map((specialty) => (
            <Button
              key={specialty}
              variant={selectedSpecialty === specialty || (specialty === "All" && !selectedSpecialty) ? "default" : "outline"}
              className={selectedSpecialty === specialty || (specialty === "All" && !selectedSpecialty) ? "bg-wealth-800" : ""}
              onClick={() => setSelectedSpecialty(specialty === "All" ? null : specialty)}
            >
              {specialty}
            </Button>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAdvisors.map((advisor) => (
            <Card key={advisor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={advisor.image}
                    alt={advisor.name}
                    className="h-16 w-16 rounded-full object-cover border-2 border-wealth-100"
                  />
                  <div>
                    <CardTitle className="text-xl">{advisor.name}</CardTitle>
                    <CardDescription>{advisor.title}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {advisor.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="bg-wealth-50 text-wealth-800">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                <div className="text-sm text-gray-600 space-y-2">
                  <p><span className="font-medium">Experience:</span> {advisor.experience}</p>
                  <p><span className="font-medium">Location:</span> {advisor.location}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-wealth-800 hover:bg-wealth-900">
                  View Profile
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" className="border-wealth-800 text-wealth-800 hover:bg-wealth-50">
            View All Advisors
          </Button>
        </div>
      </div>
    </div>
  );
}
