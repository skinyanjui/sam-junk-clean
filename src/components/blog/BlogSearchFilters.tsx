
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface BlogSearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const BlogSearchFilters = ({ searchQuery, setSearchQuery }: BlogSearchFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
      <div className="relative flex-grow max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Search articles..."
          className="pl-10 pr-4 py-2 border-gray-300 focus:border-brand-red"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {searchQuery && (
        <Button 
          variant="outline" 
          onClick={() => setSearchQuery('')}
          className="text-sm"
        >
          Clear
        </Button>
      )}
    </div>
  );
};

export default BlogSearchFilters;
