import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';
import { serviceLocations } from '@/data/serviceLocations';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Compass, ZoomIn, ZoomOut, Map as MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LocationsMapProps {
  mapStyle?: 'standard' | 'modern' | 'minimal';
  interactionLevel?: 'basic' | 'enhanced';
  showFilters?: boolean;
}

// Custom marker icons with branded colors and modern styling
const createMarkerIcon = (color: string, size: 'sm' | 'md' | 'lg' = 'md') => {
  const sizeMap = {
    sm: 10,
    md: 14,
    lg: 18
  };

  const iconSize = sizeMap[size];
  const borderWidth = size === 'lg' ? 3 : 2;

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color}; 
        width: ${iconSize}px; 
        height: ${iconSize}px; 
        border-radius: 50%; 
        border: ${borderWidth}px solid white; 
        box-shadow: 0 0 4px rgba(0,0,0,0.3);
        transform-origin: center;
        animation: marker-pulse 2s infinite;
      "></div>
      <style>
        @keyframes marker-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      </style>
    `,
    iconSize: [iconSize + borderWidth * 2, iconSize + borderWidth * 2],
    iconAnchor: [(iconSize + borderWidth * 2) / 2, (iconSize + borderWidth * 2) / 2]
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

// Modern color palette for each state
const stateColors = {
  'Indiana': '#E63946', // modern red
  'Kentucky': '#457B9D', // modern blue
  'Illinois': '#2A9D8F'  // modern teal
};

// Map style configurations
const mapStyles = {
  standard: {
    tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    opacity: 0.9
  },
  modern: {
    tileUrl: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    opacity: 1
  },
  minimal: {
    tileUrl: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    opacity: 0.95
  }
};

// Custom map controls component
const MapControls = ({ onRecenter }: { onRecenter: () => void }) => {
  const map = useMap();

  const handleZoomIn = useCallback(() => {
    map.zoomIn();
  }, [map]);

  const handleZoomOut = useCallback(() => {
    map.zoomOut();
  }, [map]);

  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      <button
        onClick={handleZoomIn}
        className="w-8 h-8 bg-white rounded-md shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
        aria-label="Zoom in"
      >
        <ZoomIn size={18} className="text-gray-700" />
      </button>
      <button
        onClick={handleZoomOut}
        className="w-8 h-8 bg-white rounded-md shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
        aria-label="Zoom out"
      >
        <ZoomOut size={18} className="text-gray-700" />
      </button>
      <button
        onClick={onRecenter}
        className="w-8 h-8 bg-white rounded-md shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
        aria-label="Recenter map"
      >
        <Compass size={18} className="text-gray-700" />
      </button>
    </div>
  );
};

const LocationsMap = ({
  mapStyle = 'modern',
  interactionLevel = 'enhanced',
  showFilters = false
}: LocationsMapProps) => {
  const { t } = useTranslation();
  const [isMapReady, setIsMapReady] = useState(false);
  const [activeState, setActiveState] = useState<string | null>(null);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

  // Center of the Tri-State area
  const mapCenter: [number, number] = [38.0, -87.5];
  const zoom = 8;

  useEffect(() => {
    // This ensures Leaflet's CSS is loaded properly
    setIsMapReady(true);

    // Add custom CSS for modern map styling
    const style = document.createElement('style');
    style.textContent = `
      .leaflet-popup-content-wrapper {
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
      .leaflet-popup-content {
        margin: 12px 16px;
      }
      .modern-popup .leaflet-popup-content-wrapper {
        background: white;
        border-radius: 12px;
        box-shadow: 0 6px 24px rgba(0,0,0,0.15);
      }
      .modern-popup .leaflet-popup-tip {
        background: white;
      }
      .custom-marker {
        transition: transform 0.3s ease;
      }
      .custom-marker:hover {
        transform: scale(1.2);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Prepare city data by state for rendering
  const citiesByState: Record<string, Array<{ city: string, coords: [number, number] }>> = {};

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

  // Handle state filter click
  const handleStateClick = (state: string) => {
    if (activeState === state) {
      setActiveState(null);
    } else {
      setActiveState(state);
    }
  };

  // Handle map recenter
  const handleRecenter = useCallback(() => {
    if (mapInstance) {
      mapInstance.setView(mapCenter, zoom);
    }
  }, [mapInstance]);

  // Create a component to get the map instance
  const MapInitializer = () => {
    const map = useMap();

    useEffect(() => {
      setMapInstance(map);
    }, [map]);

    return null;
  };

  return (
    <Card
      className="overflow-hidden shadow-lg rounded-xl border border-gray-200"
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-brand-navy/10 flex items-center justify-center">
            <MapIcon className="h-5 w-5 text-brand-navy" />
          </div>
          <CardTitle className="text-xl font-bold">{t('locations.mapTitle')}</CardTitle>
        </div>
        <p className="text-base text-gray-600 leading-relaxed">
          Our service coverage spans across the entire Tri-State area, including cities in Indiana, Kentucky, and Illinois.
          Explore the map to see all the areas we serve.
        </p>

        {showFilters && (
          <div className="flex flex-wrap gap-2 mt-3">
            {Object.entries(stateColors).map(([state, color]) => (
              <Button
                key={state}
                variant="outline"
                size="sm"
                className={`
                  rounded-full px-4 border-2 transition-all duration-300
                  ${activeState === state
                    ? `border-${state.toLowerCase()}-500 bg-${state.toLowerCase()}-50 text-${state.toLowerCase()}-700`
                    : 'border-gray-200 hover:border-gray-300'}
                `}
                onClick={() => handleStateClick(state)}
              >
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: color, boxShadow: '0 0 2px rgba(0,0,0,0.3)' }}
                ></div>
                {state}
              </Button>
            ))}
            {activeState && (
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setActiveState(null)}
              >
                Clear filter
              </Button>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <div className="w-full">
          <div className="w-full h-[450px] relative">
            {isMapReady && (
              <MapContainer
                center={mapCenter}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={interactionLevel === 'enhanced'}
                zoomControl={false}
                attributionControl={false}
                className="z-10"
              >
                <MapInitializer />
                <TileLayer
                  attribution={mapStyles[mapStyle].attribution}
                  url={mapStyles[mapStyle].tileUrl}
                  opacity={mapStyles[mapStyle].opacity}
                />

                {/* Render service area polygons */}
                {Object.entries(serviceAreaPolygons).map(([state, coordinates]) => {
                  // Skip if filtering and this is not the active state
                  if (activeState && activeState !== state) return null;

                  return (
                    <Polygon
                      key={`polygon-${state}`}
                      positions={coordinates as [number, number][]}
                      pathOptions={{
                        fillColor: stateColors[state as keyof typeof stateColors] || '#1A1F71',
                        fillOpacity: 0.25,
                        weight: 3,
                        color: stateColors[state as keyof typeof stateColors] || '#1A1F71',
                        opacity: 0.9,
                        dashArray: interactionLevel === 'enhanced' ? '5, 8' : '3, 5'
                      }}
                      eventHandlers={{
                        mouseover: (e) => {
                          if (interactionLevel === 'enhanced') {
                            const layer = e.target;
                            layer.setStyle({
                              fillOpacity: 0.4,
                              weight: 4
                            });
                          }
                        },
                        mouseout: (e) => {
                          if (interactionLevel === 'enhanced') {
                            const layer = e.target;
                            layer.setStyle({
                              fillOpacity: 0.25,
                              weight: 3
                            });
                          }
                        }
                      }}
                    >
                      <Popup className="modern-popup">
                        <div className="text-center p-2">
                          <div className="font-bold text-lg mb-1">{state} Service Area</div>
                          <div className="text-sm text-gray-600 mb-2">
                            {serviceLocations.find(loc => loc.name === state)?.serviceRadius}
                          </div>
                          <div
                            className="text-xs py-1 px-2 rounded-full inline-block"
                            style={{
                              backgroundColor: `${stateColors[state as keyof typeof stateColors]}20`,
                              color: stateColors[state as keyof typeof stateColors]
                            }}
                          >
                            {citiesByState[state]?.length || 0} cities served
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  );
                })}

                {/* Render city markers */}
                {Object.entries(citiesByState).map(([state, cities]) => {
                  // Skip if filtering and this is not the active state
                  if (activeState && activeState !== state) return null;

                  return cities.map((location, idx) => (
                    <Marker
                      key={`${state}-${location.city}-${idx}`}
                      position={location.coords}
                      icon={createMarkerIcon(
                        stateColors[state as keyof typeof stateColors] || '#1A1F71',
                        interactionLevel === 'enhanced' ? 'md' : 'sm'
                      )}
                    >
                      <Popup className="modern-popup">
                        <div className="p-1">
                          <div className="font-medium text-gray-900 text-base mb-1">{location.city}</div>
                          <div
                            className="text-xs py-1 px-2 rounded-full inline-block"
                            style={{
                              backgroundColor: `${stateColors[state as keyof typeof stateColors]}20`,
                              color: stateColors[state as keyof typeof stateColors]
                            }}
                          >
                            {state}
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ));
                })}

                {/* Custom map controls */}
                {interactionLevel === 'enhanced' && (
                  <MapControls onRecenter={handleRecenter} />
                )}
              </MapContainer>
            )}
          </div>
        </div>

        <div className="p-5 flex flex-wrap gap-4 justify-center bg-gray-50 border-t border-gray-100">
          {Object.entries(stateColors).map(([state, color]) => (
            <div key={state} className="flex items-center">
              <div
                className="w-4 h-4 rounded-full mr-2 border-2 border-white"
                style={{
                  backgroundColor: color,
                  boxShadow: '0 0 3px rgba(0,0,0,0.2)'
                }}
              ></div>
              <span className="text-sm font-medium text-gray-700">{state}</span>
              <span className="text-xs text-gray-500 ml-1">
                ({citiesByState[state]?.length || 0} cities)
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationsMap;