
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Calendar, Leaf, Truck, Award, Users, Star } from 'lucide-react';
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
      'Shield': <Shield className="h-6 w-6" />,
      'Calendar': <Calendar className="h-6 w-6" />,
      'Leaf': <Leaf className="h-6 w-6" />,
      'Truck': <Truck className="h-6 w-6" />,
      'Award': <Award className="h-6 w-6" />,
      'Users': <Users className="h-6 w-6" />,
      'Star': <Star className="h-6 w-6" />,
    };

    return iconMap[iconName] || <Shield className="h-6 w-6" />;
  };

  return (
    <motion.div variants={itemVariants}>
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full overflow-hidden group">
        <CardContent className="p-6 md:p-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-transparent group-hover:to-brand-gray/20 transition-all duration-500"></div>
          <div className="relative">
            <div className={`w-14 h-14 rounded-full ${benefit.color_class} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
              {getIconComponent(benefit.icon)}
            </div>
            <h3 className="text-xl font-bold text-brand-navy mb-3">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BenefitCard;
