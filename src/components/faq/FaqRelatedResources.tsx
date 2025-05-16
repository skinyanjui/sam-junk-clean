
import React from 'react';
import { BookOpen, HelpCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FaqRelatedResources = () => {
  return (
    <div className="mt-16 mb-16 max-w-4xl mx-auto" aria-labelledby="related-resources-heading">
      <h2 id="related-resources-heading" className="text-2xl font-bold text-brand-navy mb-6 text-center">Related Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-brand-gray p-6 rounded-lg">
          <div className="flex items-center mb-3">
            <BookOpen size={24} className="mr-3 text-brand-red" />
            <h3 className="text-xl font-bold">Our Blog</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Check out our blog for helpful tips, guides, and insights on junk removal, decluttering, and sustainable disposal methods.
          </p>
          <Button variant="outline" className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white" asChild>
            <Link to="/blog">Read Articles</Link>
          </Button>
        </div>
        <div className="bg-brand-gray p-6 rounded-lg">
          <div className="flex items-center mb-3">
            <HelpCircle size={24} className="mr-3 text-brand-red" />
            <h3 className="text-xl font-bold">Need a Quote?</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Ready to get rid of your junk? Get a free, no-obligation quote for our professional junk removal services.
          </p>
          <Button className="bg-brand-red hover:bg-opacity-90 text-white" asChild>
            <Link to="/quote">Get a Free Quote</Link>
          </Button>
        </div>
        <div className="bg-brand-gray p-6 rounded-lg">
          <div className="flex items-center mb-3">
            <Search size={24} className="mr-3 text-brand-red" />
            <h3 className="text-xl font-bold">Service Areas</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Find out if we service your area. We cover the entire Tri-State area with our junk removal services.
          </p>
          <Button variant="outline" className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white" asChild>
            <Link to="/locations">Check Coverage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FaqRelatedResources;
