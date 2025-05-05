
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LocationData } from '@/types/locations';

interface ServiceAreaCardProps {
  location: LocationData;
}

const ServiceAreaCard = ({ location }: ServiceAreaCardProps) => {
  return (
    <Card key={location.id} className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={location.image} 
          alt={`${location.name} Service Area`} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              {location.name}
              {location.isPrimary && (
                <span className="bg-brand-red text-white text-xs px-2 py-1 rounded">Primary Area</span>
              )}
            </CardTitle>
            <CardDescription>Coverage: {location.serviceRadius}</CardDescription>
          </div>
          <MapPin className="text-brand-red" />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <Tabs defaultValue="cities">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cities">Cities Served</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          <TabsContent value="cities" className="pt-4">
            <ul className="grid grid-cols-2 gap-2">
              {location.serviceAreas.map((area, idx) => (
                <li key={idx} className="flex items-center gap-1">
                  <MapPin size={14} className="text-brand-red" />
                  {area}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="contact" className="pt-4">
            <p className="flex items-center gap-2 mb-2">
              <MapPin size={18} className="text-brand-red" />
              Primary Area: {location.primaryCity}
            </p>
            <p className="flex items-center gap-2 mb-2">
              <Phone size={18} className="text-brand-red" />
              {location.contactPhone}
            </p>
            <p className="flex items-center gap-2">
              <Mail size={18} className="text-brand-red" />
              {location.contactEmail}
            </p>
          </TabsContent>
          <TabsContent value="about" className="pt-4">
            <p className="text-gray-600">{location.description}</p>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-brand-red hover:bg-opacity-90">
          <Link to="/quote">Get a Quote</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceAreaCard;
