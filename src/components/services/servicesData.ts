
export interface RelatedBlog {
  title: string;
  slug: string;
}

export interface ServiceData {
  id: string;
  title: string;
  description: string;
  items: string[];
  image: string;
  popularity?: 'high' | 'medium' | 'low';
  priceRange?: string;
  timeEstimate?: string;
  benefits?: string[];
  relatedBlogs: RelatedBlog[];
  relatedServices: string[];
  category?: string; // Added category field
}
