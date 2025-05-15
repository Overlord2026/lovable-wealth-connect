
import React from "react";
import { ContentCard } from "./ContentCard";
import { Skeleton } from "@/components/ui/skeleton";
import { EducationalContent } from "@/services/educationService";

interface ContentGridProps {
  content: EducationalContent[];
  isLoading: boolean;
}

export function ContentGrid({ content, isLoading }: ContentGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="h-[240px]">
            <Skeleton className="h-full w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (content.length === 0) {
    return (
      <div className="flex justify-center items-center h-40 w-full border rounded-md">
        <p className="text-muted-foreground">No content found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {content.map((item) => (
        <ContentCard key={item.id} content={item} />
      ))}
    </div>
  );
}
