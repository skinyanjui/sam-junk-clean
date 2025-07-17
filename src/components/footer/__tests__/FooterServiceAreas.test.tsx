import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FooterServiceAreas from '../FooterServiceAreas';

// Mock the required hooks
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'footer.serviceLocations': 'Service Locations'
      };
      return translations[key] || key;
    }
  })
}));

describe('FooterServiceAreas', () => {
  const mockServiceAreas = [
    {
      state: 'Indiana',
      cities: ['Indianapolis', 'Bloomington', 'Fort Wayne', 'Evansville']
    },
    {
      state: 'Kentucky',
      cities: ['Louisville', 'Lexington']
    }
  ];

  const mockProps = {
    serviceAreas: mockServiceAreas,
    isLoading: false,
    isMobile: false,
    isExpanded: false,
    onToggle: jest.fn()
  };

  test('renders service areas in desktop mode', () => {
    render(
      <BrowserRouter>
        <FooterServiceAreas {...mockProps} />
      </BrowserRouter>
    );
    
    // Check heading
    expect(screen.getByText('Service Locations')).toBeInTheDocument();
    
    // Check states
    expect(screen.getByText('Indiana')).toBeInTheDocument();
    expect(screen.getByText('Kentucky')).toBeInTheDocument();
    
    // Check cities
    expect(screen.getByText('Indianapolis')).toBeInTheDocument();
    expect(screen.getByText('Bloomington')).toBeInTheDocument();
    expect(screen.getByText('Fort Wayne')).toBeInTheDocument();
    expect(screen.getByText('Louisville')).toBeInTheDocument();
    expect(screen.getByText('Lexington')).toBeInTheDocument();
    
    // Check "more" link for cities (Indiana has 4 cities but only shows 3)
    expect(screen.getByText('+1 more')).toBeInTheDocument();
    
    // Check "View all service areas" link
    expect(screen.getByText('View all service areas →')).toBeInTheDocument();
  });

  test('renders loading state correctly', () => {
    render(
      <BrowserRouter>
        <FooterServiceAreas {...mockProps} isLoading={true} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Loading service areas...')).toBeInTheDocument();
  });

  test('renders empty state correctly', () => {
    render(
      <BrowserRouter>
        <FooterServiceAreas {...mockProps} serviceAreas={[]} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('No service areas found')).toBeInTheDocument();
    expect(screen.getByText('Contact us for service in your area')).toBeInTheDocument();
  });

  test('renders collapsed service areas in mobile mode', () => {
    render(
      <BrowserRouter>
        <FooterServiceAreas {...mockProps} isMobile={true} isExpanded={false} />
      </BrowserRouter>
    );
    
    // Check heading is visible
    expect(screen.getByText('Service Locations')).toBeVisible();
    
    // Check that content is not visible when collapsed
    expect(screen.queryByText('Indiana')).not.toBeVisible();
  });

  test('expands service areas when toggled in mobile mode', () => {
    render(
      <BrowserRouter>
        <FooterServiceAreas {...mockProps} isMobile={true} isExpanded={true} />
      </BrowserRouter>
    );
    
    // Check that content is visible when expanded
    expect(screen.getByText('Indiana')).toBeVisible();
  });

  test('calls onToggle when clicked in mobile mode', () => {
    const mockToggle = jest.fn();
    
    render(
      <BrowserRouter>
        <FooterServiceAreas {...mockProps} isMobile={true} onToggle={mockToggle} />
      </BrowserRouter>
    );
    
    // Click the heading to toggle
    fireEvent.click(screen.getByText('Service Locations'));
    
    // Check that onToggle was called
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  test('renders proper aria attributes for accordion', () => {
    render(
      <BrowserRouter>
        <FooterServiceAreas {...mockProps} isMobile={true} isExpanded={false} />
      </BrowserRouter>
    );
    
    // Check for aria-expanded attribute
    const button = screen.getByLabelText('Expand service areas');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    
    // Check for aria-controls attribute
    expect(button).toHaveAttribute('aria-controls', 'footer-service-areas-content');
  });

  test('renders compact view in mobile mode', () => {
    render(
      <BrowserRouter>
        <FooterServiceAreas {...mockProps} isMobile={true} isExpanded={true} />
      </BrowserRouter>
    );
    
    // In mobile mode, only the first state should be shown with limited cities
    expect(screen.getByText('Indiana')).toBeInTheDocument();
    expect(screen.queryByText('Kentucky')).not.toBeInTheDocument();
    
    // Check for "+1 more service areas" text
    expect(screen.getByText('+1 more service areas')).toBeInTheDocument();
    
    // Check for "View all service areas" button
    expect(screen.getByText('View all service areas')).toBeInTheDocument();
  });
});