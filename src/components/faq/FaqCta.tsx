
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

const FaqCta = () => {
  return (
    <Card 
      variant="featured" 
      size="lg" 
      elevation="md"
      gradient={true}
      className="mt-16 max-w-4xl mx-auto text-white"
      aria-labelledby="still-have-questions-heading"
    >
      <CardHeader size="lg">
        <CardTitle id="still-have-questions-heading" size="lg" className="text-center text-white">
          Still have questions?
        </CardTitle>
      </CardHeader>
      
      <CardContent size="lg" className="text-center">
        <p className="mb-6">
          Our team is here to help with any questions you may have about our junk removal services.
        </p>
      </CardContent>
      
      <CardFooter size="lg" className="justify-center">
        <Link 
          to="/contact" 
          className="bg-brand-red hover:bg-opacity-90 text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          Contact Us
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FaqCta;
