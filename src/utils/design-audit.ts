/**
 * Design Audit Utilities
 * 
 * This file contains utilities for auditing and modernizing design elements
 * across the application. It helps identify and update outdated design patterns.
 */

import { modernDesign } from './modern-design-system';

// Types of design elements to audit
export type DesignElementType = 
  | 'typography' 
  | 'spacing' 
  | 'color' 
  | 'animation' 
  | 'layout' 
  | 'component';

// Audit result interface
export interface DesignAuditResult {
  element: string;
  type: DesignElementType;
  currentValue: string;
  recommendedValue: string;
  impact: 'high' | 'medium' | 'low';
  location: string;
}

// Common outdated patterns to look for
const outdatedPatterns = {
  typography: [
    { pattern: 'text-lg font-bold', replacement: modernDesign.typography.headings.h5 },
    { pattern: 'text-xl font-bold', replacement: modernDesign.typography.headings.h4 },
    { pattern: 'text-2xl font-bold', replacement: modernDesign.typography.headings.h3 },
    { pattern: 'text-3xl font-bold', replacement: modernDesign.typography.headings.h2 },
    { pattern: 'text-4xl font-bold', replacement: modernDesign.typography.headings.h1 },
  ],
  spacing: [
    { pattern: 'p-4', replacement: 'p-5' },
    { pattern: 'p-6', replacement: 'p-8' },
    { pattern: 'gap-2', replacement: modernDesign.spacing.component.tight },
    { pattern: 'gap-4', replacement: modernDesign.spacing.component.base },
    { pattern: 'gap-6', replacement: modernDesign.spacing.component.relaxed },
    { pattern: 'py-8', replacement: modernDesign.spacing.section.sm },
    { pattern: 'py-12', replacement: modernDesign.spacing.section.md },
    { pattern: 'py-16', replacement: modernDesign.spacing.section.lg },
  ],
  color: [
    { pattern: 'bg-gray-100', replacement: 'bg-gray-50' },
    { pattern: 'bg-gray-200', replacement: 'bg-gray-100' },
    { pattern: 'bg-brand-red', replacement: modernDesign.colors.gradients.primary },
    { pattern: 'bg-brand-navy', replacement: modernDesign.colors.gradients.secondary },
  ],
  animation: [
    { pattern: 'transition-all duration-200', replacement: modernDesign.animations.transitions.fast },
    { pattern: 'transition-all duration-300', replacement: modernDesign.animations.transitions.base },
    { pattern: 'hover:shadow-md', replacement: modernDesign.animations.hover.lift },
    { pattern: 'hover:scale-105', replacement: modernDesign.animations.hover.grow },
  ],
  layout: [
    { pattern: 'grid grid-cols-1 md:grid-cols-2', replacement: 'grid grid-cols-1 md:grid-cols-2 gap-6' },
    { pattern: 'flex flex-col', replacement: 'flex flex-col space-y-4' },
    { pattern: 'mx-auto max-w-', replacement: 'mx-auto max-w-' }, // Keep but audit for consistency
  ],
  component: [
    { pattern: 'rounded-lg', replacement: 'rounded-xl' },
    { pattern: 'shadow-sm', replacement: 'shadow' },
    { pattern: 'border border-gray-200', replacement: 'border border-gray-200 hover:border-gray-300' },
  ],
};

/**
 * Audits a CSS class string for outdated design patterns
 * @param classString The CSS class string to audit
 * @param elementType The type of element being audited
 * @param location The location of the element in the codebase
 * @returns An array of audit results
 */
export const auditClassString = (
  classString: string,
  elementType: DesignElementType,
  location: string
): DesignAuditResult[] => {
  const results: DesignAuditResult[] = [];
  
  // Get patterns for the specified element type
  const patterns = outdatedPatterns[elementType];
  
  // Check each pattern
  patterns.forEach(({ pattern, replacement }) => {
    if (classString.includes(pattern)) {
      results.push({
        element: pattern,
        type: elementType,
        currentValue: pattern,
        recommendedValue: replacement,
        impact: elementType === 'typography' || elementType === 'color' ? 'high' : 'medium',
        location,
      });
    }
  });
  
  return results;
};

