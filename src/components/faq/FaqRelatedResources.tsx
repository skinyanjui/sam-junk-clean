
import React from 'react';
import { BookOpen, HelpCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

const FaqRelatedResources = () => {
  return (
    <div className="mt-16 mb-16 max-w-4xl mx-auto" aria-labelledby="related-resources-heading">
      <h2 id="related-resources-heading" className="text-2xl font-bold text-brand-navy mb-6 text-center">Related Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="standard" size="md" elevation="sm" className="bg-brand-gray">
          <CardHeader size="md">
            <CardTitle size="md" className="flex items-center">
              <BookOpen size={24} className="mr-3 text-brand-red" />
              Our Blog
            </CardTitle>
          </CardHeader>
          <CardContent size="md">
            <p className="text-gray-600">
              Check out our blog for helpful tips, guides, and insights on junk removal, decluttering, and sustainable disposal methods.
            </p>
          </CardContent>
          <CardFooter size="md">
            <Button variant="outline" className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white" asChild>
              <Link to="/blog">Read Articles</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card variant="standard" size="md" elevation="sm" className="bg-brand-gray">
          <CardHeader size="md">
            <CardTitle size="md" className="flex items-center">
              <HelpCircle size={24} className="mr-3 text-brand-red" />
              Need a Quote?
            </CardTitle>
          </CardHeader>
          <CardContent size="md">
            <p className="text-gray-600">
              Ready to get rid of your junk? Get a free, no-obligation quote for our professional junk removal services.
            </p>
          </CardContent>
          <CardFooter size="md">
            <Button className="bg-brand-red hover:bg-opacity-90 text-white" asChild>
              <Link to="/quote">Get a Free Quote</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card variant="standard" size="md" elevation="sm" className="bg-brand-gray">
          <CardHeader size="md">
            <CardTitle size="md" className="flex items-center">
              <Search size={24} className="mr-3 text-brand-red" />
              Service Areas
            </CardTitle>
          </CardHeader>
          <CardContent size="md">
            <p className="text-gray-600">
              Find out if we service your area. We cover the entire Tri-State area with our junk removal services.
            </p>
          </CardContent>
          <CardFooter size="md">
            <Button variant="outline" className="border-brand-red text-brand-red hover:bg-brand-red hover:text-white" asChild>
              <Link to="/locations">Check Coverage</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default FaqRelatedResources;
