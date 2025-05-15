
import React, { useState, useRef, useEffect } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { searchContent, EducationalContent } from "@/services/educationService";

export function ContentSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<EducationalContent[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const searchTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);
    searchTimeoutRef.current = window.setTimeout(async () => {
      const searchResults = await searchContent(query);
      setResults(searchResults);
      setLoading(false);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query]);

  const handleSelect = (content: EducationalContent) => {
    setOpen(false);
    navigate(`/education/${content.slug}`);
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full md:w-[200px] lg:w-[300px] justify-start text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span>Search...</span>
        <kbd className="hidden md:inline-flex ml-auto pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search educational content..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {loading && (
            <CommandEmpty>Searching...</CommandEmpty>
          )}
          {!loading && query && results.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {results.length > 0 && (
            <CommandGroup heading="Results">
              {results.map((content) => (
                <CommandItem
                  key={content.id}
                  value={content.title}
                  onSelect={() => handleSelect(content)}
                >
                  <div className="flex flex-col">
                    <span>{content.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {content.content_type} • {content.category}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
