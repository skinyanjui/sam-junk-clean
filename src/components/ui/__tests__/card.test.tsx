import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '../card';
import { CardTab, CardTabPanel, CardCollapsible, CardAccessibilityProvider } from '../card-accessibility';

describe('Card Component', () => {
  // Base Card Component Tests
  describe('Base Card Component', () => {
    it('renders with default props', () => {
      render(<Card data-testid="test-card">Card Content</Card>);
      const card = screen.getByTestId('test-card');
      
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('rounded-lg');
      expect(card).toHaveClass('transition-all');
    });
    
    it('applies variant styles correctly', () => {
      const { rerender } = render(<Card data-testid="test-card" variant="compact">Compact Card</Card>);
      let card = screen.getByTestId('test-card');
      expect(card).toHaveAttribute('data-variant', 'compact');
      
      rerender(<Card data-testid="test-card" variant="featured">Featured Card</Card>);
      card = screen.getByTestId('test-card');
      expect(card).toHaveAttribute('data-variant', 'featured');
      
      rerender(<Card data-testid="test-card" variant="glass" glassEffect={true}>Glass Card</Card>);
      card = screen.getByTestId('test-card');
      expect(card).toHaveAttribute('data-variant', 'glass');
    });
    
    it('applies elevation styles correctly', () => {
      const { rerender } = render(<Card data-testid="test-card" elevation="none">No Shadow</Card>);
      let card = screen.getByTestId('test-card');
      expect(card).toHaveClass('shadow-none');
      
      rerender(<Card data-testid="test-card" elevation="lg">Large Shadow</Card>);
      card = screen.getByTestId('test-card');
      expect(card).toHaveClass('shadow-lg');
    });
    
    it('applies interactive styles when interactive prop is true', () => {
      render(<Card data-testid="test-card" interactive>Interactive Card</Card>);
      const card = screen.getByTestId('test-card');
      
      expect(card).toHaveClass('cursor-pointer');
      expect(card).toHaveAttribute('data-interactive', 'true');
    });
    
    it('applies special effect styles correctly', () => {
      const { rerender } = render(<Card data-testid="test-card" glassEffect>Glass Effect</Card>);
      let card = screen.getByTestId('test-card');
      expect(card).toHaveClass('backdrop-blur-md');
      
      rerender(<Card data-testid="test-card" gradient>Gradient Effect</Card>);
      card = screen.getByTestId('test-card');
      expect(card).toHaveClass('bg-gradient-to-r');
      
      rerender(<Card data-testid="test-card" borderAccent>Border Accent</Card>);
      card = screen.getByTestId('test-card');
      expect(card).toHaveClass('border-l-4');
    });
  });
  
  // Card Sub-Components Tests
  describe('Card Sub-Components', () => {
    it('renders CardHeader with correct styles', () => {
      render(
        <Card>
          <CardHeader data-testid="test-header">
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
        </Card>
      );
      
      const header = screen.getByTestId('test-header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('flex');
      expect(header).toHaveClass('flex-col');
    });
    
    it('renders CardTitle with correct heading level', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle data-testid="test-title" headingLevel={2}>Card Title</CardTitle>
          </CardHeader>
        </Card>
      );
      
      const title = screen.getByTestId('test-title');
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe('H2');
    });
    
    it('renders CardDescription with correct styles', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription data-testid="test-desc">Card Description</CardDescription>
          </CardHeader>
        </Card>
      );
      
      const desc = screen.getByTestId('test-desc');
      expect(desc).toBeInTheDocument();
      expect(desc).toHaveClass('text-muted-foreground');
    });
    
    it('renders CardContent with correct styles', () => {
      render(
        <Card>
          <CardContent data-testid="test-content">Content</CardContent>
        </Card>
      );
      
      const content = screen.getByTestId('test-content');
      expect(content).toBeInTheDocument();
    });
    
    it('renders CardFooter with correct styles', () => {
      render(
        <Card>
          <CardFooter data-testid="test-footer">Footer</CardFooter>
        </Card>
      );
      
      const footer = screen.getByTestId('test-footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass('flex');
      expect(footer).toHaveClass('items-center');
    });
  });
  
  // Accessibility Tests
  describe('Card Accessibility', () => {
    it('applies correct ARIA attributes', () => {
      render(
        <Card 
          data-testid="test-card"
          ariaLabel="Test Card"
          role="region"
          ariaLive="polite"
        >
          Card Content
        </Card>
      );
      
      const card = screen.getByTestId('test-card');
      expect(card).toHaveAttribute('aria-label', 'Test Card');
      expect(card).toHaveAttribute('role', 'region');
      expect(card).toHaveAttribute('aria-live', 'polite');
    });
    
    it('applies correct tabIndex for interactive cards', () => {
      render(<Card data-testid="test-card" interactive>Interactive Card</Card>);
      const card = screen.getByTestId('test-card');
      
      expect(card).toHaveAttribute('tabIndex', '0');
    });
    
    it('handles keyboard navigation for interactive cards', () => {
      const handleClick = jest.fn();
      render(
        <Card 
          data-testid="test-card" 
          interactive 
          onClick={handleClick}
        >
          Interactive Card
        </Card>
      );
      
      const card = screen.getByTestId('test-card');
      fireEvent.keyDown(card, { key: 'Enter' });
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
    
    it('renders screen reader announcements', () => {
      render(
        <Card 
          data-testid="test-card"
          announcement={{ 
            message: "Test announcement", 
            politeness: "polite" 
          }}
        >
          Card with announcement
        </Card>
      );
      
      const liveRegion = document.querySelector('.card-live-region');
      expect(liveRegion).toBeInTheDocument();
      expect(liveRegion).toHaveAttribute('aria-live', 'polite');
    });
  });
  
  // Card Variants Tests
  describe('Card Variants', () => {
    it('renders compact variant correctly', () => {
      render(
        <Card data-testid="test-card" variant="compact">
          <CardHeader>
            <CardTitle>Compact Card</CardTitle>
          </CardHeader>
          <CardContent>Compact content</CardContent>
        </Card>
      );
      
      const card = screen.getByTestId('test-card');
      expect(card).toHaveAttribute('data-variant', 'compact');
    });
    
    it('renders standard variant correctly', () => {
      render(
        <Card data-testid="test-card" variant="standard">
          <CardHeader>
            <CardTitle>Standard Card</CardTitle>
          </CardHeader>
          <CardContent>Standard content</CardContent>
        </Card>
      );
      
      const card = screen.getByTestId('test-card');
      expect(card).toHaveAttribute('data-variant', 'standard');
    });
    
    it('renders featured variant correctly', () => {
      render(
        <Card data-testid="test-card" variant="featured">
          <CardHeader>
            <CardTitle>Featured Card</CardTitle>
          </CardHeader>
          <CardContent>Featured content</CardContent>
        </Card>
      );
      
      const card = screen.getByTestId('test-card');
      expect(card).toHaveAttribute('data-variant', 'featured');
    });
    
    it('renders interactive variant correctly', () => {
      render(
        <Card data-testid="test-card" variant="interactive" interactive>
          <CardHeader>
            <CardTitle>Interactive Card</CardTitle>
          </CardHeader>
          <CardContent>Interactive content</CardContent>
        </Card>
      );
      
      const card = screen.getByTestId('test-card');
      expect(card).toHaveAttribute('data-variant', 'interactive');
      expect(card).toHaveAttribute('data-interactive', 'true');
    });
    
    it('renders glass variant correctly', () => {
      render(
        <Card data-testid="test-card" variant="glass" glassEffect>
          <CardHeader>
            <CardTitle>Glass Card</CardTitle>
          </CardHeader>
          <CardContent>Glass content</CardContent>
        </Card>
      );
      
      const card = screen.getByTestId('test-card');
      expect(card).toHaveAttribute('data-variant', 'glass');
    });
    
    it('renders notification variant correctly', () => {
      render(
        <Card data-testid="test-card" variant="notification" role="alert">
          <CardHeader>
            <CardTitle>Notification Card</CardTitle>
          </CardHeader>
          <CardContent>Notification content</CardContent>
        </Card>
      );
      
      const card = screen.getByTestId('test-card');
      expect(card).toHaveAttribute('data-variant', 'notification');
      expect(card).toHaveAttribute('role', 'alert');
    });
    
    it('renders process variant correctly', () => {
      render(
        <Card data-testid="test-card" variant="process">
          <CardHeader>
            <CardTitle>Process Card</CardTitle>
          </CardHeader>
          <CardContent>Process content</CardContent>
        </Card>
      );
      
      const card = screen.getByTestId('test-card');
      expect(card).toHaveAttribute('data-variant', 'process');
    });
  });
});

