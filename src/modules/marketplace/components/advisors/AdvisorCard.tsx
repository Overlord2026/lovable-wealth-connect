import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Briefcase, CheckCircle2 } from "lucide-react";
import { Advisor } from "../../types/advisor";

interface AdvisorCardProps {
  advisor: Advisor;
}

export function AdvisorCard({ advisor }: AdvisorCardProps) {
  return (
    <Link to={`/marketplace/advisors/${advisor.id}`}>
      <Card className="border-wealth-800/20 bg-wealth-950/30 transition-all hover:border-wealth-700/40 hover:shadow-lg">
        <CardHeader>
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={advisor.imageUrl} alt={advisor.name} />
              <AvatarFallback className="bg-wealth-800/30 text-wealth-300">
                {advisor.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-wealth-100">{advisor.name}</h3>
                  <p className="text-sm text-wealth-400">{advisor.title}</p>
                </div>
                {advisor.isVerified && (
                  <CheckCircle2 className="h-5 w-5 text-wealth-500" />
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-wealth-300">
            <Briefcase className="h-4 w-4" />
            <span>{advisor.firm}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-wealth-300">
            <MapPin className="h-4 w-4" />
            <span>{advisor.region}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-wealth-500 text-wealth-500" />
            <span className="text-sm font-medium text-wealth-200">{advisor.rating}</span>
            <span className="text-sm text-wealth-400">({advisor.reviewCount})</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {advisor.specialties.slice(0, 2).map((specialty) => (
              <Badge key={specialty} variant="secondary" className="bg-wealth-800/30 text-wealth-300">
                {specialty}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}