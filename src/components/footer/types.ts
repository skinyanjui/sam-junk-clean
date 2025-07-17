// Types for footer components

export interface SocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  hours: string;
}

export interface BusinessHours {
  weekday: string;
  weekend: string;
}

export interface ServiceArea {
  state: string;
  cities: string[];
}

export interface FooterBrandingProps {
  logo: string;
  altText: string;
  socialLinks: SocialLinks;
}

export interface FooterNavigationProps {
  isMobile: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

export interface FooterServiceAreasProps {
  serviceAreas: ServiceArea[];
  isLoading: boolean;
  isMobile: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

export interface FooterContactInfoProps {
  contactInfo: ContactInfo;
  businessHours: BusinessHours;
  isLoading: boolean;
  isMobile: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

export interface FooterCopyrightProps {
  currentYear: number;
}