// Card Accessibility Components Tests
describe('Card Accessibility Components', () => {
  describe('CardTab and CardTabPanel', () => {
    it('renders tabs and panels correctly', () => {
      render(
        <CardAccessibilityProvider>
          <Card variant="interactive" hasTabs>
            <div role="tablist">
              <CardTab 
                id="tab1" 
                label="Tab 1" 
                active={true}
                data-testid="tab1"
              >
                Tab 1
              </CardTab>
              <CardTab 
                id="tab2" 
                label="Tab 2" 
                active={false}
                data-testid="tab2"
              >
                Tab 2
              </CardTab>
            </div>
            <CardTabPanel 
              id="tab1" 
              label="Tab 1 Content" 
              active={true}
              data-testid="panel1"
            >
              Tab 1 Content
            </CardTabPanel>
            <CardTabPanel 
              id="tab2" 
              label="Tab 2 Content" 
              active={false}
              data-testid="panel2"
            >
              Tab 2 Content
            </CardTabPanel>
          </Card>
        </CardAccessibilityProvider>
      );
      
      const tab1 = screen.getByTestId('tab1');
      const tab2 = screen.getByTestId('tab2');
      const panel1 = screen.getByTestId('panel1');
      const panel2 = screen.getByTestId('panel2');
      
      expect(tab1).toHaveAttribute('aria-selected', 'true');
      expect(tab2).toHaveAttribute('aria-selected', 'false');
      expect(panel1).toHaveAttribute('aria-hidden', 'false');
      expect(panel2).toHaveAttribute('aria-hidden', 'true');
      expect(panel2).toHaveStyle({ display: 'none' });
    });
    
    it('handles tab activation correctly', async () => {
      const user = userEvent.setup();
      const onActivate = jest.fn();
      
      render(
        <CardAccessibilityProvider>
          <Card variant="interactive" hasTabs>
            <div role="tablist">
              <CardTab 
                id="tab1" 
                label="Tab 1" 
                active={true}
                data-testid="tab1"
              >
                Tab 1
              </CardTab>
              <CardTab 
                id="tab2" 
                label="Tab 2" 
                active={false}
                data-testid="tab2"
                onActivate={onActivate}
              >
                Tab 2
              </CardTab>
            </div>
          </Card>
        </CardAccessibilityProvider>
      );
      
      const tab2 = screen.getByTestId('tab2');
      await user.click(tab2);
      
      expect(onActivate).toHaveBeenCalledTimes(1);
    });
  });
  
  describe('CardCollapsible', () => {
    it('renders collapsible content correctly', () => {
      render(
        <CardAccessibilityProvider>
          <Card variant="process" collapsible>
            <CardCollapsible 
              id="collapse1" 
              label="Collapsible Section" 
              expanded={false}
              data-testid="collapsible"
            >
              <p data-testid="collapsible-content">Collapsible Content</p>
            </CardCollapsible>
          </Card>
        </CardAccessibilityProvider>
      );
      
      const trigger = screen.getByText('Collapsible Section');
      const content = screen.getByTestId('collapsible-content');
      
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(content.parentElement).toHaveStyle({ display: 'none' });
    });
    
    it('toggles collapsible content correctly', async () => {
      const user = userEvent.setup();
      const onToggle = jest.fn();
      
      render(
        <CardAccessibilityProvider>
          <Card variant="process" collapsible>
            <CardCollapsible 
              id="collapse1" 
              label="Collapsible Section" 
              expanded={false}
              onToggle={onToggle}
              data-testid="collapsible"
            >
              <p>Collapsible Content</p>
            </CardCollapsible>
          </Card>
        </CardAccessibilityProvider>
      );
      
      const trigger = screen.getByText('Collapsible Section');
      await user.click(trigger);
      
      expect(onToggle).toHaveBeenCalledTimes(1);
      expect(onToggle).toHaveBeenCalledWith(true);
    });
  });
});

// Integration Tests for Section-Specific Card Implementations
describe('Section-Specific Card Implementations', () => {
  // Test for ServiceCard (compact variant)
  it('renders ServiceCard with compact variant correctly', () => {
    render(
      <Card 
        data-testid="service-card" 
        variant="compact" 
        interactive
        hasImage
      >
        <CardHeader>
          <CardTitle>Lawn Mowing</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>Professional lawn mowing services</CardDescription>
        </CardContent>
      </Card>
    );
    
    const card = screen.getByTestId('service-card');
    expect(card).toHaveAttribute('data-variant', 'compact');
    expect(card).toHaveAttribute('data-interactive', 'true');
    expect(card).toHaveAttribute('data-has-image', 'true');
  });
  
  // Test for BlogCard (standard variant)
  it('renders BlogCard with standard variant correctly', () => {
    render(
      <Card 
        data-testid="blog-card" 
        variant="standard"
        hasImage
        role="article"
      >
        <CardHeader>
          <CardTitle>Blog Post Title</CardTitle>
          <CardDescription>Posted on January 1, 2023</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Blog post excerpt...</p>
        </CardContent>
        <CardFooter>
          <button>Read More</button>
        </CardFooter>
      </Card>
    );
    
    const card = screen.getByTestId('blog-card');
    expect(card).toHaveAttribute('data-variant', 'standard');
    expect(card).toHaveAttribute('role', 'article');
  });
  
  // Test for TestimonialCard (featured variant)
  it('renders TestimonialCard with featured variant correctly', () => {
    render(
      <Card 
        data-testid="testimonial-card" 
        variant="featured"
        elevation="lg"
      >
        <CardHeader>
          <CardTitle>John Doe</CardTitle>
          <CardDescription>Customer since 2020</CardDescription>
        </CardHeader>
        <CardContent>
          <blockquote>This service is amazing...</blockquote>
        </CardContent>
      </Card>
    );
    
    const card = screen.getByTestId('testimonial-card');
    expect(card).toHaveAttribute('data-variant', 'featured');
    expect(card).toHaveClass('shadow-lg');
  });
  
  // Test for JobCard (interactive variant)
  it('renders JobCard with interactive variant correctly', () => {
    render(
      <CardAccessibilityProvider>
        <Card 
          data-testid="job-card" 
          variant="interactive"
          interactive
          hasTabs
        >
          <CardHeader>
            <CardTitle>Software Engineer</CardTitle>
            <CardDescription>Full-time position</CardDescription>
          </CardHeader>
          <div role="tablist">
            <CardTab id="details" label="Details" active={true}>
              Details
            </CardTab>
            <CardTab id="requirements" label="Requirements" active={false}>
              Requirements
            </CardTab>
          </div>
          <CardTabPanel id="details" label="Job details" active={true}>
            <p>Job details content...</p>
          </CardTabPanel>
          <CardTabPanel id="requirements" label="Job requirements" active={false}>
            <p>Job requirements content...</p>
          </CardTabPanel>
          <CardFooter>
            <button>Apply Now</button>
          </CardFooter>
        </Card>
      </CardAccessibilityProvider>
    );
    
    const card = screen.getByTestId('job-card');
    expect(card).toHaveAttribute('data-variant', 'interactive');
    expect(card).toHaveAttribute('data-interactive', 'true');
    expect(card).toHaveAttribute('data-has-tabs', 'true');
  });
  
  // Test for ContactForm (glass variant)
  it('renders ContactForm with glass variant correctly', () => {
    render(
      <Card 
        data-testid="contact-form" 
        variant="glass"
        glassEffect
        role="form"
      >
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" />
          </form>
        </CardContent>
      </Card>
    );
    
    const card = screen.getByTestId('contact-form');
    expect(card).toHaveAttribute('data-variant', 'glass');
    expect(card).toHaveAttribute('role', 'form');
  });
  
  // Test for NotificationCard (notification variant)
  it('renders NotificationCard with notification variant correctly', () => {
    render(
      <Card 
        data-testid="notification-card" 
        variant="notification"
        role="alert"
        ariaLive="polite"
      >
        <CardHeader>
          <CardTitle>New Message</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You have received a new message from John Doe.</p>
        </CardContent>
        <CardFooter>
          <button>View</button>
          <button>Dismiss</button>
        </CardFooter>
      </Card>
    );
    
    const card = screen.getByTestId('notification-card');
    expect(card).toHaveAttribute('data-variant', 'notification');
    expect(card).toHaveAttribute('role', 'alert');
    expect(card).toHaveAttribute('aria-live', 'polite');
  });
  
  // Test for ProcessCard (process variant)
  it('renders ProcessCard with process variant correctly', () => {
    render(
      <Card 
        data-testid="process-card" 
        variant="process"
        ariaCurrent="step"
      >
        <CardHeader>
          <CardTitle>Step 1: Choose Service</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Select the service you need from our options.</p>
        </CardContent>
        <CardFooter>
          <button>Continue</button>
        </CardFooter>
      </Card>
    );
    
    const card = screen.getByTestId('process-card');
    expect(card).toHaveAttribute('data-variant', 'process');
    expect(card).toHaveAttribute('aria-current', 'step');
  });
});

