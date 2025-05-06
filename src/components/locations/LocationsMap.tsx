import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup, Polygon, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import { serviceLocations } from '@/data/serviceLocations';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

// Custom marker icons with branded colors
const createMarkerIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

// Coordinates for each service area
const locationCoordinates: Record<string, [number, number]> = {
  // Indiana locations
  'Evansville': [37.9748, -87.5558],
  'Newburgh': [37.9445, -87.4053],
  'Boonville': [38.0492, -87.2742],
  'Princeton': [38.3556, -87.5675],
  'Vincennes': [38.6773, -87.5286],
  'Mt. Vernon': [37.9322, -87.8953],
  'Washington': [38.6595, -87.1733],
  'Jasper': [38.3914, -86.9311],
  
  // Kentucky locations
  'Owensboro': [37.7719, -87.1111],
  'Henderson': [37.8361, -87.5900],
  'Madisonville': [37.3281, -87.4989],
  'Calhoun': [37.5425, -87.2589],
  'Hartford': [37.4514, -86.9092],
  'Central City': [37.2939, -87.1233],
  'Beaver Dam': [37.4053, -86.8778],
  'Hawesville': [37.9003, -86.7547],
  
  // Illinois locations
  'Mt. Carmel': [38.4109, -87.7614],
  'Grayville': [38.2580, -87.9957],
  'Fairfield': [38.3789, -88.3598],
  'Carmi': [38.0906, -88.1585],
  'Albion': [38.3776, -88.0564],
  'Crossville': [38.1644, -88.0686],
  'West Salem': [38.5214, -88.0139],
  'Olney': [38.7309, -88.0856]
};

// Service area coverage polygons (approximate)
const serviceAreaPolygons = {
  'Indiana': [
    [38.8, -87.9], // Northwest corner
    [38.8, -86.8], // Northeast corner
    [37.7, -86.8], // Southeast corner
    [37.7, -87.9], // Southwest corner
  ],
  'Kentucky': [
    [37.9, -87.7], // Northwest corner
    [37.9, -86.5], // Northeast corner
    [37.0, -86.5], // Southeast corner
    [37.0, -87.7], // Southwest corner
  ],
  'Illinois': [
    [38.8, -88.5], // Northwest corner
    [38.8, -87.6], // Northeast corner
    [37.9, -87.6], // Southeast corner
    [37.9, -88.5], // Southwest corner
  ]
};

// Different colors for each state
const stateColors = {
  'Indiana': '#B22234', // brand-red
  'Kentucky': '#3B9EDC', // brand-blue
  'Illinois': '#6C8E6B'  // brand-green
};

const LocationsMap = () => {
  const { t } = useTranslation();
  const [isMapReady, setIsMapReady] = useState(false);
  
  // Center of the Tri-State area
  const mapCenter: [number, number] = [38.0, -87.5];
  const zoom = 8;
  
  useEffect(() => {
    // This ensures Leaflet's CSS is loaded properly
    setIsMapReady(true);
    return () => {
      // Cleanup if needed
    };
  }, []);

  // Prepare city data by state for rendering
  const citiesByState: Record<string, Array<{city: string, coords: [number, number]}>> = {};
  
  serviceLocations.forEach(location => {
    if (!citiesByState[location.name]) {
      citiesByState[location.name] = [];
    }
    
    location.serviceAreas.forEach(city => {
      const coords = locationCoordinates[city as keyof typeof locationCoordinates];
      if (coords) {
        citiesByState[location.name].push({ city, coords });
      }
    });
  });

  return (
    <div className="mb-12 bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-brand-navy mb-4">{t('locations.mapTitle')}</h3>
      <p className="mb-6 text-gray-600 max-w-3xl">
        Our service coverage spans across the entire Tri-State area, including cities in Indiana, Kentucky, and Illinois. Explore the map below to see if we serve your area.
      </p>
      
      <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden border border-gray-100">
        <div className="w-full h-[500px]">
          {isMapReady && (
            <MapContainer 
              center={mapCenter} 
              zoom={zoom} 
              style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
              scrollWheelZoom={false}
              zoomControl={true}
              attributionControl={false}
              className="z-10"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                className="opacity-90"
              />
              
              {/* Render service area polygons */}
              {Object.entries(serviceAreaPolygons).map(([state, coordinates]) => (
                <Polygon
                  key={`polygon-${state}`}
                  positions={coordinates as [number, number][]}
                  pathOptions={{
                    fillColor: stateColors[state as keyof typeof stateColors] || '#1A1F71',
                    fillOpacity: 0.2,
                    weight: 2,
                    color: stateColors[state as keyof typeof stateColors] || '#1A1F71',
                    opacity: 0.8,
                    dashArray: '5, 5'
                  }}
                >
                  <Popup>
                    <div className="text-center p-2">
                      <div className="font-bold text-lg">{state} Service Area</div>
                      <div className="text-sm text-gray-600">
                        {serviceLocations.find(loc => loc.name === state)?.serviceRadius}
                      </div>
                    </div>
                  </Popup>
                </Polygon>
              ))}
              
              {/* Render city markers */}
              {Object.entries(citiesByState).map(([state, cities]) => (
                cities.map((location, idx) => (
                  <Marker 
                    key={`${state}-${location.city}-${idx}`}
                    position={location.coords} 
                    icon={createMarkerIcon(stateColors[state as keyof typeof stateColors] || '#1A1F71')}
                  >
                    <Popup className="custom-popup">
                      <div className="font-medium text-brand-navy">{location.city}</div>
                      <div className="text-sm text-gray-600">{state}</div>
                    </Popup>
                  </Marker>
                ))
              ))}
            </MapContainer>
          )}
        </div>
      </div>
      
      <div className="mt-6 flex flex-wrap gap-6 justify-center">
        {Object.entries(stateColors).map(([state, color]) => (
          <div key={state} className="flex items-center">
            <div 
              className="w-4 h-4 rounded-full mr-2" 
              style={{ backgroundColor: color, border: '2px solid white', boxShadow: '0 0 3px rgba(0,0,0,0.3)' }}
            ></div>
            <span className="text-gray-700 font-medium">{state}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsMap;
