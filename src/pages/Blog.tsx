
import { useState, useEffect } from 'react';
import { Calendar, Tag, Recycle, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
                          post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesCategory = activeCategory ? post.category === activeCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  // Group posts by category
  const categories = [...new Set(blogPosts.map(post => post.category))];

  // Add icon to related links
  const linksWithIcons = relatedLinks.map(link => {
    if (link.title === "Frequently Asked Questions") {
      return { ...link, icon: Calendar };
    } else if (link.title === "Our Services") {
      return { ...link, icon: Tag };
    } else if (link.title === "Free Quote") {
      return { ...link, icon: Recycle };
    }
    return link;
  });

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <PageLayout>
      <SEO 
        title="Junk Removal Blog | Tips & Advice | Uncle Sam Junk Removal"
        description="Explore expert tips on junk removal, recycling guides, decluttering strategies, and sustainability practices from Uncle Sam Junk Removal's professional team serving Evansville and the Tri-State area."
        keywords="junk removal blog, decluttering tips, recycling guide, waste management, Evansville junk removal, Tri-State waste disposal, home organization"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Uncle Sam Junk Removal Blog",
          "description": "Expert tips, advice, and guides on junk removal, recycling, and sustainable waste management practices for homes and businesses.",
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
          
          <section className="py-16 bg-gray-50" aria-labelledby="articles-heading">
            <div className="container-custom">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <motion.h2 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  id="articles-heading" 
                  className="text-3xl font-bold text-brand-navy mb-4 md:mb-0"
                >
                  {searchQuery || activeCategory ? 'Search Results' : 'All Articles'}
                </motion.h2>
                
                {/* Search and filter controls */}
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  <div className="relative flex-grow max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      type="text"
                      placeholder="Search articles..."
                      className="pl-10 pr-4 py-2 border-gray-300 focus:border-brand-red"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  {searchQuery && (
                    <Button 
                      variant="outline" 
                      onClick={() => setSearchQuery('')}
                      className="text-sm"
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Categories filter */}
              <div className="mb-8">
                <BlogCategories 
                  categories={categories}
                  activeCategory={activeCategory}
                  onSelectCategory={setActiveCategory}
                />
              </div>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AllPosts 
                  posts={filteredPosts} 
                  searchQuery={searchQuery} 
                  setSearchQuery={setSearchQuery} 
                  itemVariants={itemVariants}
                />
              </motion.div>
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
