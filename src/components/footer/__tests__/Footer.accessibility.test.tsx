import React from 'react';
import { render, screen } from '@testing-library/react';
// import { axe, toHaveNoViolations } from 'jest-axe'; // Commented out until jest-axe is added
import { BrowserRouter } from 'react-router-dom';
import Footer from '../Footer';

// Add jest-axe matchers
// expect.extend(toHaveNoViolations); // Commented out until jest-axe is added

// Mock the required hooks and services (same as in responsive test)
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

describe('Footer Accessibility', () => {
  test.skip('should not have accessibility violations', async () => {
    // Temporarily disabled until jest-axe is properly configured
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    
    // Wait for data to load
    await screen.findByText('Company Links');
    
    // Run axe accessibility tests
    // const results = await axe(container);
    // expect(results).toHaveNoViolations();
  });

  test('social media links have proper aria labels', async () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    
    // Wait for data to load
    await screen.findByText('Company Links');
    
    // Check for aria labels on social media links
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
  });

  test('accordion buttons have proper aria attributes', async () => {
    // Set window to mobile size
    window.innerWidth = 480;
    window.dispatchEvent(new Event('resize'));
    
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    
    // Wait for data to load
    await screen.findByText('Company Links');
    
    // Check for aria attributes on accordion buttons
    const expandNavButton = screen.getByLabelText('Expand navigation links');
    expect(expandNavButton).toHaveAttribute('aria-expanded', 'false');
    
    const expandServiceAreasButton = screen.getByLabelText('Expand service areas');
    expect(expandServiceAreasButton).toHaveAttribute('aria-expanded', 'false');
    
    const expandContactButton = screen.getByLabelText('Expand contact information');
    expect(expandContactButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('phone and email links have proper attributes', async () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    
    // Wait for data to load
    await screen.findByText('Company Links');
    
    // Check for proper href attributes on contact links
    const phoneLink = screen.getByText('(812) 610-1657');
    expect(phoneLink).toHaveAttribute('href', 'tel:+18126101657');
    
    const emailLink = screen.getByText('info@unclesamjunkremoval.com');
    expect(emailLink).toHaveAttribute('href', 'mailto:info@unclesamjunkremoval.com');
  });
});