
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Bookmark, Share2 } from 'lucide-react';
import { getBlogPostBySlug, Blog as BlogType } from '@/integrations/supabase/blogService';
import { Separator } from '@/components/ui/separator';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { useToast } from '@/hooks/use-toast';

// Convert Blog from blogService to the format expected by components
const mapBlogToBlogPost = (blog: BlogType) => {
  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    category: blog.category || 'Uncategorized',
    date: new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    author: blog.author,
    imageUrl: blog.image_url || 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b',
    content: blog.content,
    tags: blog.tags || []
  };
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!slug) return;
      
      try {
        setIsLoading(true);
        const fetchedPost = await getBlogPostBySlug(slug);
        
        if (fetchedPost) {
          setPost(mapBlogToBlogPost(fetchedPost));
          // In a real application, we would also fetch related posts based on category
          // For now we'll just mock this functionality
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
        <div className="container-custom py-12" aria-label="Loading blog post">
          <LoadingSkeleton variant="card" className="h-64 mb-8" />
          <LoadingSkeleton className="h-12 w-3/4 mb-4" />
          <LoadingSkeleton className="h-6 w-1/3 mb-8" />
          <LoadingSkeleton className="h-32" count={3} />
        </div>
      </PageLayout>
    );
  }

  if (!post) {
    return (
      <PageLayout>
        <div className="container-custom py-16 text-center" aria-labelledby="not-found-heading">
          <h1 id="not-found-heading" className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="mb-6">Sorry, the blog post you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
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
        {/* Back button */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="text-gray-600 pl-0 hover:bg-transparent hover:text-brand-red">
            <Link to="/blog" className="flex items-center">
              <ArrowLeft size={18} className="mr-2" />
              Back to all articles
            </Link>
          </Button>
        </div>
        
        {/* Header */}
        <article>
          <header className="mb-8">
            <span className="text-brand-red font-medium">{post.category}</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mt-2 mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center text-gray-600 gap-x-6 gap-y-2">
              <div className="flex items-center">
                <User size={16} className="mr-2" aria-hidden="true" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" aria-hidden="true" />
                <span>{post.date}</span>
              </div>
            </div>
          </header>
          
          
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
              <div className="prose prose-lg max-w-none">
                {/* This would be the actual post content, for now we'll just show the excerpt */}
                <p className="lead text-xl">{post.excerpt}</p>
                <p>This is where the full blog content would be displayed. In a real application, this would be rendered from the post.content field, potentially using a rich text renderer like react-markdown.</p>
                <h2>Why Proper Junk Removal Matters</h2>
                <p>Improper disposal of waste doesn't just create eyesores; it can have serious environmental consequences. When junk is disposed of incorrectly, harmful chemicals and materials can leach into soil and water sources, causing pollution and endangering wildlife.</p>
                <h2>Benefits of Professional Junk Removal</h2>
                <ul>
                  <li>Environmental responsibility through proper sorting and disposal</li>
                  <li>Time and energy savings</li>
                  <li>Proper handling of potentially hazardous materials</li>
                  <li>Recycling and donating items when possible</li>
                </ul>
                <p>By choosing a professional junk removal service like Uncle Sam Junk Removal, you're not just clearing space — you're making an environmentally responsible choice.</p>
              </div>
              
              {/* Tags */}
              <div className="mt-10 pt-6 border-t border-gray-200">
                <h3 className="font-medium mb-3">Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags && post.tags.length > 0 ? post.tags.map((tag: string) => (
                    <span 
                      key={tag} 
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  )) : ['Junk Removal', 'Recycling', 'Home Improvement', 'Decluttering'].map((tag) => (
                    <span 
                      key={tag} 
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Share */}
              <div className="mt-8 flex items-center space-x-4">
                <span className="font-medium">Share this article:</span>
                <button aria-label="Share on Facebook" className="text-gray-500 hover:text-brand-navy">
                  <Share2 size={18} />
                </button>
                <button aria-label="Share on Twitter" className="text-gray-500 hover:text-brand-navy">
                  <Share2 size={18} />
                </button>
                <button aria-label="Share on LinkedIn" className="text-gray-500 hover:text-brand-navy">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
            
            
            {/* Sidebar */}
            <aside className="lg:col-span-1" aria-labelledby="popular-articles-heading">
              <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                <h3 id="popular-articles-heading" className="font-bold text-lg mb-4">Popular Articles</h3>
                <div className="space-y-4">
                  <Link to="/blog/dispose-electronic-waste" className="block group">
                    <h4 className="font-medium group-hover:text-brand-red transition-colors">How to Properly Dispose of Electronic Waste</h4>
                    <p className="text-sm text-gray-500">May 2, 2025</p>
                  </Link>
                  <Separator />
                  <Link to="/blog/cost-of-hoarding" className="block group">
                    <h4 className="font-medium group-hover:text-brand-red transition-colors">The Cost of Hoarding: Financial and Emotional Impact</h4>
                    <p className="text-sm text-gray-500">April 25, 2025</p>
                  </Link>
                  <Separator />
                  <Link to="/blog/spring-cleaning-checklist" className="block group">
                    <h4 className="font-medium group-hover:text-brand-red transition-colors">Spring Cleaning: The Ultimate Checklist</h4>
                    <p className="text-sm text-gray-500">March 28, 2025</p>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </article>
        
        {/* Call to Action */}
        <div className="mt-16 bg-brand-navy text-white p-8 rounded-lg" aria-labelledby="cta-heading">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8 text-center md:text-left">
              <h2 id="cta-heading" className="text-2xl font-bold mb-2">Ready to clear your space?</h2>
              <p className="opacity-90">Our professional team is prepared to handle all your junk removal needs</p>
            </div>
            <Button size="lg" className="bg-brand-red hover:bg-brand-red/90" asChild>
              <Link to="/quote">Get a Free Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BlogPostPage;
