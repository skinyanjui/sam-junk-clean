
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BlogCallToAction = () => {
  return (
    <div className="mt-16 bg-brand-navy text-white p-8 rounded-lg" aria-labelledby="cta-heading">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0 md:mr-8 text-center md:text-left">
          <h2 id="cta-heading" className="text-2xl font-bold mb-2">Ready to clear your space?</h2>
          <p className="opacity-90">Our professional team is prepared to handle all your junk removal needs</p>
        </div>
        <Button size="lg" className="bg-brand-red hover:bg-brand-red/90" asChild>
          <Link to="/quote">Get a Free Quote</Link>
        </Button>
      </div>
    </div>
  );
};

export default BlogCallToAction;
