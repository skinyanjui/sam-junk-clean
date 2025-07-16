
/**
 * Central utilities for contact information
 * This ensures consistency across the entire application
 */

import { CONTACT_INFO } from './design-audit';

// Standard format for display: (812) 610-1657
export const PHONE_NUMBER = CONTACT_INFO.phone;

// Format for href tel: links: +18126101657
export const PHONE_NUMBER_HREF = CONTACT_INFO.phoneHref;

// Function to format a phone number for display
export const formatPhoneNumber = (phone: string): string => {
  // If it's already in the standard format, return it
  if (phone.includes('(') && phone.includes(')')) {
    return phone;
  }
  
  // Strip all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  // If it doesn't match expected format, return the original
  return phone;
};

// Creates a tel: link with the phone number
export const getPhoneLink = (phoneNumber: string = PHONE_NUMBER_HREF): string => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  return `tel:+${cleaned}`;
};
