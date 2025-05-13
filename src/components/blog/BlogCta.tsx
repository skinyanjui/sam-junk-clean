
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BlogCta = () => {
  return (
    <section className="py-16 bg-brand-gray">
      <div className="container-custom">
        <div className="bg-brand-navy text-white p-8 md:p-12 rounded-xl shadow-lg border border-gray-300">
          <div className="md:flex md:justify-between md:items-center">
            <div className="mb-6 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold mb-4">Need Junk Removal Services?</h2>
              <p className="text-white/90 text-lg">
                Contact us today for a free, no-obligation quote. We'll handle the mess so you don't have to.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                className="bg-brand-red hover:bg-brand-red/90 text-white font-bold tracking-wide shadow-lg transition-all duration-300 hover:scale-[1.03] border border-brand-red/20"
              >
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="border-white text-white bg-white/10 hover:bg-white hover:text-brand-navy font-bold tracking-wide border-2 transition-all duration-300 hover:scale-[1.03]"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogCta;

