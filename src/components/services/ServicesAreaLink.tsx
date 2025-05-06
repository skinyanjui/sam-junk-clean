
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, CheckCircle } from 'lucide-react';

const ServicesAreaLink = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-brand-gray/50 to-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-red/10 text-brand-red mb-4 animate-pulse">
              <MapPin className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold text-brand-navy mb-6">Service Areas</h2>
            <p className="text-gray-600 mb-8 text-lg text-center">
              Uncle Sam Junk Removal proudly serves the entire Tri-State area including 
              <span className="font-semibold"> Evansville</span>, 
              <span className="font-semibold"> Henderson</span>, 
              <span className="font-semibold"> Owensboro</span>, and surrounding communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-brand-gray/10 p-5 rounded-lg transition-all duration-300 hover:bg-brand-gray/20 hover:shadow-md">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-brand-navy mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-brand-navy mb-2">Indiana</h3>
                  <p className="text-sm text-gray-600">Evansville, Newburgh, Princeton, and more</p>
                </div>
              </div>
            </div>
            <div className="bg-brand-gray/10 p-5 rounded-lg transition-all duration-300 hover:bg-brand-gray/20 hover:shadow-md">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-brand-navy mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-brand-navy mb-2">Kentucky</h3>
                  <p className="text-sm text-gray-600">Henderson, Owensboro, Madisonville, and more</p>
                </div>
              </div>
            </div>
            <div className="bg-brand-gray/10 p-5 rounded-lg transition-all duration-300 hover:bg-brand-gray/20 hover:shadow-md">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-brand-navy mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-brand-navy mb-2">Illinois</h3>
                  <p className="text-sm text-gray-600">Mt. Carmel, Carmi, Grayville, and more</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              asChild 
              className="bg-brand-navy hover:bg-brand-navy/90 text-white font-bold tracking-wide shadow-lg transition-all duration-300 hover:scale-[1.03] px-6 py-6 focus:ring-2 focus:ring-brand-navy/50 focus:ring-offset-2"
              size="lg"
            >
              <Link to="/locations" className="flex items-center">
                View All Service Areas
                <ArrowRight size={18} className="ml-2 group-hover:ml-3 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesAreaLink;
