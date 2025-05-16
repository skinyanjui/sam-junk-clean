
import React from 'react';
import { ClipboardList } from 'lucide-react';

const QuoteHeader = () => {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold text-brand-navy flex items-center">
        <ClipboardList className="mr-2 h-7 w-7" />
        Request a Free Quote
      </h2>
      <p className="text-gray-600 mt-1">
        Fill out the form below and we'll get back to you with a custom quote for your junk removal needs.
      </p>
    </div>
  );
};

export default QuoteHeader;
