import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
      },
      {
        name: 'Kentucky',
        serviceAreas: ['Louisville', 'Lexington']
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

describe('Footer', () => {
  beforeEach(() => {
    // Reset window size to desktop
    resizeWindow(1024);
    
    // Mock Date.now() to return a fixed year for testing
    const currentYear = new Date().getFullYear();
    jest.spyOn(Date.prototype, 'getFullYear').mockImplementation(() => 2025);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders all footer sections', async () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Company Links')).toBeInTheDocument();
    });
    
    // Check that all main sections are rendered
    expect(screen.getByText('Company Links')).toBeInTheDocument();
    expect(screen.getByText('Service Locations')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText(/Copyright © 2025 All rights reserved./)).toBeInTheDocument();
  });

  test('renders with default data when API fails', async () => {
    // Mock API failure
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console errors
    
    jest.mock('@/integrations/supabase/companyInfoService', () => ({
      getSocialLinks: () => Promise.reject(new Error('API Error')),
      getBusinessHours: () => Promise.reject(new Error('API Error'))
    }));
    
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    
    // Wait for data to load (even with error)
    await waitFor(() => {
      expect(screen.getByText('Company Links')).toBeInTheDocument();
    });
    
    // Check that default data is used
    expect(screen.getByText('(812) 610-1657')).toBeInTheDocument();
    expect(screen.getByText('info@unclesamjunkremoval.com')).toBeInTheDocument();
  });

  test('toggles mobile sections correctly', async () => {
    // Set window to mobile size
    resizeWindow(480);
    
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Company Links')).toBeInTheDocument();
    });
    
    // Initially all sections should be collapsed
    expect(screen.getByText('Home')).not.toBeVisible();
    expect(screen.getByText('Indiana')).not.toBeVisible();
    expect(screen.getByText('(812) 610-1657')).not.toBeVisible();
    
    // Click to expand company links section
    fireEvent.click(screen.getByText('Company Links'));
    expect(screen.getByText('Home')).toBeVisible();
    
    // Click to expand service locations section
    fireEvent.click(screen.getByText('Service Locations'));
    expect(screen.getByText('Indiana')).toBeVisible();
    
    // Click to expand contact section
    fireEvent.click(screen.getByText('Contact Us'));
    expect(screen.getByText('(812) 610-1657')).toBeVisible();
    
    // Click to collapse company links section
    fireEvent.click(screen.getByText('Company Links'));
    expect(screen.getByText('Home')).not.toBeVisible();
  });

  test('renders proper grid layout in desktop mode', async () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Company Links')).toBeInTheDocument();
    });
    
    // Check that the footer has the grid layout class
    const footerContent = screen.getByText('Company Links').closest('.grid');
    expect(footerContent).toHaveClass('grid-cols-1');
    expect(footerContent).toHaveClass('md:grid-cols-2');
    expect(footerContent).toHaveClass('lg:grid-cols-4');
  });

  test('renders current year in copyright', async () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Company Links')).toBeInTheDocument();
    });
    
    // Check that the current year (mocked to 2025) is in the copyright text
    expect(screen.getByText(/Copyright © 2025 All rights reserved./)).toBeInTheDocument();
  });
});