import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PricingTier {
  id?: string;
  tier_name: string;
  price_display: string;
  description: string;
  features?: string[];
  popular?: boolean;
  price_range?: string;
}

interface PricingCardProps {
  tier: PricingTier;
  variant?: 'default' | 'compact' | 'featured' | 'minimal';
  showCTA?: boolean;
  ctaText?: string;
  ctaLink?: string;
  onCtaClick?: () => void;
  className?: string;
  isLoading?: boolean;
  interactive?: boolean;
  showFeatures?: boolean;
}

export const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  ({
    tier,
    variant = 'default',
    showCTA = true,
    ctaText = 'Get Quote',
    ctaLink,
    onCtaClick,
    className,
    isLoading = false,
    interactive = true,
    showFeatures = true,
    ...props
  }, ref) => {
    const isPopular = tier.popular || tier.tier_name.toLowerCase().includes('medium');

    const baseStyles = cn(
      "transition-all duration-300 h-full",
      interactive && "hover:-translate-y-1 hover:shadow-lg",
      isPopular && "border-2 border-brand-red relative",
      !isPopular && "border border-gray-200",
      className
    );

    const headerStyles = cn(
      "text-center pb-3",
      variant === 'compact' && "pb-2",
      variant === 'minimal' && "pb-1"
    );

    const contentStyles = cn(
      "pb-3",
      variant === 'compact' && "pb-2 px-3",
      variant === 'minimal' && "pb-2"
    );

    const footerStyles = cn(
      "pt-1 pb-3",
      variant === 'compact' && "pt-1 pb-2 px-3"
    );

    const titleSize = variant === 'compact' ? 'text-base' : variant === 'minimal' ? 'text-lg' : 'text-lg';
    const priceSize = variant === 'compact' ? 'text-lg' : variant === 'minimal' ? 'text-xl' : 'text-2xl';

    const backgroundStyle = isPopular 
      ? 'bg-gradient-to-b from-white to-blue-50 shadow-lg' 
      : 'bg-gradient-to-b from-white to-gray-50 shadow-md';

    if (isLoading) {
      return (
        <Card ref={ref} className={cn(baseStyles, "animate-pulse")} {...props}>
          <CardHeader className={headerStyles}>
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </CardHeader>
          <CardContent className={contentStyles}>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </CardContent>
          {showCTA && (
            <CardFooter className={footerStyles}>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </CardFooter>
          )}
        </Card>
      );
    }

    return (
      <Card 
        ref={ref} 
        className={cn(baseStyles, backgroundStyle)} 
        {...props}
      >
        {/* Popular Badge */}
        {isPopular && variant !== 'minimal' && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
            <Badge className="bg-brand-red hover:bg-brand-red text-white">
              Most Popular
            </Badge>
          </div>
        )}

        <CardHeader className={headerStyles}>
          {/* Title with optional popular indicator */}
          <div className="flex items-center justify-center gap-2">
            {isPopular && variant === 'minimal' && (
              <TrendingUp size={16} className="text-brand-red" />
            )}
            <h3 className={cn("font-bold text-brand-navy", titleSize)}>
              {tier.tier_name}
            </h3>
          </div>

          {/* Price */}
          <p className={cn("text-brand-red font-bold mb-1", priceSize)}>
            {tier.price_display}
          </p>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed">
            {tier.description}
          </p>
        </CardHeader>

        {/* Features */}
        {showFeatures && tier.features && tier.features.length > 0 && (
          <CardContent className={contentStyles}>
            <ul className="space-y-1">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <Check size={14} className="text-brand-red mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        )}

        {/* CTA Button */}
        {showCTA && (
          <CardFooter className={footerStyles}>
            <Button
              className={cn(
                "w-full",
                isPopular 
                  ? "bg-brand-red hover:bg-brand-red/90 text-white" 
                  : "bg-transparent border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
              )}
              size={variant === 'compact' ? 'sm' : 'default'}
              onClick={onCtaClick}
              asChild={!!ctaLink}
            >
              {ctaLink ? (
                <a href={ctaLink}>{ctaText}</a>
              ) : (
                ctaText
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    );
  }
);

PricingCard.displayName = "PricingCard";

// Additional variant components for specific use cases
export const CompactPricingCard = React.forwardRef<HTMLDivElement, Omit<PricingCardProps, 'variant'>>(
  (props, ref) => <PricingCard ref={ref} variant="compact" {...props} />
);

export const FeaturedPricingCard = React.forwardRef<HTMLDivElement, Omit<PricingCardProps, 'variant'>>(
  (props, ref) => <PricingCard ref={ref} variant="featured" {...props} />
);

export const MinimalPricingCard = React.forwardRef<HTMLDivElement, Omit<PricingCardProps, 'variant'>>(
  (props, ref) => <PricingCard ref={ref} variant="minimal" {...props} />
);

CompactPricingCard.displayName = "CompactPricingCard";
FeaturedPricingCard.displayName = "FeaturedPricingCard";
MinimalPricingCard.displayName = "MinimalPricingCard";