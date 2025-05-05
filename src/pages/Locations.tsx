import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Locations = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Service areas data
  const locations = [
    {
      id: 1,
      name: "Evansville",
      state: "IN",
      isPrimary: true,
      address: "123 Main Street, Evansville, IN 47715",
      phone: "(800) 555-1234",
      email: "evansville@unclesamjunk.com",
      serviceRadius: "30 miles",
      serviceAreas: [
        "Newburgh, IN", 
        "Henderson, KY",
        "Boonville, IN",
        "Princeton, IN"
      ],
      description: "Our headquarters and main service center, serving the entire Evansville metro area and surrounding communities.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 2,
      name: "Owensboro",
      state: "KY",
      isPrimary: false,
      address: "456 State Road, Owensboro, KY 42303",
      phone: "(800) 555-5678",
      email: "owensboro@unclesamjunk.com",
      serviceRadius: "25 miles",
      serviceAreas: [
        "Philpot, KY", 
        "Maceo, KY",
        "Whitesville, KY",
        "Lewisport, KY"
      ],
      description: "Servicing Kentucky's third-largest city and the surrounding communities with professional junk removal.",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 3,
      name: "Mt. Carmel",
      state: "IL",
      isPrimary: false,
      address: "789 Oak Avenue, Mt. Carmel, IL 62863",
      phone: "(800) 555-9012",
      email: "mtcarmel@unclesamjunk.com",
      serviceRadius: "20 miles",
      serviceAreas: [
        "Grayville, IL", 
        "Fairfield, IL",
        "Carmi, IL",
        "Albion, IL"
      ],
      description: "Our Illinois service center, helping residents and businesses in Mt. Carmel and surrounding communities with all their junk removal needs.",
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
    }
  ];

  // Filter locations based on search term
  const filteredLocations = locations.filter(
    location => 
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      location.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (location.serviceAreas && location.serviceAreas.some(area => 
        area.toLowerCase().includes(searchTerm.toLowerCase())
      ))
  );

  return (
    <PageLayout>
      <SEO 
        title="Service Locations | Uncle Sam Junk Removal"
        description="Uncle Sam Junk Removal proudly serves the Tri-State area including Evansville, IN, Owensboro, KY, and Mt. Carmel, IL. Find your local junk removal team."
        keywords="junk removal Evansville, junk removal Owensboro, junk removal Mt. Carmel, Tri-State area junk removal, Henderson junk removal, Princeton junk removal"
      />

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-brand-navy mb-4">Our Service Locations</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Uncle Sam Junk Removal proudly serves communities throughout the Tri-State area. 
              Find the service location nearest to you.
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-md mx-auto mb-12">
            <div className="flex items-center border rounded-md overflow-hidden shadow-sm">
              <Input 
                type="text" 
                placeholder="Search by city, state, or ZIP code..." 
                className="border-0 flex-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="ghost" className="px-3" onClick={() => setSearchTerm("")}>
                <Search size={18} />
              </Button>
            </div>
            {searchTerm && (
              <p className="text-sm text-gray-500 mt-2">
                Showing {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Map Section */}
          <div className="mb-12 bg-brand-gray p-4 rounded-lg">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              {/* Replace with an actual map component or iframe in a real implementation */}
              <div className="w-full h-96 bg-brand-navy/10 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-brand-red mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-brand-navy">Interactive Map</h3>
                  <p className="text-gray-600">Map showing our service locations in the Tri-State area</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLocations.map((location) => (
              <Card key={location.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={location.image} 
                    alt={`${location.name}, ${location.state}`} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        {location.name}, {location.state}
                        {location.isPrimary && (
                          <span className="bg-brand-red text-white text-xs px-2 py-1 rounded">Headquarters</span>
                        )}
                      </CardTitle>
                      <CardDescription>Service Radius: {location.serviceRadius}</CardDescription>
                    </div>
                    <MapPin className="text-brand-red" />
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <Tabs defaultValue="contact">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="contact">Contact</TabsTrigger>
                      <TabsTrigger value="areas">Areas Served</TabsTrigger>
                      <TabsTrigger value="about">About</TabsTrigger>
                    </TabsList>
                    <TabsContent value="contact" className="pt-4">
                      <p className="flex items-center gap-2 mb-2">
                        <MapPin size={18} className="text-brand-red" />
                        {location.address}
                      </p>
                      <p className="flex items-center gap-2 mb-2">
                        <Phone size={18} className="text-brand-red" />
                        {location.phone}
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail size={18} className="text-brand-red" />
                        {location.email}
                      </p>
                    </TabsContent>
                    <TabsContent value="areas" className="pt-4">
                      <ul className="grid grid-cols-2 gap-2">
                        {location.serviceAreas.map((area, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <MapPin size={14} className="text-brand-red" />
                            {area}
                          </li>
                        ))}
                      </ul>
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
            ))}
          </div>

          {/* No locations found message */}
          {filteredLocations.length === 0 && (
            <div className="text-center py-12 bg-brand-gray/50 rounded-lg">
              <MapPin size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-bold text-brand-navy mb-2">No locations found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any service areas matching "{searchTerm}". 
                Please try another search or call us to check if we service your area.
              </p>
              <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
            </div>
          )}
        </div>
      </section>

      {/* ZIP Code Lookup Section */}
      <section className="py-16 bg-brand-gray">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">Check If We Service Your Area</h2>
            <p className="text-lg text-gray-600">
              Enter your ZIP code to see if Uncle Sam Junk Removal serves your area.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <Input 
                type="text" 
                placeholder="Enter ZIP code" 
                className="flex-1"
                maxLength={5}
              />
              <Button className="bg-brand-navy hover:bg-opacity-90">Check</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-navy text-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-white/90">
              Contact your nearest Uncle Sam Junk Removal location today for a free, no-obligation quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-brand-red hover:bg-opacity-90">
                <Link to="/quote">Request a Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-brand-navy">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Locations;
