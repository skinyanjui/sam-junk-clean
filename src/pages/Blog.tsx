
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { useState, useEffect } from 'react';
import { Calendar, Tag, Recycle } from 'lucide-react';
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
import BlogCategories from '@/components/blog/BlogCategories';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
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

  // Filter posts based on search query and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory ? post.category === activeCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  // Group posts by category
  const categories = [...new Set(blogPosts.map(post => post.category))];

  // Add icon to related links
  const linksWithIcons = relatedLinks.map(link => {
    if (link.title === "FAQ") {
      return { ...link, icon: Calendar };
    } else if (link.title === "Services") {
      return { ...link, icon: Tag };
    } else if (link.title === "Get a Quote") {
      return { ...link, icon: Recycle };
    }
    return link;
  });

  return (
    <PageLayout>
      <SEO 
        title="Blog | Uncle Sam Junk Removal"
        description="Stay informed with the latest tips, advice, and news on junk removal, recycling, and sustainable waste management from Uncle Sam Junk Removal."
        keywords="junk removal blog, waste management tips, decluttering advice, recycling guide, Tri-State area junk removal"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Uncle Sam Junk Removal Blog",
          "description": "Tips, advice, and news on junk removal, recycling, and sustainable waste management",
          "url": "https://unclesamjunkremoval.com/blog",
          "publisher": {
            "@type": "Organization",
            "name": "Uncle Sam Junk Removal",
            "logo": {
              "@type": "ImageObject",
              "url": "https://unclesamjunkremoval.com/logo.png"
            }
          }
        }}
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
          
          <section className="py-16 bg-brand-gray">
            <div className="container-custom">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <h2 className="text-3xl font-bold text-brand-navy mb-4 md:mb-0">
                  {searchQuery || activeCategory ? 'Search Results' : 'All Articles'}
                </h2>
                
                {/* Categories filter */}
                <BlogCategories 
                  categories={categories}
                  activeCategory={activeCategory}
                  onSelectCategory={setActiveCategory}
                />
              </div>
              
              <AllPosts 
                posts={filteredPosts} 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
              />
            </div>
          </section>
          
          <RelatedResources links={linksWithIcons} />
          <CategoriesSection categories={categories} setSearchQuery={setSearchQuery} />
          <BlogCta />
        </>
      )}
    </PageLayout>
  );
};

export default Blog;
