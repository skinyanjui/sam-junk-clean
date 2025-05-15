import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Create a schema specifically for 404 page
  const notFoundSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Page Not Found | Uncle Sam Junk Removal",
    "description": "The page you're looking for doesn't exist. Return to our junk removal services homepage."
  };

  return (
    <PageLayout>
      <SEO 
        title="Page Not Found | Uncle Sam Junk Removal"
        description="Sorry, the page you're looking for cannot be found. Return to our homepage to explore professional junk removal services in Evansville and the Tri-State area."
        structuredData={notFoundSchema}
      />
      
      <div className="min-h-[70vh] flex flex-col items-center justify-center" aria-labelledby="not-found-heading">
        <h1 id="not-found-heading" className="text-6xl font-bold text-brand-navy mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Oops! This page has been cleaned out.</p>
        <p className="text-lg text-gray-500 max-w-md text-center mb-8">
          It looks like the page you're looking for has been removed... just like the junk we haul away!
        </p>
        <Button 
          asChild
          className="bg-brand-red hover:bg-opacity-90"
        >
          <Link to="/">Return to Home</Link>
        </Button>
        
        {/* Additional helpful links and content to keep users engaged */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <div className="text-center">
            <h2 className="text-xl font-bold text-brand-navy mb-3">Need Junk Removal?</h2>
            <p className="text-gray-600 mb-4">View our complete list of junk removal services for homes and businesses.</p>
            <Button variant="outline" asChild>
              <Link to="/services">Our Services</Link>
            </Button>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-brand-navy mb-3">Get a Free Quote</h2>
            <p className="text-gray-600 mb-4">Request a no-obligation quote for your junk removal needs.</p>
            <Button variant="outline" asChild>
              <Link to="/quote">Request Quote</Link>
            </Button>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-brand-navy mb-3">Service Areas</h2>
            <p className="text-gray-600 mb-4">Check if we serve your location in the Tri-State area.</p>
            <Button variant="outline" asChild>
              <Link to="/locations">View Locations</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
