
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PricingReference = () => {
  return (
    <div className="bg-brand-gray/50 p-4 rounded-lg border border-gray-400 shadow-sm">
      <h3 className="text-lg font-bold text-brand-navy mb-2">What You Can Expect</h3>
      <p className="text-gray-700 text-sm mb-3">
        Our pricing is based on the volume of junk, material type, and accessibility. Here's a quick reference:
      </p>
      
      <div className="space-y-2 mb-3">
        <div className="flex justify-between text-sm">
          <span>Small Items/Minimum</span>
          <span className="font-semibold">$75-$100</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>¼ to ½ Truck</span>
          <span className="font-semibold">$100-$300</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Full Truck Load</span>
          <span className="font-semibold">$450-$600+</span>
        </div>
      </div>
      
      <div className="text-sm border-t border-gray-400 pt-2 mt-2">
        <Link 
          to="/pricing" 
          className="inline-flex items-center text-brand-red hover:underline text-sm"
        >
          View complete pricing guide <ArrowRight size={14} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default PricingReference;
