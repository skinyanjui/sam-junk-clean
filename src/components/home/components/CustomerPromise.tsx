
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
      className="mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white rounded-2xl overflow-hidden shadow-lg">
        <div className="p-8 md:p-10 text-center relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
          </div>
          
          <div className="relative">
            <Badge className="bg-brand-red border-0 mb-4 px-3 py-1">Our Pledge To You</Badge>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              100% <span className="text-brand-yellow">Satisfaction</span> Guarantee
            </h3>
            <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
              <div className="flex items-center">
                <div className="mr-3 bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <Star className="h-5 w-5 text-brand-yellow" />
                </div>
                <span className="text-white/90">Top-rated service</span>
              </div>
              <div className="flex items-center">
                <div className="mr-3 bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span className="text-white/90">Background-checked team</span>
              </div>
              <div className="flex items-center">
                <div className="mr-3 bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <span className="text-white/90">Fully insured service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomerPromise;