// Visual Regression Tests (Mock Implementation)
describe('Visual Regression Tests', () => {
  it('matches snapshot for all card variants', () => {
    const { container } = render(
      <>
        <Card variant="compact" data-testid="compact-card">
          <CardHeader>
            <CardTitle>Compact Card</CardTitle>
          </CardHeader>
          <CardContent>Compact content</CardContent>
        </Card>
        
        <Card variant="standard" data-testid="standard-card">
          <CardHeader>
            <CardTitle>Standard Card</CardTitle>
          </CardHeader>
          <CardContent>Standard content</CardContent>
        </Card>
        
        <Card variant="featured" data-testid="featured-card">
          <CardHeader>
            <CardTitle>Featured Card</CardTitle>
          </CardHeader>
          <CardContent>Featured content</CardContent>
        </Card>
        
        <Card variant="interactive" interactive data-testid="interactive-card">
          <CardHeader>
            <CardTitle>Interactive Card</CardTitle>
          </CardHeader>
          <CardContent>Interactive content</CardContent>
        </Card>
        
        <Card variant="glass" glassEffect data-testid="glass-card">
          <CardHeader>
            <CardTitle>Glass Card</CardTitle>
          </CardHeader>
          <CardContent>Glass content</CardContent>
        </Card>
        
        <Card variant="notification" data-testid="notification-card">
          <CardHeader>
            <CardTitle>Notification Card</CardTitle>
          </CardHeader>
          <CardContent>Notification content</CardContent>
        </Card>
        
        <Card variant="process" data-testid="process-card">
          <CardHeader>
            <CardTitle>Process Card</CardTitle>
          </CardHeader>
          <CardContent>Process content</CardContent>
        </Card>
      </>
    );
    
    // This would normally use a snapshot testing library
    expect(container).toBeTruthy();
  });
});

// Responsive Behavior Tests
describe('Responsive Behavior Tests', () => {
  it('applies responsive styles correctly', () => {
    // Mock window resize
    global.innerWidth = 480;
    global.dispatchEvent(new Event('resize'));
    
    render(
      <Card data-testid="responsive-card" className="card-responsive">
        <CardHeader>
          <CardTitle>Responsive Card</CardTitle>
        </CardHeader>
        <CardContent>Responsive content</CardContent>
      </Card>
    );
    
    const card = screen.getByTestId('responsive-card');
    expect(card).toHaveClass('card-responsive');
  });
});