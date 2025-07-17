import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LocationData } from '@/types/locations';
import { PHONE_NUMBER, getPhoneLink, formatPhoneNumber } from '@/utils/contact-info';

interface ServiceAreaCardProps {
  location: LocationData;
}

const ServiceAreaCard = ({ location }: ServiceAreaCardProps) => {
  // Use the location's phone if available, otherwise use default
  const phoneNumber = location.contactPhone || PHONE_NUMBER;
  const formattedPhone = formatPhoneNumber(phoneNumber);

  return (
    <Card
      variant="interactive"
      size="md"
      elevation="sm"
      interactive={true}
      hasImage={true}
      hasTabs={true}
      className="overflow-hidden hover:shadow-md transition-shadow h-full"
      role="region"
      ariaLabel={`${location.name} service area information`}
    >
      <div className="h-40 overflow-hidden">
        <img
          src={location.image}
          alt={`${location.name} Service Area`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <CardHeader size="md" className="pb-1">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle size="md" className="flex items-center gap-1">
              {location.name}
              {location.isPrimary && (
                <span className="bg-brand-red text-white text-xs px-1.5 py-0.5 rounded">Primary</span>
              )}
            </CardTitle>
            <CardDescription size="md">Coverage: {location.serviceRadius}</CardDescription>
          </div>
          <MapPin className="text-brand-red" size={16} />
        </div>
      </CardHeader>
      <CardContent size="md" className="pb-1">
        <Tabs defaultValue="cities" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-8">
            <TabsTrigger value="cities" className="text-xs">Cities</TabsTrigger>
            <TabsTrigger value="contact" className="text-xs">Contact</TabsTrigger>
            <TabsTrigger value="about" className="text-xs">About</TabsTrigger>
          </TabsList>
          <TabsContent value="cities" className="pt-2 min-h-[90px]">
            <ul className="grid grid-cols-2 gap-1 text-sm">
              {location.serviceAreas.slice(0, 6).map((area, idx) => (
                <li key={idx} className="flex items-center gap-1">
                  <MapPin size={12} className="text-brand-red flex-shrink-0" />
                  <span className="truncate">{area}</span>
                </li>
              ))}
              {location.serviceAreas.length > 6 && (
                <li className="col-span-2 text-center text-xs text-gray-500 mt-1">
                  +{location.serviceAreas.length - 6} more areas
                </li>
              )}
            </ul>
          </TabsContent>
          <TabsContent value="contact" className="pt-2 min-h-[90px]">
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-1">
                <MapPin size={12} className="text-brand-red flex-shrink-0" />
                <span>{location.primaryCity}</span>
              </p>
              <p className="flex items-center gap-1">
                <Phone size={12} className="text-brand-red flex-shrink-0" />
                <a
                  href={getPhoneLink(phoneNumber)}
                  className="hover:text-brand-red transition-colors"
                  aria-label={`Call ${formattedPhone}`}
                >
                  {formattedPhone}
                </a>
              </p>
              <p className="flex items-center gap-1">
                <Mail size={12} className="text-brand-red flex-shrink-0" />
                <a
                  href={`mailto:${location.contactEmail}`}
                  className="hover:text-brand-red transition-colors truncate"
                >
                  {location.contactEmail}
                </a>
              </p>
            </div>
          </TabsContent>
          <TabsContent value="about" className="pt-2 min-h-[90px]">
            <p className="text-sm text-gray-600 line-clamp-4">{location.description}</p>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter size="md" className="flex flex-col sm:flex-row gap-2 mt-auto">
        <Button asChild className="w-full bg-brand-red hover:bg-opacity-90 text-sm h-9">
          <Link to="/quote">Get a Quote</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="w-full border-brand-red text-brand-red hover:bg-brand-red hover:text-white text-sm h-9"
        >
          <a href={getPhoneLink(phoneNumber)} className="flex items-center justify-center">
            <Phone size={14} className="mr-1" />
            Call Now
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceAreaCard;