import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FooterCopyright from '../FooterCopyright';

// Mock the required hooks
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      const translations: Record<string, string> = {
        'footer.privacyPolicy': 'Privacy Policy',
        'footer.termsOfService': 'Terms of Service'
      };
      
      if (options && key === 'footer.copyright') {
        return `Copyright © ${options.year} All rights reserved.`;
      }
      
      return translations[key] || key;
    }
  })
}));

describe('FooterCopyright', () => {
  test('renders copyright text with current year', () => {
    render(
      <BrowserRouter>
        <FooterCopyright currentYear={2025} />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Copyright © 2025 All rights reserved./)).toBeInTheDocument();
    expect(screen.getByText(/Uncle Sam Junk Removal/)).toBeInTheDocument();
  });

  test('renders privacy policy link', () => {
    render(
      <BrowserRouter>
        <FooterCopyright currentYear={2025} />
      </BrowserRouter>
    );
    
    const privacyLink = screen.getByText('Privacy Policy');
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute('href', '/privacy');
  });

  test('renders terms of service link', () => {
    render(
      <BrowserRouter>
        <FooterCopyright currentYear={2025} />
      </BrowserRouter>
    );
    
    const termsLink = screen.getByText('Terms of Service');
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute('href', '/terms');
  });

  test('renders separator dot in desktop view', () => {
    // Mock window.innerWidth for desktop view
    Object.defineProperty(window, 'innerWidth', { value: 1024 });
    
    render(
      <BrowserRouter>
        <FooterCopyright currentYear={2025} />
      </BrowserRouter>
    );
    
    // The separator dot is represented by "•" character
    const separators = screen.getAllByText('•');
    expect(separators.length).toBe(2); // One in copyright text, one between links
  });
});