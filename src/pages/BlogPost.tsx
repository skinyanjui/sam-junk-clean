
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { getBlogPostBySlug, Blog as BlogType } from '@/integrations/supabase/blogService';
import { useToast } from '@/hooks/use-toast';
import { mapBlogToBlogPost } from '@/integrations/supabase/services/blogUtils';

// Import components
import BlogPostLoading from '@/components/blog/BlogPostLoading';
import BlogPostNotFound from '@/components/blog/BlogPostNotFound';
import BlogPostHeader from '@/components/blog/BlogPostHeader';
import BlogPostContent from '@/components/blog/BlogPostContent';
import BlogPostTags from '@/components/blog/BlogPostTags';
import ShareButtons from '@/components/blog/ShareButtons';
import BlogSidebar from '@/components/blog/BlogSidebar';
import BlogCallToAction from '@/components/blog/BlogCallToAction';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!slug) return;
      
      try {
        setIsLoading(true);
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

  return (
    <PageLayout>
      <SEO 
        title={`${post.title} | Uncle Sam Junk Removal Blog`}
        description={post.excerpt}
        keywords={`${post.category}, junk removal blog, waste management, Uncle Sam Junk Removal, ${post.title}`}
        ogImage={post.imageUrl}
        ogType="article"
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
