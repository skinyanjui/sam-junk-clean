
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const ServicesAreaLink = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-brand-navy mb-4">Service Areas</h2>
          <p className="text-gray-600 mb-6">
            Uncle Sam Junk Removal proudly serves the entire Tri-State area including Evansville, Henderson, Owensboro, and surrounding communities.
          </p>
          <Button asChild className="bg-brand-navy hover:bg-opacity-90">
            <Link to="/locations">View Our Service Areas</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesAreaLink;
