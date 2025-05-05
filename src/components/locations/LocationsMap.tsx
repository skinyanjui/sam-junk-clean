
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { serviceLocations } from '@/data/serviceLocations';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with React
const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Coordinates for each service area
const locationCoordinates = {
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

// Group locations by state
const getLocationsByState = () => {
  const grouped: Record<string, Array<{city: string, coords: [number, number]}>> = {};
  
  serviceLocations.forEach(location => {
    if (!grouped[location.name]) {
      grouped[location.name] = [];
    }
    
    location.serviceAreas.forEach(city => {
      const coords = locationCoordinates[city as keyof typeof locationCoordinates];
      if (coords) {
        grouped[location.name].push({ city, coords: coords as [number, number] });
      }
    });
  });
  
  return grouped;
};

// Different colors for each state
const stateColors = {
  'Indiana': '#B22234', // brand-red
  'Kentucky': '#3B9EDC', // brand-blue
  'Illinois': '#6C8E6B'  // brand-green
};

const LocationsMap = () => {
  const { t } = useTranslation();
  const locationsByState = getLocationsByState();
  
  // Center of the Tri-State area
  const mapCenter: [number, number] = [38.0, -87.5];
  const zoom = 8;
  
  useEffect(() => {
    // This useEffect ensures Leaflet's CSS is loaded properly
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="mb-12 bg-brand-gray p-4 rounded-lg">
      <h3 className="text-xl font-bold text-brand-navy mb-4">{t('locations.mapTitle')}</h3>
      <p className="mb-4 text-gray-600">{t('locations.mapDescription')}</p>
      
      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
        <div className="w-full h-96">
          <MapContainer 
            center={mapCenter} 
            zoom={zoom} 
            style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {Object.entries(locationsByState).map(([state, cities]) => (
              cities.map((location, idx) => (
                <Marker 
                  key={`${state}-${location.city}-${idx}`}
                  position={location.coords} 
                  icon={L.divIcon({
                    className: 'custom-marker',
                    html: `<div style="background-color: ${stateColors[state as keyof typeof stateColors] || '#1A1F71'}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>`,
                    iconSize: [16, 16],
                    iconAnchor: [8, 8]
                  })}
                >
                  <Popup>
                    <strong>{location.city}</strong>
                    <br />
                    {state}
                  </Popup>
                </Marker>
              ))
            ))}
          </MapContainer>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        {Object.entries(stateColors).map(([state, color]) => (
          <div key={state} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: color, border: '1px solid white', boxShadow: '0 0 2px rgba(0,0,0,0.3)' }}
            ></div>
            <span className="text-sm">{state}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsMap;
