
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CustomerPromiseProps {
  isVisible: boolean;
}

const CustomerPromise = ({ isVisible }: CustomerPromiseProps) => {
  return (
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white rounded-xl overflow-hidden shadow-lg border border-brand-navy/30">
        <div className="p-6 md:p-8 text-center relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
          </div>
          
          <div className="relative">
            <Badge className="bg-brand-red border-0 mb-3 px-3 py-1">CUSTOMER SATISFACTION GUARANTEE</Badge>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
              100% <span className="text-brand-yellow">Satisfaction</span> Guarantee
            </h3>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-3xl mx-auto">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <div className="mr-2 bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                  <Star className="h-4 w-4 text-brand-yellow" />
                </div>
                <span className="text-white/90 text-sm">Top-rated service</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <div className="mr-2 bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <span className="text-white/90 text-sm">Background-checked team</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <div className="mr-2 bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                  <Award className="h-4 w-4 text-white" />
                </div>
                <span className="text-white/90 text-sm">Fully insured service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomerPromise;
