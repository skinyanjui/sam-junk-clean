
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { blogPosts, relatedLinks } from '@/data/blogData';
import BlogHero from '@/components/blog/BlogHero';
import FeaturedPosts from '@/components/blog/FeaturedPosts';
import AllPosts from '@/components/blog/AllPosts';
import RelatedResources from '@/components/blog/RelatedResources';
import CategoriesSection from '@/components/blog/CategoriesSection';
import BlogCta from '@/components/blog/BlogCta';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');

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
      <FeaturedPosts posts={blogPosts} />
      <AllPosts posts={filteredPosts} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <RelatedResources links={linksWithIcons} />
      <CategoriesSection categories={categories} setSearchQuery={setSearchQuery} />
      <BlogCta />
    </PageLayout>
  );
};

export default Blog;
