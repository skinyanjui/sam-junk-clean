
export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  author: string;
  created_at: string;
  updated_at: string;
  tags: string[] | null;
  category: string | null;
  is_featured: boolean | null;
  is_pricing_resource: boolean | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogResponse {
  data: Blog[];
  total: number;
}
