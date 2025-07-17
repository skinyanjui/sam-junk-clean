import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LocationData } from '@/types/locations';
import { PHONE_NUMBER, getPhoneLink, formatPhoneNumber } from '@/utils/contact-info';
import { useState } from 'react';

interface ServiceAreaCardProps {
  location: LocationData;
  variant?: 'standard' | 'featured';
  animationLevel?: 'subtle' | 'moderate';
}

const ServiceAreaCard = ({ 
  location, 
  variant = 'standard', 
  animationLevel = 'subtle' 
}: ServiceAreaCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Use the location's phone if available, otherwise use default
  const phoneNumber = location.contactPhone || PHONE_NUMBER;
  const formattedPhone = formatPhoneNumber(phoneNumber);
  
  // Determine if this is a featured location
  const isFeatured = variant === 'featured' || location.isPrimary;

  return (
    <Card
      variant="interactive"
      size="md"
      elevation={isFeatured ? "md" : "sm"}
      interactive={true}
      hasImage={true}
      hasTabs={true}
      className={`
        overflow-hidden h-full group
        ${isFeatured ? 'border-brand-red/20 bg-gradient-to-br from-white to-brand-red/5' : ''}
        ${animationLevel === 'moderate' 
          ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-500' 
          : 'hover:shadow-md hover:-translate-y-0.5 transition-all duration-300'}
      `}
      role="region"
      ariaLabel={`${location.name} service area information`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={location.image}
          alt={`${location.name} Service Area`}
          className={`
            w-full h-full object-cover 
            ${animationLevel === 'moderate' 
              ? 'group-hover:scale-110 transition-transform duration-700 ease-out' 
              : 'group-hover:scale-105 transition-transform duration-500'}
          `}
        />
        {isFeatured && (
          <div className="absolute top-0 right-0 bg-gradient-to-l from-brand-red to-brand-red/80 text-white py-1 px-3 rounded-bl-lg shadow-md flex items-center gap-1">
            <Star size={14} className="fill-white" />
            <span className="text-xs font-medium">Featured Area</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 text-white">
            <p className="font-medium text-sm">Serving {location.serviceAreas.length} cities in this area</p>
          </div>
        </div>
      </div>
      
      <CardHeader size="md" className="pb-2 relative">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle size="md" className="flex items-center gap-2 text-xl font-bold">
              {location.name}
              {location.isPrimary && (
                <span className="bg-brand-red text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
                  Primary
                </span>
              )}
            </CardTitle>
            <CardDescription size="md" className="text-sm mt-1 flex items-center gap-1">
              <MapPin size={14} className="text-brand-red" />
              Coverage: <span className="font-medium text-gray-700">{location.serviceRadius}</span>
            </CardDescription>
          </div>
          <div className={`
            w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center
            ${isFeatured ? 'bg-brand-red/20' : ''}
            ${isHovered ? 'bg-brand-red/30' : ''}
            transition-colors duration-300
          `}>
            <MapPin 
              className={`
                ${isFeatured ? 'text-brand-red' : 'text-brand-red/80'}
                ${isHovered ? 'scale-110' : 'scale-100'}
                transition-transform duration-300
              `} 
              size={18} 
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent size="md" className="pb-2">
        <Tabs defaultValue="cities" className="w-full">
          <TabsList className={`
            grid w-full grid-cols-3 h-9 rounded-lg bg-gray-100/80
            ${isFeatured ? 'bg-brand-red/10' : ''}
          `}>
            <TabsTrigger 
              value="cities" 
              className="text-sm rounded-md data-[state=active]:bg-white data-[state=active]:text-brand-red data-[state=active]:shadow-sm"
            >
              Cities
            </TabsTrigger>
            <TabsTrigger 
              value="contact" 
              className="text-sm rounded-md data-[state=active]:bg-white data-[state=active]:text-brand-red data-[state=active]:shadow-sm"
            >
              Contact
            </TabsTrigger>
            <TabsTrigger 
              value="about" 
              className="text-sm rounded-md data-[state=active]:bg-white data-[state=active]:text-brand-red data-[state=active]:shadow-sm"
            >
              About
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="cities" className="pt-3 min-h-[100px]">
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {location.serviceAreas.slice(0, 6).map((area, idx) => (
                <li key={idx} className="flex items-center gap-1.5 group/item">
                  <div className="w-5 h-5 rounded-full bg-brand-red/10 flex items-center justify-center group-hover/item:bg-brand-red/20 transition-colors">
                    <MapPin size={12} className="text-brand-red flex-shrink-0" />
                  </div>
                  <span className="truncate group-hover/item:text-brand-red transition-colors">{area}</span>
                </li>
              ))}
              {location.serviceAreas.length > 6 && (
                <li className="col-span-2 text-center text-xs text-gray-500 mt-2 bg-gray-50 py-1 rounded-md">
                  +{location.serviceAreas.length - 6} more areas
                </li>
              )}
            </ul>
          </TabsContent>
          
          <TabsContent value="contact" className="pt-3 min-h-[100px]">
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-brand-red/10 flex items-center justify-center">
                  <MapPin size={14} className="text-brand-red flex-shrink-0" />
                </div>
                <span className="font-medium">{location.primaryCity}</span>
              </p>
              <p className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-brand-red/10 flex items-center justify-center">
                  <Phone size={14} className="text-brand-red flex-shrink-0" />
                </div>
                <a
                  href={getPhoneLink(phoneNumber)}
                  className="hover:text-brand-red transition-colors font-medium"
                  aria-label={`Call ${formattedPhone}`}
                >
                  {formattedPhone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-brand-red/10 flex items-center justify-center">
                  <Mail size={14} className="text-brand-red flex-shrink-0" />
                </div>
                <a
                  href={`mailto:${location.contactEmail}`}
                  className="hover:text-brand-red transition-colors truncate font-medium"
                >
                  {location.contactEmail}
                </a>
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="about" className="pt-3 min-h-[100px]">
            <p className="text-sm text-gray-700 line-clamp-4 leading-relaxed">
              {location.description}
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter size="md" className="flex flex-col sm:flex-row gap-2 mt-auto pt-3 border-t border-gray-100">
        <Button 
          asChild 
          className={`
            w-full text-sm h-10 rounded-lg font-medium shadow-sm
            ${isFeatured 
              ? 'bg-gradient-to-r from-brand-red to-brand-red/90 hover:from-brand-red/90 hover:to-brand-red' 
              : 'bg-brand-red hover:bg-opacity-90'}
            transition-all duration-300 group/btn
          `}
        >
          <Link to="/quote" className="flex items-center justify-center">
            Get a Free Quote
            <ArrowRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="w-full border-brand-red text-brand-red hover:bg-brand-red hover:text-white text-sm h-10 rounded-lg font-medium shadow-sm transition-all duration-300"
        >
          <a href={getPhoneLink(phoneNumber)} className="flex items-center justify-center">
            <Phone size={16} className="mr-1.5" />
            Call Now
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceAreaCard;