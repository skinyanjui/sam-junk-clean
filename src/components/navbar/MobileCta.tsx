
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const MobileCta = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full md:hidden bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.1)] p-4 z-40">
      <Button 
        asChild
        className="w-full bg-brand-red hover:bg-opacity-90 text-white py-6 text-base"
      >
        <Link to="/quote">Get a Free Quote</Link>
      </Button>
    </div>
  );
};

export default MobileCta;
