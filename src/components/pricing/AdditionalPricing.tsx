
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { AddOnService, fetchAddOnServices } from '@/integrations/supabase/pricingService';
import { Skeleton } from '@/components/ui/skeleton';

const AdditionalPricing = () => {
  const [addOnServices, setAddOnServices] = useState<AddOnService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const addOnsData = await fetchAddOnServices();
        setAddOnServices(addOnsData);
      } catch (err) {
        console.error('Error loading add-on services:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const includedServices = [
    'Hauling',
    'Loading & lifting',
    'Basic sweep-up',
    'Donation drop-offs when applicable',
    'Disposal fees'
  ];

  // Loading skeleton for add-on services
  const AddOnServicesSkeleton = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm" aria-labelledby="addon-services-heading">
      <Skeleton className="h-6 w-48 mb-6" />
      <Table>
        <TableHeader>
          <TableRow className="bg-brand-gray/50">
            <TableHead className="font-bold"><Skeleton className="h-5 w-24" /></TableHead>
            <TableHead className="font-bold"><Skeleton className="h-5 w-24" /></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i} className="hover:bg-brand-gray/30">
              <TableCell><Skeleton className="h-4 w-32" /></TableCell>
              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <section className="py-16 bg-brand-gray">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Add-On Services */}
            {isLoading ? (
              <AddOnServicesSkeleton />
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-sm" aria-labelledby="addon-services-heading">
                <h2 id="addon-services-heading" className="text-2xl font-bold text-brand-navy mb-6">Add-On Services</h2>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-brand-gray/50">
                      <TableHead className="font-bold">Service</TableHead>
                      <TableHead className="font-bold">Add-on Fee</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {addOnServices.map((service) => (
                      <TableRow key={service.id} className="hover:bg-brand-gray/30">
                        <TableCell>{service.service_name}</TableCell>
                        <TableCell className="font-semibold text-brand-navy">{service.fee_display}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            
            {/* What's Included */}
            <div className="bg-white p-6 rounded-lg shadow-sm" aria-labelledby="whats-included-heading">
              <h2 id="whats-included-heading" className="text-2xl font-bold text-brand-navy mb-6">What's Included</h2>
              <ul className="space-y-4">
                {includedServices.map((service, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-brand-red mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <p className="text-gray-700 mb-3">
                  Our pricing includes not just removal, but proper disposal to landfills, 
                  recycling facilities, or donation centers as appropriate.
                </p>
                <Link 
                  to="/services" 
                  className="inline-flex items-center text-brand-red font-medium hover:underline"
                >
                  Learn more about our services <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalPricing;