/**
 * Modernizes a CSS class string by replacing outdated patterns
 * @param classString The CSS class string to modernize
 * @param elementTypes The types of elements to modernize (defaults to all)
 * @returns The modernized CSS class string
 */
export const modernizeClassString = (
  classString: string,
  elementTypes: DesignElementType[] = ['typography', 'spacing', 'color', 'animation', 'layout', 'component']
): string => {
  let modernized = classString;
  
  // Apply replacements for each element type
  elementTypes.forEach(type => {
    const patterns = outdatedPatterns[type];
    
    patterns.forEach(({ pattern, replacement }) => {
      // Use regex to match whole class names only
      const regex = new RegExp(`\\b${pattern}\\b`, 'g');
      modernized = modernized.replace(regex, replacement);
    });
  });
  
  return modernized;
};

/**
 * Generates a modern card class string based on the provided options
 * @param options Options for the card styling
 * @returns A class string for a modern card
 */
export const generateModernCardClasses = (options: {
  accentColor?: 'red' | 'navy' | 'gray' | 'none';
  elevation?: 'none' | 'low' | 'medium' | 'high';
  animation?: 'none' | 'subtle' | 'moderate' | 'enhanced';
  border?: 'none' | 'thin' | 'thick' | 'gradient';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}) => {
  const {
    accentColor = 'none',
    elevation = 'low',
    animation = 'subtle',
    border = 'thin',
    rounded = 'xl',
  } = options;
  
  // Base classes
  let classes = '';
  
  // Rounded corners
  switch (rounded) {
    case 'none': classes += ''; break;
    case 'sm': classes += 'rounded '; break;
    case 'md': classes += 'rounded-md '; break;
    case 'lg': classes += 'rounded-lg '; break;
    case 'xl': classes += 'rounded-xl '; break;
    case 'full': classes += 'rounded-full '; break;
    default: classes += 'rounded-xl ';
  }
  
  // Border
  switch (border) {
    case 'none': classes += ''; break;
    case 'thin': classes += 'border '; break;
    case 'thick': classes += 'border-2 '; break;
    case 'gradient': classes += 'border-box-decoration '; break;
    default: classes += 'border ';
  }
  
  // Border color
  if (border !== 'none') {
    switch (accentColor) {
      case 'red': classes += border === 'gradient' ? 'bg-gradient-to-r from-brand-red to-brand-navy ' : 'border-brand-red '; break;
      case 'navy': classes += border === 'gradient' ? 'bg-gradient-to-r from-brand-navy to-brand-navy/60 ' : 'border-brand-navy '; break;
      case 'gray': classes += 'border-gray-200 hover:border-gray-300 '; break;
      case 'none': classes += 'border-gray-100 hover:border-gray-200 '; break;
    }
  }
  
  // Elevation
  switch (elevation) {
    case 'none': classes += ''; break;
    case 'low': classes += 'shadow '; break;
    case 'medium': classes += 'shadow-md '; break;
    case 'high': classes += 'shadow-lg '; break;
    default: classes += 'shadow ';
  }
  
  // Animation
  switch (animation) {
    case 'none': classes += ''; break;
    case 'subtle': classes += 'transition-all duration-300 hover:shadow-md '; break;
    case 'moderate': classes += 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1 '; break;
    case 'enhanced': classes += 'transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.01] '; break;
    default: classes += 'transition-all duration-300 hover:shadow-md ';
  }
  
  // Background color
  classes += 'bg-white ';
  
  return classes.trim();
};

export default {
  auditClassString,
  modernizeClassString,
  generateModernCardClasses,
};