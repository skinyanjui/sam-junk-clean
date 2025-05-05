import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { Search, Calendar, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Blog post data
  const blogPosts = [
    {
      id: 1,
      title: "10 Items You Should Never Throw in the Trash",
      excerpt: "Certain items require special disposal methods to protect the environment and comply with regulations. Here are 10 items that should never go in your regular trash.",
      date: "May 2, 2025",
      author: "Captain America",
      category: "Environmental Tips",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      slug: "10-items-never-throw-in-trash"
    },
    {
      id: 2,
      title: "The Ultimate Guide to Decluttering Your Garage",
      excerpt: "Is your garage packed with years of accumulated stuff? Follow our step-by-step guide to reclaim your space and organize what remains.",
      date: "April 28, 2025",
      author: "Sergeant Storage",
      category: "Organization",
      image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      slug: "ultimate-guide-decluttering-garage"
    },
    {
      id: 3,
      title: "How Junk Removal Services Are Becoming More Eco-Friendly",
      excerpt: "The junk removal industry is evolving to prioritize sustainability. Learn about the innovative ways companies like ours are reducing environmental impact.",
      date: "April 15, 2025",
      author: "General Green",
      category: "Industry News",
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      slug: "eco-friendly-junk-removal"
    },
    {
      id: 4,
      title: "Preparing for a Home Renovation? Here's How to Handle the Debris",
      excerpt: "Home renovations create a lot of waste and debris. Plan ahead with these tips for efficient waste management during your next home improvement project.",
      date: "April 5, 2025",
      author: "Major Makeover",
      category: "Home Improvement",
      image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      slug: "handle-renovation-debris"
    }
  ];

  // Categories extracted from blog posts for the sidebar
  const categories = [...new Set(blogPosts.map(post => post.category))];

  // Filter blog posts based on search term
  const filteredPosts = blogPosts.filter(
    post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageLayout>
      <SEO 
        title="Blog | Uncle Sam Junk Removal Tips & News"
        description="Stay informed with the latest junk removal tips, organization hacks, and industry news from Uncle Sam Junk Removal's blog."
        keywords="junk removal blog, decluttering tips, organization hacks, eco-friendly disposal, Tri-State area junk removal, Uncle Sam Junk Removal"
      />

      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-brand-navy mb-4">Uncle Sam's Junk Removal Blog</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover tips, tricks, and insights about junk removal, organization, and sustainable living.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {/* Search Results Count */}
              {searchTerm && (
                <div className="mb-6">
                  <p className="text-gray-600">
                    Showing {filteredPosts.length} results for "{searchTerm}"
                  </p>
                </div>
              )}

              {/* Blog Post List */}
              <div className="space-y-8">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map(post => (
                    <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-w-16 aspect-h-9">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-64 object-cover"
                        />
                      </div>
                      <CardHeader>
                        <Badge className="mb-2 w-fit bg-brand-navy hover:bg-brand-navy/90">{post.category}</Badge>
                        <CardTitle className="text-2xl">
                          <Link to={`/blog/${post.slug}`} className="hover:text-brand-red transition-colors">
                            {post.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="flex items-center gap-4 text-sm">
                          <span className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            {post.date}
                          </span>
                          <span className="flex items-center">
                            <User size={14} className="mr-1" />
                            {post.author}
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{post.excerpt}</p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild variant="outline" className="hover:text-brand-red hover:border-brand-red transition-colors">
                          <Link to={`/blog/${post.slug}`}>
                            Read More
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No blog posts found matching your search.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setSearchTerm("")}
                    >
                      Clear Search
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Search Box */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold text-brand-navy mb-4">Search</h2>
                <div className="flex items-center border rounded-md overflow-hidden">
                  <Input 
                    type="text" 
                    placeholder="Search articles..." 
                    className="border-0 flex-1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="ghost" className="px-3" onClick={() => setSearchTerm("")}>
                    <Search size={18} />
                  </Button>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold text-brand-navy mb-4">Categories</h2>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      className="mr-2 mb-2"
                      onClick={() => setSearchTerm(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* CTA Box */}
              <div className="bg-brand-navy text-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Need Junk Removed?</h2>
                <p className="mb-4">Let Uncle Sam take care of your junk removal needs!</p>
                <Button asChild className="w-full bg-brand-red hover:bg-opacity-90">
                  <Link to="/quote">Get a Free Quote</Link>
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
