
import { Link } from 'react-router-dom';
import { Search, BookOpen, Info, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';

interface BlogHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const BlogHero = ({ searchQuery, setSearchQuery }: BlogHeroProps) => {
  return (
    <section className="hero-section bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white relative overflow-hidden" aria-labelledby="blog-heading">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-brand-red"></div>
        <div className="absolute top-40 right-10 w-32 h-32 rounded-full bg-white"></div>
        <div className="absolute bottom-10 left-1/4 w-48 h-48 rounded-full bg-brand-red"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 id="blog-heading" className="text-4xl md:text-5xl font-bold mb-6">
            Junk Removal Tips & Resources
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Expert advice, how-to guides, and industry insights to help you declutter your space and make environmentally responsible disposal choices.
          </p>
          
          {/* Quick links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10" aria-label="Blog quick links">
            <Link to="/about" className="flex items-center text-white hover:text-brand-red transition-colors" aria-label="Learn about our company">
              <Info size={18} className="mr-2" />
              <span>About Us</span>
            </Link>
            <Link to="/services" className="flex items-center text-white hover:text-brand-red transition-colors" aria-label="View our services">
              <BookOpen size={18} className="mr-2" />
              <span>Our Services</span>
            </Link>
            <Link to="/quote" className="flex items-center text-white hover:text-brand-red transition-colors" aria-label="Get a quote">
              <Users size={18} className="mr-2" />
              <span>Get a Quote</span>
            </Link>
          </nav>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <Input 
                type="text"
                placeholder="Search for tips, guides, and more..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-300 w-full focus:ring-brand-red focus:border-brand-red rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search blog articles"
              />
            </div>
            <p className="text-xs mt-2 text-gray-300">
              Try searching for topics like "recycling", "decluttering", or "spring cleaning"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogHero;
