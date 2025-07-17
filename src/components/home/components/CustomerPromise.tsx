
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Award, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CustomerPromiseProps {
  isVisible: boolean;
}

const CustomerPromise = ({ isVisible }: CustomerPromiseProps) => {
  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white rounded-xl overflow-hidden shadow-lg border border-brand-navy/30">
        <div className="p-4 md:p-5 text-center relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
          </div>
          
          <div className="relative">
            <Badge className="bg-brand-red border-0 mb-2 px-3 py-1">100% SATISFACTION GUARANTEE</Badge>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3">
              Our <span className="text-brand-yellow">Core Values</span> Define Who We Are
            </h3>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-2xl mx-auto mb-2">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <div className="mr-2 bg-white/20 backdrop-blur-sm rounded-full p-1">
                  <Star className="h-3 w-3 text-brand-yellow" />
                </div>
                <span className="text-white/90 text-xs">Integrity</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <div className="mr-2 bg-white/20 backdrop-blur-sm rounded-full p-1">
                  <Users className="h-3 w-3 text-white" />
                </div>
                <span className="text-white/90 text-xs">Respect</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <div className="mr-2 bg-white/20 backdrop-blur-sm rounded-full p-1">
                  <Award className="h-3 w-3 text-white" />
                </div>
                <span className="text-white/90 text-xs">Responsibility</span>
              </div>
            </div>
            <div className="mt-3 text-sm">
              <span className="flex items-center justify-center">
                <Check className="h-4 w-4 mr-1 text-green-300" />
                <span className="text-white/90">We operate by these core values in everything we do.</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomerPromise;
