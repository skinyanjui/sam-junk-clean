
import { Link } from 'react-router-dom';

const MobileCta = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full md:hidden bg-white shadow-[0_-4px_15px_rgba(0,0,0,0.07)] p-4 z-40 border-t border-gray-100">
      <Link 
        to="/quote"
        className="block w-full bg-gradient-to-r from-brand-red to-brand-red/90 hover:from-brand-red/90 hover:to-brand-red text-white py-3.5 px-6 rounded-xl text-center font-medium text-base shadow-sm hover:shadow-md transition-all duration-200"
      >
        Get a Free Quote
      </Link>
    </div>
  );
};

export default MobileCta;
