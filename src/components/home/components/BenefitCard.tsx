
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Calendar, Leaf, Truck, Award, Users, Star, Check, Clock, Calculator, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { CompanyBenefit } from '@/integrations/supabase/companyService';

interface BenefitCardProps {
  benefit: CompanyBenefit;
  index: number;
}

const BenefitCard = ({ benefit, index }: BenefitCardProps) => {
  // Item animations
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Helper function to get the right icon component based on string name
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'Shield': <Shield className="h-4 w-4" />,
      'Calendar': <Calendar className="h-4 w-4" />,
      'Leaf': <Leaf className="h-4 w-4" />,
      'Truck': <Truck className="h-4 w-4" />,
      'Award': <Award className="h-4 w-4" />,
      'Users': <Users className="h-4 w-4" />,
      'Star': <Star className="h-4 w-4" />,
      'Check': <Check className="h-4 w-4" />,
      'Clock': <Clock className="h-4 w-4" />,
      'Calculator': <Calculator className="h-4 w-4" />,
      'DollarSign': <DollarSign className="h-4 w-4" />,
    };

    return iconMap[iconName] || <Shield className="h-4 w-4" />;
  };

  return (
    <motion.div variants={itemVariants}>
      <Card 
        variant="compact"
        size="xs"
        elevation="sm"
        interactive={true}
        glassEffect={true}
        className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full overflow-hidden group"
      >
        <CardContent size="xs" className="relative">
          <div className="absolute top-0 right-0 p-1">
            <div className="bg-green-100 rounded-full p-1">
              <Check className="h-3 w-3 text-green-600" />
            </div>
          </div>
          <div className="flex items-start">
            <div className={`w-8 h-8 rounded-full ${benefit.color_class} flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
              {getIconComponent(benefit.icon)}
            </div>
            <div>
              <h3 className="text-sm font-bold text-brand-navy mb-1">{benefit.title}</h3>
              <p className="text-xs text-gray-600 line-clamp-2">{benefit.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BenefitCard;
