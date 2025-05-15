
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageLayout>
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
      </div>
    </PageLayout>
  );
};

export default NotFound;
