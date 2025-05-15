
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Bookmark } from "lucide-react";
import { EducationalContent } from "@/services/educationService";
import { Link } from "react-router-dom";

const ContentTypeIcons: Record<string, React.ReactNode> = {
  article: <Bookmark size={16} />,
  book: <Bookmark size={16} />,
  guide: <Bookmark size={16} />,
  whitepaper: <Bookmark size={16} />,
  course: <Bookmark size={16} />,
};

const ContentTypeColors: Record<string, string> = {
  article: "bg-blue-100 text-blue-800",
  book: "bg-emerald-100 text-emerald-800",
  guide: "bg-amber-100 text-amber-800",
  whitepaper: "bg-purple-100 text-purple-800",
  course: "bg-pink-100 text-pink-800",
};

interface ContentCardProps {
  content: EducationalContent;
}

export function ContentCard({ content }: ContentCardProps) {
  const {
    title,
    summary,
    reading_time,
    content_type,
    category,
    slug,
    tags = [],
  } = content;

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <Link to={`/education/${slug}`} className="flex flex-col h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className={ContentTypeColors[content_type]}>
              {ContentTypeIcons[content_type]}
              <span className="ml-1 capitalize">{content_type}</span>
            </Badge>
            <Badge variant="secondary">{category}</Badge>
          </div>
          <h3 className="text-lg font-semibold mt-2 line-clamp-2">{title}</h3>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground text-sm line-clamp-3">{summary}</p>
        </CardContent>
        <CardFooter className="pt-2 flex items-center justify-between">
          <div className="flex items-center text-muted-foreground text-xs">
            <Clock size={14} className="mr-1" />
            <span>{reading_time} min read</span>
          </div>
          <div className="flex flex-wrap gap-1 justify-end">
            {tags?.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags?.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 2}
              </Badge>
            )}
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
