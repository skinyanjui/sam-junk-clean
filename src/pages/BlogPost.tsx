
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { getBlogPostBySlug } from '@/integrations/supabase/blogService';
import { comprehensiveBlogPosts, relatedPostsMapping } from '@/data/comprehensiveBlogData';
import { useToast } from '@/hooks/use-toast';
import { mapBlogToBlogPost } from '@/integrations/supabase/services/blogUtils';
import { siteConfig } from '@/config/siteConfig';

// Import components
import BlogPostLoading from '@/components/blog/BlogPostLoading';
import BlogPostNotFound from '@/components/blog/BlogPostNotFound';
import BlogPostHeader from '@/components/blog/BlogPostHeader';
import BlogPostContent from '@/components/blog/BlogPostContent';
import BlogPostTags from '@/components/blog/BlogPostTags';
import ShareButtons from '@/components/blog/ShareButtons';
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogCallToAction from '@/components/blog/BlogCallToAction';
import RelatedPosts from '@/components/blog/RelatedPosts';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const [post, setPost] = useState<any | null>(null);
  const [allPosts, setAllPosts] = useState<any[]>(comprehensiveBlogPosts);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!slug) return;
      
      try {
        setIsLoading(true);
        
        // First try to find in comprehensive blog posts
        const comprehensivePost = comprehensiveBlogPosts.find(p => p.slug === slug);
        if (comprehensivePost) {
          setPost(comprehensivePost);
          setIsLoading(false);
          return;
        }
        
        // If not found, try Supabase
        const fetchedPost = await getBlogPostBySlug(slug);
        
        if (fetchedPost) {
          setPost(mapBlogToBlogPost(fetchedPost));
        } else {
          toast({
            title: "Blog post not found",
            description: "The requested blog post could not be found",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
        toast({
          title: "Error loading blog post",
          description: "Please try again later",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug, toast]);

  if (isLoading) {
    return (
      <PageLayout>
        <BlogPostLoading />
      </PageLayout>
    );
  }

  if (!post) {
    return (
      <PageLayout>
        <BlogPostNotFound />
      </PageLayout>
    );
  }

  const absoluteOgImageUrl = post.imageUrl?.startsWith('http') 
    ? post.imageUrl 
    : `${siteConfig.siteUrl}${post.imageUrl?.startsWith('/') ? '' : '/'}${post.imageUrl}`;

  const canonicalUrl = `${siteConfig.siteUrl}${location.pathname}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": absoluteOgImageUrl,
    "datePublished": new Date(post.date).toISOString(),
    "dateModified": new Date(post.date).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.businessName,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "keywords": post.tags ? post.tags.join(', ') : undefined
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${siteConfig.siteUrl}/blog` },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": canonicalUrl }
    ]
  };
  
  return (
    <PageLayout>
      <SEO 
        title={post.title}
        description={post.excerpt}
        keywords={post.tags ? `${post.category}, ${post.tags.join(', ')}, junk removal blog, ${siteConfig.businessName}` : `${post.category}, junk removal blog, ${siteConfig.businessName}`}
        ogImage={absoluteOgImageUrl}
        ogType="article"
        canonicalUrl={canonicalUrl}
        structuredData={[articleSchema, breadcrumbSchema]}
      />
      
      <div className="container-custom py-10 md:py-16">
        <article>
          <BlogPostHeader 
            category={post.category} 
            title={post.title} 
            author={post.author} 
            date={post.date} 
          />
          
          {/* Featured Image */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-10">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content and Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <BlogPostContent excerpt={post.excerpt} content={post.content} />
              <BlogPostTags tags={post.tags} />
              <ShareButtons />
              
              {/* Related Posts */}
              <RelatedPosts 
                currentPostSlug={post.slug}
                allPosts={allPosts}
                relatedPostSlugs={relatedPostsMapping[post.slug]}
              />
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar />
            </div>
          </div>
        </article>
        
        <BlogCallToAction />
      </div>
    </PageLayout>
  );
};

export default BlogPostPage;

