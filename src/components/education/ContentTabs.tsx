
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ContentGrid } from "./ContentGrid";
import { EducationalContent } from "@/services/educationService";

interface ContentTabsProps {
  articles: EducationalContent[];
  books: EducationalContent[];
  guides: EducationalContent[];
  whitepapers: EducationalContent[];
  courses: EducationalContent[];
  isLoading: boolean;
}

export function ContentTabs({
  articles,
  books,
  guides,
  whitepapers,
  courses,
  isLoading,
}: ContentTabsProps) {
  return (
    <Tabs defaultValue="articles">
      <TabsList className="mb-4 w-full grid grid-cols-5 h-auto">
        <TabsTrigger value="articles" className="py-2">Articles</TabsTrigger>
        <TabsTrigger value="books" className="py-2">Books</TabsTrigger>
        <TabsTrigger value="guides" className="py-2">Guides</TabsTrigger>
        <TabsTrigger value="whitepapers" className="py-2">Whitepapers</TabsTrigger>
        <TabsTrigger value="courses" className="py-2">Courses</TabsTrigger>
      </TabsList>
      <TabsContent value="articles">
        <ContentGrid content={articles} isLoading={isLoading} />
      </TabsContent>
      <TabsContent value="books">
        <ContentGrid content={books} isLoading={isLoading} />
      </TabsContent>
      <TabsContent value="guides">
        <ContentGrid content={guides} isLoading={isLoading} />
      </TabsContent>
      <TabsContent value="whitepapers">
        <ContentGrid content={whitepapers} isLoading={isLoading} />
      </TabsContent>
      <TabsContent value="courses">
        <ContentGrid content={courses} isLoading={isLoading} />
      </TabsContent>
    </Tabs>
  );
}
