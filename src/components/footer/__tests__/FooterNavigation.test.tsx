import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FooterNavigation from '../FooterNavigation';

// Mock the required hooks
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'footer.companyLinks': 'Company Links',
        'nav.home': 'Home',
        'nav.services': 'Services',
        'common.getQuote': 'Get a Quote',
        'nav.about': 'About',
        'nav.blog': 'Blog',
        'nav.faq': 'FAQ',
        'nav.careers': 'Careers',
        'nav.contact': 'Contact'
      };
      return translations[key] || key;
    }
  })
}));

describe('FooterNavigation', () => {
  test('renders navigation links in desktop mode', () => {
    render(
      <BrowserRouter>
        <FooterNavigation isMobile={false} isExpanded={false} onToggle={() => {}} />
      </BrowserRouter>
    );
    
    // Check heading
    expect(screen.getByText('Company Links')).toBeInTheDocument();
    
    // Check navigation links
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Get a Quote')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByText('Careers')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    
    // Check that links are visible in desktop mode
    expect(screen.getByText('Home')).toBeVisible();
  });

  test('renders collapsed navigation in mobile mode', () => {
    render(
      <BrowserRouter>
        <FooterNavigation isMobile={true} isExpanded={false} onToggle={() => {}} />
      </BrowserRouter>
    );
    
    // Check heading is visible
    expect(screen.getByText('Company Links')).toBeVisible();
    
    // Check that links are not visible when collapsed
    expect(screen.getByText('Home')).not.toBeVisible();
  });

  test('expands navigation when toggled in mobile mode', () => {
    render(
      <BrowserRouter>
        <FooterNavigation isMobile={true} isExpanded={true} onToggle={() => {}} />
      </BrowserRouter>
    );
    
    // Check that links are visible when expanded
    expect(screen.getByText('Home')).toBeVisible();
  });

  test('calls onToggle when clicked in mobile mode', () => {
    const mockToggle = jest.fn();
    
    render(
      <BrowserRouter>
        <FooterNavigation isMobile={true} isExpanded={false} onToggle={mockToggle} />
      </BrowserRouter>
    );
    
    // Click the heading to toggle
    fireEvent.click(screen.getByText('Company Links'));
    
    // Check that onToggle was called
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  test('does not call onToggle when clicked in desktop mode', () => {
    const mockToggle = jest.fn();
    
    render(
      <BrowserRouter>
        <FooterNavigation isMobile={false} isExpanded={false} onToggle={mockToggle} />
      </BrowserRouter>
    );
    
    // Click the heading
    fireEvent.click(screen.getByText('Company Links'));
    
    // Check that onToggle was not called
    expect(mockToggle).not.toHaveBeenCalled();
  });

  test('renders proper aria attributes for accordion', () => {
    render(
      <BrowserRouter>
        <FooterNavigation isMobile={true} isExpanded={false} onToggle={() => {}} />
      </BrowserRouter>
    );
    
    // Check for aria-expanded attribute
    const button = screen.getByLabelText('Expand navigation links');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    
    // Check for aria-controls attribute
    expect(button).toHaveAttribute('aria-controls', 'footer-nav-content');
  });
});