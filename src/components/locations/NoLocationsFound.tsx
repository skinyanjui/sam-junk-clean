import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, RefreshCw } from 'lucide-react';

interface NoLocationsFoundProps {
  searchQuery: string;
  onClearSearch: () => void;
}

const NoLocationsFound = ({ searchQuery, onClearSearch }: NoLocationsFoundProps) => {
  return (
    <Card variant="notification" className="max-w-lg mx-auto text-center">
      <CardHeader className="pb-2">
        <CardTitle size="md" className="flex items-center justify-center gap-1">
          <Search className="text-gray-500" size={16} />
          No locations found
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-2">
          We couldn't find any service areas matching "<strong>{searchQuery}</strong>".
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Try searching for a different city, state, or ZIP code, or clear your search to see all available service areas.
        </p>
        <Button 
          onClick={onClearSearch}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw size={16} />
          Clear search
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoLocationsFound;