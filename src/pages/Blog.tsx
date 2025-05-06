
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { useState, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';
import { relatedLinks } from '@/data/blogData';
import { BlogPost } from '@/types/blog';
import BlogHero from '@/components/blog/BlogHero';
import FeaturedPosts from '@/components/blog/FeaturedPosts';
import AllPosts from '@/components/blog/AllPosts';
import RelatedResources from '@/components/blog/RelatedResources';
import CategoriesSection from '@/components/blog/CategoriesSection';
import BlogCta from '@/components/blog/BlogCta';
import { getAllBlogPosts } from '@/integrations/supabase/blogService';
import { useToast } from '@/hooks/use-toast';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true);
        const posts = await getAllBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
        toast({
          title: "Error loading blog posts",
          description: "Please try again later",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, [toast]);

  // Filter posts based on search query
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group posts by category for featured section
  const categories = [...new Set(blogPosts.map(post => post.category))];

  // Add icon to related links
  const linksWithIcons = relatedLinks.map(link => {
    if (link.title === "FAQ") {
      return { ...link, icon: HelpCircle };
    }
    return link;
  });

  return (
    <PageLayout>
      <SEO 
        title="Blog | Uncle Sam Junk Removal"
        description="Stay informed with the latest tips, advice, and news on junk removal, recycling, and sustainable waste management from Uncle Sam Junk Removal."
        keywords="junk removal blog, waste management tips, decluttering advice, recycling guide, Tri-State area junk removal"
      />

      <BlogHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {isLoading ? (
        <div className="py-16 container-custom text-center">
          <div className="w-10 h-10 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      ) : (
        <>
          <FeaturedPosts posts={blogPosts} />
          <AllPosts 
            posts={filteredPosts} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
          <RelatedResources links={linksWithIcons} />
          <CategoriesSection categories={categories} setSearchQuery={setSearchQuery} />
          <BlogCta />
        </>
      )}
    </PageLayout>
  );
};

export default Blog;
