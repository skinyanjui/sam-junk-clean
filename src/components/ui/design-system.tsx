/**
 * Design System Components
 * Ensures consistent UI patterns across the application
 */

import { cn } from '@/lib/utils';
import { TYPOGRAPHY_SCALE, SPACING_SCALE, BUTTON_VARIANTS } from '@/utils/design-audit';

// Consistent Section Component
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'compact' | 'hero';
  background?: 'white' | 'gray' | 'navy' | 'gradient';
}

export const Section = ({
  children,
  className = '',
  variant = 'default',
  background = 'white'
}: SectionProps) => {
  const baseClasses = variant === 'hero'
    ? 'min-h-screen flex items-center justify-center'
    : variant === 'compact'
      ? SPACING_SCALE.sectionCompact
      : SPACING_SCALE.section;

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-brand-gray',
    navy: 'bg-brand-navy text-white',
    gradient: 'bg-gradient-to-br from-brand-navy via-brand-navy/95 to-brand-navy/90'
  };

  return (
    <section className={cn(
      baseClasses,
      backgroundClasses[background],
      className
    )}>
      <div className={SPACING_SCALE.container}>
        {children}
      </div>
    </section>
  );
};

// Consistent Heading Component
interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  color?: 'navy' | 'red' | 'white' | 'inherit';
}

export const Heading = ({
  level,
  children,
  className = '',
  color = 'navy'
}: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const scaleClasses = {
    1: TYPOGRAPHY_SCALE.h1,
    2: TYPOGRAPHY_SCALE.h2,
    3: TYPOGRAPHY_SCALE.h3,
    4: TYPOGRAPHY_SCALE.h4,
    5: TYPOGRAPHY_SCALE.h5,
    6: TYPOGRAPHY_SCALE.h6
  };

  const colorClasses = {
    navy: 'text-brand-navy',
    red: 'text-brand-red',
    white: 'text-white',
    inherit: ''
  };

  return (
    <Tag className={cn(
      scaleClasses[level],
      colorClasses[color],
      'font-montserrat',
      className
    )}>
      {children}
    </Tag>
  );
};

// Consistent Card Component
interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'elevated';
  padding?: 'sm' | 'md' | 'lg';
}

export const Card = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md'
}: CardProps) => {
  const variantClasses = {
    default: 'bg-white border border-gray-300 rounded-xl shadow-sm',
    glass: 'bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl',
    elevated: 'bg-white border border-gray-300 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'
  };

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div className={cn(
      variantClasses[variant],
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  );
};

// Consistent Grid Component
interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

export const Grid = ({
  children,
  className = '',
  cols = 3,
  gap = 'md',
  responsive = true
}: GridProps) => {
  const colClasses = responsive ? {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  } : {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  };

  return (
    <div className={cn(
      'grid',
      colClasses[cols],
      SPACING_SCALE.gap[gap],
      className
    )}>
      {children}
    </div>
  );
};

// Consistent Feature List Component
interface FeatureListProps {
  features: string[];
  className?: string;
  iconColor?: 'red' | 'navy' | 'green';
}

export const FeatureList = ({
  features,
  className = '',
  iconColor = 'red'
}: FeatureListProps) => {
  const iconColorClasses = {
    red: 'text-brand-red',
    navy: 'text-brand-navy',
    green: 'text-green-600'
  };

  return (
    <ul className={cn('space-y-3', className)}>
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <svg
            className={cn('w-5 h-5 mt-0.5 mr-3 flex-shrink-0', iconColorClasses[iconColor])}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-gray-700">{feature}</span>
        </li>
      ))}
    </ul>
  );
};

// Consistent CTA Section Component
interface CTASectionProps {
  title: string;
  subtitle?: string;
  primaryAction: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  className?: string;
}

export const CTASection = ({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  className = ''
}: CTASectionProps) => {
  return (
    <Section variant="compact" background="navy" className={className}>
      <div className="text-center">
        <Heading level={2} color="white" className="mb-4">
          {title}
        </Heading>
        {subtitle && (
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={primaryAction.href}
            onClick={primaryAction.onClick}
            className={cn(
              'inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105',
              'bg-brand-red hover:bg-brand-red/90 text-white shadow-lg'
            )}
          >
            {primaryAction.text}
          </a>
          {secondaryAction && (
            <a
              href={secondaryAction.href}
              onClick={secondaryAction.onClick}
              className={cn(
                'inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105',
                'border-2 border-white text-white hover:bg-white hover:text-brand-navy'
              )}
            >
              {secondaryAction.text}
            </a>
          )}
        </div>
      </div>
    </Section>
  );
};