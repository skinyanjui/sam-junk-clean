import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FooterContactInfo from '../FooterContactInfo';

// Mock the LanguageSwitcher component
jest.mock('../../LanguageSwitcher', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher">Language Switcher</div>
}));

// Mock the required hooks
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'footer.contactUs': 'Contact Us',
        'common.getQuote': 'Get a Quote',
        'nav.contact': 'Contact'
      };
      return translations[key] || key;
    }
  })
}));

describe('FooterContactInfo', () => {
  const mockProps = {
    contactInfo: {
      phone: '(812) 610-1657',
      email: 'info@unclesamjunkremoval.com',
      hours: 'Mon-Sat: 7AM-7PM'
    },
    businessHours: {
      weekday: 'Monday - Saturday: 7:00 AM - 7:00 PM',
      weekend: 'Sunday: Closed'
    },
    isLoading: false,
    isMobile: false,
    isExpanded: false,
    onToggle: jest.fn()
  };

  test('renders contact information in desktop mode', () => {
    render(
      <BrowserRouter>
        <FooterContactInfo {...mockProps} />
      </BrowserRouter>
    );
    
    // Check heading
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    
    // Check contact info
    expect(screen.getByText('(812) 610-1657')).toBeInTheDocument();
    expect(screen.getByText('info@unclesamjunkremoval.com')).toBeInTheDocument();
    expect(screen.getByText('Monday - Saturday: 7:00 AM - 7:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Sunday: Closed')).toBeInTheDocument();
    
    // Check CTA buttons
    expect(screen.getByText('Get a Quote')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    
    // Check language switcher
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
  });

  test('renders loading state correctly', () => {
    render(
      <BrowserRouter>
        <FooterContactInfo {...mockProps} isLoading={true} />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Loading contact info...')).toBeInTheDocument();
  });

  test('renders collapsed contact info in mobile mode', () => {
    render(
      <BrowserRouter>
        <FooterContactInfo {...mockProps} isMobile={true} isExpanded={false} />
      </BrowserRouter>
    );
    
    // Check heading is visible
    expect(screen.getByText('Contact Us')).toBeVisible();
    
    // Check that content is not visible when collapsed
    expect(screen.getByText('(812) 610-1657')).not.toBeVisible();
  });

  test('expands contact info when toggled in mobile mode', () => {
    render(
      <BrowserRouter>
        <FooterContactInfo {...mockProps} isMobile={true} isExpanded={true} />
      </BrowserRouter>
    );
    
    // Check that content is visible when expanded
    expect(screen.getByText('(812) 610-1657')).toBeVisible();
  });

  test('calls onToggle when clicked in mobile mode', () => {
    const mockToggle = jest.fn();
    
    render(
      <BrowserRouter>
        <FooterContactInfo {...mockProps} isMobile={true} onToggle={mockToggle} />
      </BrowserRouter>
    );
    
    // Click the heading to toggle
    fireEvent.click(screen.getByText('Contact Us'));
    
    // Check that onToggle was called
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  test('renders proper aria attributes for accordion', () => {
    render(
      <BrowserRouter>
        <FooterContactInfo {...mockProps} isMobile={true} isExpanded={false} />
      </BrowserRouter>
    );
    
    // Check for aria-expanded attribute
    const button = screen.getByLabelText('Expand contact information');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    
    // Check for aria-controls attribute
    expect(button).toHaveAttribute('aria-controls', 'footer-contact-content');
  });

  test('phone and email links have proper href attributes', () => {
    render(
      <BrowserRouter>
        <FooterContactInfo {...mockProps} />
      </BrowserRouter>
    );
    
    // Check phone link
    const phoneLink = screen.getByText('(812) 610-1657');
    expect(phoneLink).toHaveAttribute('href', 'tel:+18126101657');
    
    // Check email link
    const emailLink = screen.getByText('info@unclesamjunkremoval.com');
    expect(emailLink).toHaveAttribute('href', 'mailto:info@unclesamjunkremoval.com');
  });
});