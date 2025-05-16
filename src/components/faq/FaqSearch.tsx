
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui';
import { Button } from '@/components/ui/button';

interface FaqSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FaqSearch = ({ searchQuery, setSearchQuery }: FaqSearchProps) => {
  return (
    <div className="relative max-w-lg mx-auto mb-10">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <Input
        type="text"
        placeholder="Search questions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 py-6 border-gray-300 focus:border-brand-red focus:ring-brand-red rounded-lg"
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          onClick={() => setSearchQuery('')}
        >
          Clear
        </Button>
      )}
    </div>
  );
};

export default FaqSearch;
