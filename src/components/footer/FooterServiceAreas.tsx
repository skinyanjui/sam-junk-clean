import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Loader2, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FooterServiceAreasProps } from './types';

const FooterServiceAreas: React.FC<FooterServiceAreasProps> = ({
  serviceAreas,
  isLoading,
  isMobile,
  isExpanded,
  onToggle
}) => {
  const { t } = useTranslation();

  return (
    <div className="text-center md:text-left">
      <div 
        className={`group ${isMobile ? 'cursor-pointer' : ''}`}
        onClick={isMobile ? onToggle : undefined}
      >
        <h3 
          className="text-lg font-bold mb-4 flex items-center justify-center md:justify-start"
          id="footer-service-areas-heading"
        >
          <span className="relative font-semibold tracking-wide">
            {t('footer.serviceLocations')}
            <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-brand-red rounded-full"></span>
          </span>
          {isMobile && (
            <button 
              className="ml-2 p-2 focus:outline-none focus:ring-2 focus:ring-brand-red rounded-full touch-manipulation"
              aria-label={isExpanded ? "Collapse service areas" : "Expand service areas"}
              aria-expanded={isExpanded}
              aria-controls="footer-service-areas-content"
            >
              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          )}
        </h3>
        {isMobile && (
          <div className="w-full h-1 -mt-2 mb-2 opacity-0 group-active:opacity-10 bg-white rounded transition-opacity"></div>
        )}
      </div>
      
      <div 
        id="footer-service-areas-content"
        className={`mt-3 text-sm overflow-hidden transition-all duration-500 ease-in-out ${
          isMobile 
            ? isExpanded 
              ? 'max-h-96 opacity-100' 
              : 'max-h-0 opacity-0' 
            : 'max-h-96 opacity-100'
        }`}
        aria-labelledby="footer-service-areas-heading"
      >
        {isLoading ? (
          <div className="flex justify-center md:justify-start items-center p-3 bg-white/5 rounded-lg animate-pulse">
            <Loader2 size={16} className="animate-spin mr-2 text-brand-red" />
            <span className="text-gray-300">Loading service areas...</span>
          </div>
        ) : serviceAreas.length > 0 ? (
          <div className="space-y-4">
            {/* For mobile, show a more compact view with fewer areas */}
            {isMobile ? (
              <>
                <div className="bg-white/5 rounded-lg p-3">
                  {/* On mobile, just show the first area with 2 cities */}
                  {serviceAreas.slice(0, 1).map(area => (
                    <div key={area.state} className="mb-2">
                      <h4 className="text-white font-medium mb-2 flex items-center">
                        <MapPin size={14} className="mr-1.5 text-brand-red" />
                        {area.state}
                      </h4>
                      <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs pl-5">
                        {area.cities.slice(0, 2).map(city => (
                          <Link 
                            key={city} 
                            to={`/locations#${area.state.toLowerCase()}`}
                            className="text-gray-300 hover:text-white transition-colors duration-200 relative group"
                          >
                            <span>{city}</span>
                            <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-brand-red group-hover:w-full transition-all duration-300"></span>
                          </Link>
                        ))}
                        {area.cities.length > 2 && (
                          <Link 
                            to={`/locations#${area.state.toLowerCase()}`}
                            className="text-brand-red hover:text-brand-red/80 transition-colors duration-200 font-medium"
                          >
                            +{area.cities.length - 2} more
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Show a count of additional service areas */}
                  {serviceAreas.length > 1 && (
                    <div className="text-center mt-2 pt-2 border-t border-white/10">
                      <Link 
                        to="/locations" 
                        className="text-brand-red hover:text-white transition-colors duration-200 font-medium flex items-center justify-center"
                      >
                        +{serviceAreas.length - 1} more service areas
                      </Link>
                    </div>
                  )}
                </div>
                
                <Link 
                  to="/locations" 
                  className="inline-block w-full text-center py-2 px-4 bg-white/10 hover:bg-white/15 rounded-lg text-sm text-white transition-colors duration-200 font-medium"
                >
                  View all service areas
                </Link>
              </>
            ) : (
              // Desktop view - show more areas
              <>
                {serviceAreas.map(area => (
                  <div key={area.state} className="mb-4">
                    <h4 className="text-white font-medium mb-2 flex items-center">
                      <MapPin size={14} className="mr-1.5 text-brand-red" />
                      {area.state}
                    </h4>
                    <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs pl-5">
                      {area.cities.slice(0, 3).map(city => (
                        <Link 
                          key={city} 
                          to={`/locations#${area.state.toLowerCase()}`}
                          className="text-gray-300 hover:text-white transition-colors duration-200 relative group"
                        >
                          <span>{city}</span>
                          <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-brand-red group-hover:w-full transition-all duration-300"></span>
                        </Link>
                      ))}
                      {area.cities.length > 3 && (
                        <Link 
                          to={`/locations#${area.state.toLowerCase()}`}
                          className="text-brand-red hover:text-brand-red/80 transition-colors duration-200 font-medium"
                        >
                          +{area.cities.length - 3} more
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
                <Link 
                  to="/locations" 
                  className="inline-block mt-2 text-xs text-brand-red hover:text-white transition-colors duration-200 font-medium"
                >
                  View all service areas →
                </Link>
              </>
            )}
          </div>
        ) : (
          <div className="p-3 bg-white/5 rounded-lg text-center">
            <div className="flex flex-col items-center justify-center">
              <MapPin size={20} className="text-gray-400 mb-2" />
              <p className="text-gray-400 mb-1">No service areas found</p>
              <Link 
                to="/contact" 
                className="text-xs text-brand-red hover:text-white transition-colors duration-200"
              >
                Contact us for service in your area
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FooterServiceAreas;