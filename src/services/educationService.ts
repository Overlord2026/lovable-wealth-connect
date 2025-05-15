
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

export interface EducationalContent {
  id: string;
  title: string;
  content: string;
  summary: string;
  content_type: 'article' | 'book' | 'guide' | 'whitepaper' | 'course';
  category: string;
  reading_time: number;
  created_at: string;
  updated_at: string;
  is_featured: boolean;
  slug: string;
  thumbnail_url: string | null;
  user_id: string;
  tags?: string[];
}

export interface ContentTag {
  id: string;
  content_id: string;
  tag: string;
  created_at: string;
}

export async function fetchFeaturedContent(): Promise<EducationalContent[]> {
  try {
    const { data, error } = await supabase
      .from('educational_content')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    // Fetch tags for each content item
    const contentWithTags = await Promise.all(data.map(async (item) => {
      const { data: tags } = await supabase
        .from('content_tags')
        .select('tag')
        .eq('content_id', item.id);
      
      return {
        ...item,
        content_type: item.content_type as 'article' | 'book' | 'guide' | 'whitepaper' | 'course',
        tags: tags?.map(t => t.tag) || []
      };
    }));
    
    return contentWithTags;
  } catch (error) {
    console.error("Error fetching featured content:", error);
    return [];
  }
}

export async function fetchContentByType(type: string): Promise<EducationalContent[]> {
  try {
    const { data, error } = await supabase
      .from('educational_content')
      .select('*')
      .eq('content_type', type)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    // Fetch tags for each content item
    const contentWithTags = await Promise.all(data.map(async (item) => {
      const { data: tags } = await supabase
        .from('content_tags')
        .select('tag')
        .eq('content_id', item.id);
      
      return {
        ...item,
        content_type: item.content_type as 'article' | 'book' | 'guide' | 'whitepaper' | 'course',
        tags: tags?.map(t => t.tag) || []
      };
    }));
    
    return contentWithTags;
  } catch (error) {
    console.error(`Error fetching ${type} content:`, error);
    return [];
  }
}

export async function fetchContentBySlug(slug: string): Promise<EducationalContent | null> {
  try {
    const { data, error } = await supabase
      .from('educational_content')
      .select('*')
      .eq('slug', slug)
      .single();
      
    if (error) throw error;
    
    // Fetch tags for the content item
    const { data: tags } = await supabase
      .from('content_tags')
      .select('tag')
      .eq('content_id', data.id);
    
    return {
      ...data,
      content_type: data.content_type as 'article' | 'book' | 'guide' | 'whitepaper' | 'course',
      tags: tags?.map(t => t.tag) || []
    };
  } catch (error) {
    console.error("Error fetching content by slug:", error);
    return null;
  }
}

export async function searchContent(query: string): Promise<EducationalContent[]> {
  try {
    // Search in title and summary (could be expanded to content with full-text search)
    const { data, error } = await supabase
      .from('educational_content')
      .select('*')
      .or(`title.ilike.%${query}%,summary.ilike.%${query}%,category.ilike.%${query}%`);
      
    if (error) throw error;
    
    // Fetch tags for search results
    const contentWithTags = await Promise.all(data.map(async (item) => {
      const { data: tags } = await supabase
        .from('content_tags')
        .select('tag')
        .eq('content_id', item.id);
      
      return {
        ...item,
        content_type: item.content_type as 'article' | 'book' | 'guide' | 'whitepaper' | 'course',
        tags: tags?.map(t => t.tag) || []
      };
    }));
    
    return contentWithTags;
  } catch (error) {
    console.error("Error searching content:", error);
    return [];
  }
}

export async function fetchAllCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('educational_content')
      .select('category')
      .order('category');
      
    if (error) throw error;
    
    // Extract unique categories
    const uniqueCategories = [...new Set(data.map(item => item.category))];
    return uniqueCategories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function fetchAllTags(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('content_tags')
      .select('tag')
      .order('tag');
      
    if (error) throw error;
    
    // Extract unique tags
    const uniqueTags = [...new Set(data.map(item => item.tag))];
    return uniqueTags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}
