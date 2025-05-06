
import { Link } from 'react-router-dom';

const MobileCta = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full md:hidden bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.1)] p-4 z-40">
      <Link 
        to="/quote"
        className="block w-full bg-brand-red hover:bg-opacity-90 text-white py-3 px-4 rounded-lg text-center font-medium text-base"
      >
        Get a Free Quote
      </Link>
    </div>
  );
};

export default MobileCta;
