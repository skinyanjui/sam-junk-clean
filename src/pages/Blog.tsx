
import { useState, useEffect } from 'react';
import { Calendar, Tag, Recycle } from 'lucide-react';
import { motion } from 'framer-motion';

import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { relatedLinks } from '@/data/blogData';
import { fetchAllBlogPosts } from '@/integrations/supabase/blogService';
import { mapBlogToBlogPost } from '@/integrations/supabase/services/blogUtils';
import { useToast } from '@/hooks/use-toast';
import { useBlogFilters } from '@/hooks/use-blog-filters';

// Import components
import BlogHero from '@/components/blog/BlogHero';
import FeaturedPosts from '@/components/blog/FeaturedPosts';
import AllPosts from '@/components/blog/AllPosts';
import RelatedResources from '@/components/blog/RelatedResources';
import CategoriesSection from '@/components/blog/CategoriesSection';
import BlogCta from '@/components/blog/BlogCta';
import BlogCategories from '@/components/blog/BlogCategories';
import BlogListHeader from '@/components/blog/BlogListHeader';
import BlogLoading from '@/components/blog/BlogLoading';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Use our custom hook for filtering logic
  const {
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    filteredPosts,
    categories
  } = useBlogFilters({ posts: blogPosts });

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true);
        const posts = await fetchAllBlogPosts();
        setBlogPosts(posts.map(mapBlogToBlogPost));
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
        <BlogLoading />
      ) : (
        <>
          <FeaturedPosts posts={blogPosts} />
          
          <section className="py-16 bg-gray-50" aria-labelledby="articles-heading">
            <div className="container-custom">
              <BlogListHeader 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                activeCategory={activeCategory}
              />
              
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
