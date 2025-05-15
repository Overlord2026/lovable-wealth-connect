
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { EducationalContent } from "@/services/educationService";
import { Skeleton } from "@/components/ui/skeleton";

interface FeaturedContentProps {
  content?: EducationalContent;
  isLoading: boolean;
}

export function FeaturedContent({ content, isLoading }: FeaturedContentProps) {
  if (isLoading) {
    return (
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Skeleton className="h-40 md:h-auto md:w-1/3" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-24 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <Card className="mb-6 bg-muted/50">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 h-40 md:h-auto bg-primary/10 flex items-center justify-center rounded-md">
            {content.thumbnail_url ? (
              <img 
                src={content.thumbnail_url} 
                alt={content.title} 
                className="h-full w-full object-cover rounded-md"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5 rounded-md flex items-center justify-center">
                <span className="text-primary font-semibold text-xl">Featured</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 space-y-2 md:space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="capitalize">{content.content_type}</Badge>
              <Badge variant="outline">{content.category}</Badge>
            </div>
            
            <h2 className="text-2xl font-bold">{content.title}</h2>
            
            <p className="text-muted-foreground line-clamp-3">{content.summary}</p>
            
            <div className="flex items-center justify-between pt-2">
              <Button asChild>
                <Link to={`/education/${content.slug}`}>
                  Read More <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
              
              <div className="flex items-center text-muted-foreground">
                <Clock size={16} className="mr-1" />
                <span>{content.reading_time} min read</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
