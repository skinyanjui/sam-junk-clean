
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoQuestionsFoundProps {
  searchQuery: string;
  onClearSearch: () => void;
}

const NoQuestionsFound = ({ searchQuery, onClearSearch }: NoQuestionsFoundProps) => {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
      <Search size={48} className="mx-auto text-gray-300 mb-4" />
      <h3 className="text-xl font-medium text-gray-700 mb-2">No questions found</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        We couldn't find any questions matching "{searchQuery}". 
        Try using different keywords or browse all categories.
      </p>
      <Button 
        onClick={onClearSearch}
        className="bg-brand-red hover:bg-brand-red/90 text-white"
      >
        Clear Search
      </Button>
    </div>
  );
};

export default NoQuestionsFound;
