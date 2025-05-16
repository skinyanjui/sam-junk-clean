
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
  relatedBlogs: RelatedBlog[];
  relatedServices: string[];
}
