
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

// Blog post type definition
type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  imageUrl: string;
  slug: string;
};

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample blog posts
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'How to Properly Dispose of Electronic Waste',
      excerpt: 'Learn about the environmental impact of e-waste and how to responsibly dispose of your old electronics.',
      category: 'Tips & Advice',
      date: 'May 2, 2025',
      author: 'Mike Johnson',
      imageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03',
      slug: 'dispose-electronic-waste'
    },
    {
      id: '2',
      title: 'The Cost of Hoarding: Financial and Emotional Impact',
      excerpt: 'Exploring the hidden costs of keeping too much stuff and how decluttering can improve your life.',
      category: 'Lifestyle',
      date: 'April 25, 2025',
      author: 'Sarah Williams',
      imageUrl: 'https://images.unsplash.com/photo-1534653299134-96a171b61581',
      slug: 'cost-of-hoarding'
    },
    {
      id: '3',
      title: 'Commercial Junk Removal: What Businesses Need to Know',
      excerpt: 'A complete guide for businesses looking to efficiently manage office cleanouts and junk disposal.',
      category: 'Business',
      date: 'April 18, 2025',
      author: 'James Rodriguez',
      imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7',
      slug: 'commercial-junk-removal'
    },
    {
      id: '4',
      title: '5 Ways to Reuse and Recycle Household Items',
      excerpt: 'Creative ideas for giving new life to old items instead of throwing them away.',
      category: 'Sustainability',
      date: 'April 10, 2025',
      author: 'Emily Chen',
      imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b',
      slug: 'reuse-recycle-items'
    },
    {
      id: '5',
      title: 'Spring Cleaning: The Ultimate Checklist',
      excerpt: 'Get your home ready for spring with this comprehensive cleaning and decluttering guide.',
      category: 'Tips & Advice',
      date: 'March 28, 2025',
      author: 'Mike Johnson',
      imageUrl: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab',
      slug: 'spring-cleaning-checklist'
    },
    {
      id: '6',
      title: 'The Environmental Impact of Improper Waste Disposal',
      excerpt: 'Understanding how incorrect waste disposal affects our planet and what you can do about it.',
      category: 'Sustainability',
      date: 'March 15, 2025',
      author: 'Lisa Morgan',
      imageUrl: 'https://images.unsplash.com/photo-1610392347604-86b8deafd3e9',
      slug: 'environmental-impact-waste'
    }
  ];

  // Filter posts based on search query
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group posts by category for featured section
  const categories = [...new Set(blogPosts.map(post => post.category))];

  return (
    <PageLayout>
      <SEO 
        title="Blog | Uncle Sam Junk Removal"
        description="Stay informed with the latest tips, advice, and news on junk removal, recycling, and sustainable waste management from Uncle Sam Junk Removal."
        keywords="junk removal blog, waste management tips, decluttering advice, recycling guide, Tri-State area junk removal"
      />

      {/* Hero Section */}
      <section className="py-16 bg-brand-navy text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Uncle Sam's Junk Removal Blog</h1>
            <p className="text-lg md:text-xl opacity-90">
              Expert tips, industry insights, and helpful advice for all your junk removal needs
            </p>
            
            {/* Search Bar */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-300 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-brand-navy mb-8">Featured Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map(post => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-brand-red">{post.category}</span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-brand-navy mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">By {post.author}</span>
                    <Button variant="link" className="text-brand-red p-0" asChild>
                      <Link to={`/blog/${post.slug}`}>Read More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts Section */}
      <section className="py-16 bg-brand-gray">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-brand-navy mb-8">
            {searchQuery ? `Search Results: ${filteredPosts.length} posts found` : 'All Articles'}
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No articles found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search terms or browse all our categories</p>
              <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-brand-red">{post.category}</span>
                      <span className="text-xs text-gray-500">{post.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">{post.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                    <Button variant="link" className="text-brand-red p-0 text-sm" asChild>
                      <Link to={`/blog/${post.slug}`}>Read More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-brand-navy mb-8">Browse by Category</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Button 
                key={index}
                variant="outline" 
                className="border-brand-red text-brand-navy hover:bg-brand-red hover:text-white"
                onClick={() => setSearchQuery(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-gray">
        <div className="container-custom">
          <div className="bg-brand-navy text-white p-8 md:p-12 rounded-xl shadow-lg">
            <div className="md:flex md:justify-between md:items-center">
              <div className="mb-6 md:mb-0 md:pr-8">
                <h2 className="text-3xl font-bold mb-4">Need Junk Removal Services?</h2>
                <p className="text-white/90 text-lg">
                  Contact us today for a free, no-obligation quote. We'll handle the mess so you don't have to.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild 
                  className="bg-brand-red hover:bg-opacity-90 text-white"
                >
                  <Link to="/quote">Get a Free Quote</Link>
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-brand-navy"
                >
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Blog;
