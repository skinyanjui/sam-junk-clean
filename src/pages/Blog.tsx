
import { useState, useEffect } from 'react';
import { Calendar, Tag, Recycle } from 'lucide-react';
import { motion } from 'framer-motion';

import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { relatedLinks } from '@/data/blogData';
import { comprehensiveBlogPosts } from '@/data/comprehensiveBlogData';
import { fetchAllBlogPosts } from '@/integrations/supabase/blogService';
import { mapBlogToBlogPost } from '@/integrations/supabase/services/blogUtils';
import { siteConfig } from '@/config/siteConfig';
import { useToast } from '@/hooks/use-toast';

// Import components
import BlogHero from '@/components/blog/BlogHero';
import FeaturedPosts from '@/components/blog/FeaturedPosts';
import AllPosts from '@/components/blog/AllPosts';
import RelatedResources from '@/components/blog/RelatedResources';
import CategoriesSection from '@/components/blog/CategoriesSection';
import BlogCta from '@/components/blog/BlogCta';
import BlogSearch from '@/components/blog/BlogSearch';
import DownloadableResources from '@/components/blog/DownloadableResources';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import BlogLoading from '@/components/blog/BlogLoading';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true);
        const supabasePosts = await fetchAllBlogPosts();
        const mappedSupabasePosts = supabasePosts.map(mapBlogToBlogPost);
        
        // Combine Supabase posts with comprehensive blog posts
        const allPosts = [...mappedSupabasePosts, ...comprehensiveBlogPosts];
        setBlogPosts(allPosts);
        setFilteredPosts(allPosts);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
        // Fallback to comprehensive blog posts if Supabase fails
        setBlogPosts(comprehensiveBlogPosts);
        setFilteredPosts(comprehensiveBlogPosts);
        toast({
          title: "Using cached blog posts",
          description: "Some posts may not be the latest version",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, [toast]);

  // Get unique categories
  const categories = Array.from(new Set(blogPosts.map(post => post.category))).filter(Boolean);

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

  const pageTitle = `Junk Removal Blog | Tips & Advice | ${siteConfig.siteName}`;
  const pageDescription = `Explore expert tips on junk removal, recycling guides, decluttering strategies, and sustainability practices from ${siteConfig.businessName}'s professional team serving ${siteConfig.address.addressLocality} and the Tri-State area.`;

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": `${siteConfig.businessName} Blog`,
    "description": `Expert tips, advice, and guides on junk removal, recycling, and sustainable waste management practices from ${siteConfig.businessName}.`,
    "url": `${siteConfig.siteUrl}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.businessName,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`
      }
    },
    "mainEntity": filteredPosts.length > 0 ? {
      "@type": "ItemList",
      "itemListElement": filteredPosts.slice(0, 10).map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "BlogPosting",
          "headline": post.title,
          "url": `${siteConfig.siteUrl}/blog/${post.slug}`,
          "image": post.imageUrl?.startsWith('http') ? post.imageUrl : `${siteConfig.siteUrl}${post.imageUrl?.startsWith('/') ? '' : '/'}${post.imageUrl}`,
          "datePublished": new Date(post.date).toISOString(),
          "author": { "@type": "Person", "name": post.author },
          "description": post.excerpt,
          "publisher": {
             "@type": "Organization",
             "name": siteConfig.businessName,
             "logo": {
               "@type": "ImageObject",
               "url": `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`
             }
          }
        }
      }))
    } : undefined
  };
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${siteConfig.siteUrl}/blog` }
    ]
  };

  return (
    <PageLayout>
      <SEO 
        title={pageTitle}
        description={pageDescription}
        keywords="junk removal blog, decluttering tips, recycling guide, waste management, Evansville junk removal, Tri-State waste disposal, home organization"
        structuredData={[blogSchema, breadcrumbSchema]}
      />

      <BlogHero searchQuery="" setSearchQuery={() => {}} />
      
      {isLoading ? (
        <BlogLoading />
      ) : (
        <>
          <FeaturedPosts posts={blogPosts} />
          
          {/* Blog Search and Filters */}
          <section className="py-8 bg-gray-50">
            <div className="container-custom">
              <BlogSearch 
                posts={blogPosts} 
                onFilteredResults={setFilteredPosts}
                categories={categories}
              />
            </div>
          </section>
          
          <section className="py-16 bg-white" aria-labelledby="articles-heading">
            <div className="container-custom">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AllPosts 
                  posts={filteredPosts} 
                  searchQuery="" 
                  setSearchQuery={() => {}} 
                  itemVariants={itemVariants}
                />
              </motion.div>
            </div>
          </section>
          
          <DownloadableResources />
          
          {/* Newsletter Section */}
          <section className="py-16 bg-gray-50">
            <div className="container-custom max-w-4xl">
              <BlogNewsletter />
            </div>
          </section>
          
          <RelatedResources links={linksWithIcons} />
          <CategoriesSection categories={categories} setSearchQuery={() => {}} />
          <BlogCta />
        </>
      )}
    </PageLayout>
  );
};

export default Blog;

