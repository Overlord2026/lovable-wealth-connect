
import React, { useState, useEffect } from "react";
import { fetchFeaturedContent, fetchContentByType, EducationalContent } from "@/services/educationService";
import { PageHeader } from "@/components/ui/page-header";
import { FeaturedContent } from "@/components/education/FeaturedContent";
import { ContentSearch } from "@/components/education/ContentSearch";
import { ContentTabs } from "@/components/education/ContentTabs";
import { Separator } from "@/components/ui/separator";
import { BookOpen } from "lucide-react";

export default function Education() {
  const [featuredContent, setFeaturedContent] = useState<EducationalContent | undefined>(undefined);
  const [articles, setArticles] = useState<EducationalContent[]>([]);
  const [books, setBooks] = useState<EducationalContent[]>([]);
  const [guides, setGuides] = useState<EducationalContent[]>([]);
  const [whitepapers, setWhitepapers] = useState<EducationalContent[]>([]);
  const [courses, setCourses] = useState<EducationalContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      setLoading(true);
      try {
        // Fetch featured content
        const featured = await fetchFeaturedContent();
        setFeaturedContent(featured.find(item => item.is_featured));
        
        // Fetch content by type
        const articlesData = await fetchContentByType('article');
        const booksData = await fetchContentByType('book');
        const guidesData = await fetchContentByType('guide');
        const whitepapersData = await fetchContentByType('whitepaper');
        const coursesData = await fetchContentByType('course');
        
        setArticles(articlesData);
        setBooks(booksData);
        setGuides(guidesData);
        setWhitepapers(whitepapersData);
        setCourses(coursesData);
      } catch (error) {
        console.error("Error loading content:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadContent();
  }, []);

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center">
        <PageHeader 
          heading="Educational Resources" 
          subheading="Browse our collection of articles, books, guides, whitepapers, and courses"
          icon={<BookOpen className="h-6 w-6" />}
        />
        <ContentSearch />
      </div>
      
      <Separator className="my-6" />
      
      <FeaturedContent content={featuredContent} isLoading={loading} />
      
      <ContentTabs 
        articles={articles}
        books={books}
        guides={guides}
        whitepapers={whitepapers}
        courses={courses}
        isLoading={loading}
      />
    </div>
  );
}
