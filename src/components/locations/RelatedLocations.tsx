import { Link } from 'react-router-dom';
import { LocationData } from '@/types/locations';

interface RelatedLocationsProps {
  currentLocation: LocationData;
  allLocations: LocationData[];
}

const RelatedLocations = ({ currentLocation, allLocations }: RelatedLocationsProps) => {
  const relatedLocations = allLocations.filter(
    (location) =>
      location.id !== currentLocation.id &&
      location.primaryCity === currentLocation.primaryCity
  );

  if (relatedLocations.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-brand-navy mb-3">
        Other Locations in {currentLocation.primaryCity}
      </h3>
      <div className="flex flex-wrap gap-2">
        {relatedLocations.map((location) => (
          <Link
            key={location.id}
            to={`/locations/${location.name.toLowerCase().replace(/ /g, '-')}`}
            className="text-brand-red hover:underline"
          >
            {location.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedLocations;
