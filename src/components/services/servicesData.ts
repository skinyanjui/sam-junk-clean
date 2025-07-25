
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
  category: string;
  popularity?: 'high' | 'medium' | 'low';
  priceRange?: string;
  timeEstimate?: string;
  benefits?: string[];
  relatedBlogs: RelatedBlog[];
  relatedServices: string[];
}
