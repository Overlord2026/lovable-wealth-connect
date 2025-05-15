
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchContentBySlug, EducationalContent } from "@/services/educationService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";
import ReactMarkdown from 'react-markdown';

export default function ContentDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<EducationalContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      if (!slug) return;
      
      setLoading(true);
      try {
        const contentData = await fetchContentBySlug(slug);
        setContent(contentData);
      } catch (error) {
        console.error("Error loading content:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadContent();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="container py-6">
        <div className="flex items-center mb-4">
          <Skeleton className="h-10 w-24 mr-2" />
        </div>
        
        <div className="space-y-6 max-w-3xl mx-auto">
          <Skeleton className="h-12 w-3/4" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="container py-6">
        <Button variant="outline" asChild className="mb-4">
          <Link to="/education">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Resources
          </Link>
        </Button>
        
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Content Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The content you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/education">Browse All Resources</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <Button variant="outline" asChild className="mb-4">
        <Link to="/education">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Resources
        </Link>
      </Button>
      
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge className="capitalize">{content.content_type}</Badge>
            <Badge variant="outline">{content.category}</Badge>
          </div>
          
          <h1 className="text-3xl font-bold mb-3">{content.title}</h1>
          
          <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-4">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{content.reading_time} min read</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <span>{formatDate(content.created_at)}</span>
            </div>
          </div>
        </header>
        
        <div className="prose prose-stone dark:prose-invert max-w-none">
          <ReactMarkdown>{content.content}</ReactMarkdown>
        </div>
        
        {content.tags && content.tags.length > 0 && (
          <div className="mt-8 pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {content.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
