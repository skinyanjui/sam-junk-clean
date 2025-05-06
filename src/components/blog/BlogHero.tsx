
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface BlogHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const BlogHero = ({ searchQuery, setSearchQuery }: BlogHeroProps) => {
  return (
    <section className="pt-24 py-16 bg-brand-navy text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Uncle Sam's Junk Removal Blog</h1>
          <p className="text-lg md:text-xl opacity-90">
            Expert tips, industry insights, and helpful advice for all your junk removal needs
          </p>
          
          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-3 mt-4 mb-6">
            <Link to="/faq" className="text-white hover:text-brand-red transition-colors">
              FAQ
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/services" className="text-white hover:text-brand-red transition-colors">
              Services
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/quote" className="text-white hover:text-brand-red transition-colors">
              Get a Quote
            </Link>
          </div>
          
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
  );
};

export default BlogHero;
