
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PriceItem {
  service: string;
  description: string;
  startingPrice: string;
}

const pricingData: PriceItem[] = [
  {
    service: "Small Load",
    description: "Ideal for single items or small cleanouts",
    startingPrice: "$99"
  },
  {
    service: "Medium Load",
    description: "Perfect for room cleanouts or multiple items",
    startingPrice: "$199"
  },
  {
    service: "Large Load",
    description: "Best for full garage or basement cleanouts",
    startingPrice: "$299"
  },
  {
    service: "Full Truck Load",
    description: "Complete cleanouts for moving or renovation",
    startingPrice: "$499"
  }
];

const PricingDisplay = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-brand-navy mb-3">Transparent Pricing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our pricing is based on the volume of materials removed. Get an accurate quote by uploading a photo of your junk.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingData.map((item, index) => (
            <Card key={index} className="border-2 hover:border-brand-red transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold text-brand-navy">{item.service}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <p className="text-2xl font-bold text-brand-red">
                  Starting at {item.startingPrice}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Prices may vary based on location, material type, and accessibility. 
            Get an exact quote by filling out our form above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingDisplay;
