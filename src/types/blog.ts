
export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  imageUrl: string;
  slug: string;
  readTime?: string; // Optional reading time
  tags?: string[]; // Optional array of tags for categorization and SEO
};
