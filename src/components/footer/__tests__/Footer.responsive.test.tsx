import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../Footer';

// Mock the required hooks and services
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      const translations: Record<string, string> = {
        'footer.companyLinks': 'Company Links',
        'footer.serviceLocations': 'Service Locations',
        'footer.contactUs': 'Contact Us',
        'footer.copyright': 'Copyright © {{year}} All rights reserved.',
        'footer.privacyPolicy': 'Privacy Policy',
        'footer.termsOfService': 'Terms of Service',
        'common.getQuote': 'Get a Quote',
        'nav.contact': 'Contact',
        'nav.home': 'Home',
        'nav.services': 'Services',
        'nav.about': 'About',
        'nav.blog': 'Blog',
        'nav.faq': 'FAQ',
        'nav.careers': 'Careers'
      };
      
      if (options && key === 'footer.copyright') {
        return `Copyright © ${options.year} All rights reserved.`;
      }
      
      return translations[key] || key;
    }
  })
}));

jest.mock('@/hooks/use-location-data', () => ({
  useLocationData: () => ({
    locations: [
      {
        name: 'Indiana',
        serviceAreas: ['Indianapolis', 'Bloomington', 'Fort Wayne']
      }
    ],
    isLoading: false
  })
}));

jest.mock('@/integrations/supabase/companyInfoService', () => ({
  getSocialLinks: () => Promise.resolve({
    facebook: 'https://facebook.com/test',
    instagram: 'https://instagram.com/test',
    twitter: 'https://twitter.com/test',
    linkedin: 'https://linkedin.com/test'
  }),
  getBusinessHours: () => Promise.resolve({
    weekday: 'Monday - Saturday: 7:00 AM - 7:00 PM',
    weekend: 'Sunday: Closed'
  })
}));

// Mock window resize
const resizeWindow = (width: number) => {
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
};

describe('Footer Responsive Behavior', () => {
  beforeEach(() => {
    // Reset window size to desktop
    resizeWindow(1024);
  });

  test('renders in desktop mode with expanded sections', async () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    
    // Wait for data to load
    await screen.findByText('Company Links');
    
    // In desktop mode, all sections should be visible
    expect(screen.getByText('Home')).toBeVisible();
    expect(screen.getByText('Indiana')).toBeVisible();
    expect(screen.getByText('Contact Us')).toBeVisible();
  });

  test('renders in mobile mode with collapsed sections', async () => {
    // Set window to mobile size
    resizeWindow(480);
    
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    
    // Wait for data to load
    await screen.findByText('Company Links');
    
    // In mobile mode, sections should be collapsed initially
    const companyLinks = screen.getByText('Company Links');
    expect(companyLinks).toBeVisible();
    
    // Navigation links should be hidden initially
    const homeLink = screen.queryByText('Home');
    expect(homeLink).not.toBeVisible();
    
    // Click to expand the section
    fireEvent.click(companyLinks);
    
    // Now the links should be visible
    expect(screen.getByText('Home')).toBeVisible();
  });

  test('toggles mobile accordion sections', async () => {
    // Set window to mobile size
    resizeWindow(480);
    
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    
    // Wait for data to load
    await screen.findByText('Company Links');
    
    // Click to expand company links section
    fireEvent.click(screen.getByText('Company Links'));
    expect(screen.getByText('Home')).toBeVisible();
    
    // Click to collapse company links section
    fireEvent.click(screen.getByText('Company Links'));
    expect(screen.queryByText('Home')).not.toBeVisible();
    
    // Click to expand service locations section
    fireEvent.click(screen.getByText('Service Locations'));
    expect(screen.getByText('Indiana')).toBeVisible();
    
    // Click to collapse service locations section
    fireEvent.click(screen.getByText('Service Locations'));
    expect(screen.queryByText('Indiana')).not.toBeVisible();
  });
});