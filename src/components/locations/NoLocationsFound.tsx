import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, RefreshCw, MapPin, Phone } from 'lucide-react';
import { PHONE_NUMBER, getPhoneLink } from '@/utils/contact-info';

interface NoLocationsFoundProps {
  searchQuery: string;
  onClearSearch: () => void;
}

const NoLocationsFound = ({ searchQuery, onClearSearch }: NoLocationsFoundProps) => {
  return (
    <Card 
      variant="notification" 
      className="max-w-lg mx-auto text-center bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200 shadow-md rounded-xl overflow-hidden"
    >
      <div className="bg-gray-100 py-4 border-b border-gray-200">
        <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 flex items-center justify-center">
          <Search className="text-amber-600" size={20} />
        </div>
      </div>
      
      <CardHeader className="pb-2 pt-4">
        <CardTitle size="md" className="text-xl font-bold text-gray-800">
          No locations found
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-700 mb-3">
          We couldn't find any service areas matching "<strong className="text-amber-700">{searchQuery}</strong>".
        </p>
        <p className="text-sm text-gray-600 mb-5">
          Try searching for a different city, state, or ZIP code, or clear your search to see all available service areas.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={onClearSearch}
            variant="outline"
            className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <RefreshCw size={16} />
            Clear search
          </Button>
          
          <Button
            asChild
            className="flex items-center gap-2 bg-brand-navy hover:bg-brand-navy/90"
          >
            <a href={getPhoneLink(PHONE_NUMBER)}>
              <Phone size={16} />
              Call to check availability
            </a>
          </Button>
        </div>
        
        <div className="mt-5 pt-4 border-t border-gray-200 text-sm text-gray-500">
          <div className="flex items-center justify-center gap-1">
            <MapPin size={14} className="text-brand-red" />
            <span>We're constantly expanding our service areas. Call us for special arrangements.</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoLocationsFound;