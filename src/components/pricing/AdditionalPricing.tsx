import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, PlusCircle, CheckCircle2, Info } from 'lucide-react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { 
  AddOnService, 
  fetchAddOnServices, 
  IncludedService, 
  fetchIncludedServices 
} from '@/integrations/supabase/pricingService';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdditionalPricingProps {
  visualStyle?: 'standard' | 'modern';
}

const AdditionalPricing = ({ visualStyle = 'modern' }: AdditionalPricingProps) => {
  const [addOnServices, setAddOnServices] = useState<AddOnService[]>([]);
  const [includedServices, setIncludedServices] = useState<IncludedService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  
  const isModern = visualStyle === 'modern';

  useEffect(() => {
    const loadData = async () => {
      try {
        const [addOnsData, includedData] = await Promise.all([
          fetchAddOnServices(),
          fetchIncludedServices('pricing')
        ]);
        
        setAddOnServices(addOnsData);
        setIncludedServices(includedData);
      } catch (err) {
        console.error('Error loading pricing data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Loading skeleton for add-on services
  const AddOnServicesSkeleton = () => (
    <Card className="shadow-md border-gray-200 overflow-hidden">
      <CardHeader className="pb-4 border-b border-gray-100">
        <Skeleton className="h-7 w-48" />
      </CardHeader>
      <CardContent className="pt-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-bold py-3"><Skeleton className="h-5 w-32" /></TableHead>
              <TableHead className="font-bold py-3"><Skeleton className="h-5 w-24" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i} className="border-b border-gray-100">
                <TableCell className="py-3"><Skeleton className="h-5 w-48" /></TableCell>
                <TableCell className="py-3"><Skeleton className="h-5 w-24" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  // Loading skeleton for included services
  const IncludedServicesSkeleton = () => (
    <Card className="shadow-md border-gray-200 h-full">
      <CardHeader className="pb-4 border-b border-gray-100">
        <Skeleton className="h-7 w-48" />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start">
              <Skeleton className="h-5 w-5 mr-3 mt-1 rounded-full" />
              <Skeleton className="h-5 w-full max-w-xs" />
            </div>
          ))}
        </div>
        <div className="mt-8 pt-4 border-t border-gray-100">
          <Skeleton className="h-4 w-full max-w-sm mb-3" />
          <Skeleton className="h-4 w-48" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className={`py-16 ${isModern ? 'bg-gray-50' : 'bg-brand-gray'}`}>
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-navy/10 mb-4">
              <PlusCircle className="h-6 w-6 text-brand-navy" />
            </div>
            <h2 className="text-3xl font-bold mb-3">Additional Services & Inclusions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Beyond our standard pricing, we offer specialized services for specific needs. 
              All our services include professional handling and eco-friendly disposal.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Add-On Services */}
            {isLoading ? (
              <AddOnServicesSkeleton />
            ) : (
              <Card className={`
                shadow-md border-gray-200 overflow-hidden
                ${isModern ? 'hover:shadow-lg transition-shadow duration-300' : ''}
              `}>
                <CardHeader className={`
                  pb-4 border-b border-gray-100
                  ${isModern ? 'bg-gradient-to-r from-gray-50 to-gray-100' : ''}
                `}>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl font-bold">Add-On Services</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className={`
                        ${isModern ? 'bg-gray-50/80' : 'bg-brand-gray/50'}
                      `}>
                        <TableHead className="font-bold text-gray-700">Service</TableHead>
                        <TableHead className="font-bold text-gray-700">Add-on Fee</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {addOnServices.map((service, index) => (
                        <TableRow 
                          key={service.id} 
                          className={`
                            border-b border-gray-100 transition-all duration-300
                            ${isModern ? 'hover:bg-gray-50' : 'hover:bg-brand-gray/30'}
                            ${activeRow === index ? 'bg-gray-50/80' : ''}
                          `}
                          onMouseEnter={() => setActiveRow(index)}
                          onMouseLeave={() => setActiveRow(null)}
                        >
                          <TableCell className="py-3 font-medium">{service.service_name}</TableCell>
                          <TableCell className="py-3 font-bold text-brand-navy">{service.fee_display}</TableCell>
                        </TableRow>
                      ))}
                      {addOnServices.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={2} className="text-center py-6 text-gray-500">
                            No add-on services available
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  
                  {isModern && (
                    <div className="p-4 bg-blue-50 text-sm text-blue-700 flex items-start">
                      <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <p>
                        Additional fees may apply for special handling or disposal requirements. 
                        Our team will provide a detailed quote after assessing your specific needs.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {/* What's Included */}
            {isLoading ? (
              <IncludedServicesSkeleton />
            ) : (
              <Card className={`
                shadow-md border-gray-200 h-full
                ${isModern ? 'hover:shadow-lg transition-shadow duration-300' : ''}
              `}>
                <CardHeader className={`
                  pb-4 border-b border-gray-100
                  ${isModern ? 'bg-gradient-to-r from-gray-50 to-gray-100' : ''}
                `}>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl font-bold">What's Included</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {includedServices.map((service, index) => (
                      <li 
                        key={service.id} 
                        className={`
                          flex items-start transition-all duration-300
                          ${isModern ? 'p-2 -mx-2 rounded-lg hover:bg-green-50/50' : ''}
                        `}
                      >
                        {isModern ? (
                          <CheckCircle2 className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
                        ) : (
                          <Check className="text-brand-red mr-3 mt-1 flex-shrink-0" />
                        )}
                        <span className="text-gray-700">{service.service_name}</span>
                      </li>
                    ))}
                    {includedServices.length === 0 && (
                      <li className="text-gray-500">No included services available</li>
                    )}
                  </ul>
                  <div className="mt-8 pt-4 border-t border-gray-100">
                    <p className="text-gray-700 mb-3">
                      Our pricing includes not just removal, but proper disposal to landfills, 
                      recycling facilities, or donation centers as appropriate.
                    </p>
                    <Link 
                      to="/services" 
                      className={`
                        inline-flex items-center font-medium
                        ${isModern 
                          ? 'text-brand-navy hover:text-brand-red transition-colors duration-300' 
                          : 'text-brand-red hover:underline'}
                      `}
                    >
                      Learn more about our services 
                      <ArrowRight size={16} className={`
                        ml-1 
                        ${isModern ? 'group-hover:translate-x-1 transition-transform' : ''}
                      `} />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalPricing;