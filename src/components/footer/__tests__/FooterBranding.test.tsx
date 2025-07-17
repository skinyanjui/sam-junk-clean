import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterBranding from '../FooterBranding';

describe('FooterBranding', () => {
  const mockProps = {
    logo: '/test-logo.png',
    altText: 'Test Logo',
    socialLinks: {
      facebook: 'https://facebook.com/test',
      instagram: 'https://instagram.com/test',
      twitter: 'https://twitter.com/test',
      linkedin: 'https://linkedin.com/company/test'
    }
  };

  test('renders logo with correct src and alt text', () => {
    render(<FooterBranding {...mockProps} />);
    const logoElement = screen.getByAltText('Test Logo');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('src', '/test-logo.png');
  });

  test('renders all social media links', () => {
    render(<FooterBranding {...mockProps} />);
    
    // Check for Facebook link
    const facebookLink = screen.getByLabelText('Facebook');
    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink).toHaveAttribute('href', 'https://facebook.com/test');
    
    // Check for Instagram link
    const instagramLink = screen.getByLabelText('Instagram');
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/test');
    
    // Check for Twitter link
    const twitterLink = screen.getByLabelText('Twitter');
    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/test');
    
    // Check for LinkedIn link
    const linkedinLink = screen.getByLabelText('LinkedIn');
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/company/test');
  });

  test('renders company description text', () => {
    render(<FooterBranding {...mockProps} />);
    const descriptionText = screen.getByText(/Professional junk removal services/i);
    expect(descriptionText).toBeInTheDocument();
  });
});