
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Calendar, Leaf, Truck, Award, Users, Star, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CompanyBenefit } from '@/integrations/supabase/companyService';

interface BenefitCardProps {
  benefit: CompanyBenefit;
  index: number;
}

const BenefitCard = ({ benefit, index }: BenefitCardProps) => {
  // Item animations
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Helper function to get the right icon component based on string name
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'Shield': <Shield className="h-5 w-5" />,
      'Calendar': <Calendar className="h-5 w-5" />,
      'Leaf': <Leaf className="h-5 w-5" />,
      'Truck': <Truck className="h-5 w-5" />,
      'Award': <Award className="h-5 w-5" />,
      'Users': <Users className="h-5 w-5" />,
      'Star': <Star className="h-5 w-5" />,
    };

    return iconMap[iconName] || <Shield className="h-5 w-5" />;
  };

  return (
    <motion.div variants={itemVariants}>
      <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full overflow-hidden group">
        <CardContent className="p-4 relative">
          <div className="absolute top-0 right-0 p-1">
            <div className="bg-brand-navy/10 rounded-full p-1">
              <Check className="h-3 w-3 text-brand-navy" />
            </div>
          </div>
          <div className="relative">
            <div className={`w-10 h-10 rounded-full ${benefit.color_class} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
              {getIconComponent(benefit.icon)}
            </div>
            <h3 className="text-base font-bold text-brand-navy mb-2">{benefit.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{benefit.description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BenefitCard;
