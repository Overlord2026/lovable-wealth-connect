
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

type Advisor = {
  id: number;
  name: string;
  title: string;
  image: string;
  specialties: string[];
  experience: string;
  location: string;
  rating: number;
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
    rating: 4.9,
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Wealth Management Specialist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop",
    specialties: ["Investment Strategy", "Tax Planning"],
    experience: "12+ years",
    location: "San Francisco, CA",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Olivia Rodriguez",
    title: "Family Wealth Advisor",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop",
    specialties: ["Family Office", "Inheritance Planning"],
    experience: "10+ years",
    location: "Chicago, IL",
    rating: 4.7,
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
    <div id="advisors" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-[#0F172A]">
            Meet Our <span className="text-teal-600">Expert Advisors</span>
          </h2>
          <p className="text-lg text-[#374151] max-w-3xl mx-auto">
            Connect with top-tier financial professionals who are ready to help you navigate your unique financial journey and achieve your long-term goals.
          </p>
        </div>
        
        <div className="mb-10 flex flex-wrap gap-2 justify-center">
          {specialties.map((specialty) => (
            <Button
              key={specialty}
              onClick={() => setSelectedSpecialty(specialty === "All" ? null : specialty)}
              className={selectedSpecialty === specialty || (specialty === "All" && !selectedSpecialty) 
                ? "bg-[#00B8BF] text-white font-semibold shadow-sm" 
                : "bg-neutral-800 text-neutral-300 hover:text-[#00B8BF] border-[#00B8BF]/20"}
            >
              {specialty}
            </Button>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAdvisors.map((advisor) => (
            <Card key={advisor.id} className="overflow-hidden hover:shadow-xl transition-all duration-200 border-none rounded-xl shadow-lg bg-white">
              <div className="p-6 pb-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={advisor.image}
                    alt={advisor.name}
                    className="h-16 w-16 rounded-full object-cover border-2 border-teal-100"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A]">{advisor.name}</h3>
                    <p className="text-[#374151]">{advisor.title}</p>
                  </div>
                </div>
                
                <div className="flex items-center mt-4 mb-2">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-4 w-4" 
                        fill={i < Math.floor(advisor.rating) ? "currentColor" : "none"} 
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium text-[#374151]">{advisor.rating}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 my-4">
                  {advisor.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                
                <div className="text-sm text-[#374151] space-y-2 mt-4">
                  <p><span className="font-medium">Experience:</span> {advisor.experience}</p>
                  <p><span className="font-medium">Location:</span> {advisor.location}</p>
                </div>
              </div>
              
              <CardContent className="p-0">
                <div className="h-px bg-gradient-to-r from-teal-500 to-blue-500"></div>
              </CardContent>
              
              <CardFooter className="p-4 pt-4">
                <Button className="w-full bg-[#00B8BF] hover:bg-[#00B8BF]/90 text-white">
                  View Profile
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" className="border-[#00B8BF] text-[#00B8BF] hover:bg-[#00B8BF]/10">
            View All Advisors
          </Button>
        </div>
      </div>
    </div>
  );
}
