import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from '../card';
import { CardAccessibilityProvider, CardTab, CardTabPanel } from '../card-accessibility';

// Mock components to simulate real-world usage
const MockServiceCard = () => (
    <Card
        variant="compact"
        interactive
        hasImage
        className="service-card"
        ariaLabel="Lawn Mowing Service"
        role="button"
    >
        <div className="service-card-image">
            <img src="/placeholder.svg" alt="" aria-hidden="true" />
        </div>
        <CardHeader>
            <CardTitle>Lawn Mowing</CardTitle>
        </CardHeader>
        <CardContent>
            <CardDescription>Professional lawn mowing services starting at $25</CardDescription>
        </CardContent>
        <CardFooter>
            <span className="sr-only">Click to learn more about our lawn mowing service</span>
        </CardFooter>
    </Card>
);

const MockBlogCard = ({ featured = false }) => (
    <Card
        variant="standard"
        hasImage
        className={featured ? 'blog-card-featured' : 'blog-card'}
        role="article"
    >
        <div className="blog-card-image">
            <img src="/placeholder.svg" alt="Blog post featured image" />
        </div>
        <CardHeader>
            <CardTitle>10 Tips for a Greener Lawn</CardTitle>
            <CardDescription>Posted on January 1, 2023 • 5 min read</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Learn the secrets to maintaining a lush, green lawn all year round...</p>
        </CardContent>
        <CardFooter>
            <button className="blog-card-button">Read More</button>
            <div className="blog-card-tags">
                <span>Lawn Care</span>
                <span>Tips</span>
            </div>
        </CardFooter>
    </Card>
);

const MockTestimonialCard = () => (
    <Card
        variant="featured"
        elevation="lg"
        className="testimonial-card"
    >
        <CardHeader>
            <CardTitle>John Doe</CardTitle>
            <CardDescription>Customer since 2020</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="quote-icon">❝</div>
            <blockquote>
                This service is amazing! My lawn has never looked better. The team was professional and efficient.
            </blockquote>
        </CardContent>
        <CardFooter>
            <div className="rating">★★★★★</div>
        </CardFooter>
    </Card>
);

const MockJobCard = () => {
    const [activeTab, setActiveTab] = React.useState('details');

    return (
        <CardAccessibilityProvider>
            <Card
                variant="interactive"
                interactive
                hasTabs
                className="job-card"
            >
                <CardHeader>
                    <CardTitle>Software Engineer</CardTitle>
                    <CardDescription>Full-time position • Remote</CardDescription>
                </CardHeader>

                <div role="tablist" className="job-card-tabs">
                    <CardTab
                        id="details"
                        active={activeTab === 'details'}
                        onActivate={() => setActiveTab('details')}
                    >
                        Details
                    </CardTab>
                    <CardTab
                        id="requirements"
                        active={activeTab === 'requirements'}
                        onActivate={() => setActiveTab('requirements')}
                    >
                        Requirements
                    </CardTab>
                    <CardTab
                        id="benefits"
                        active={activeTab === 'benefits'}
                        onActivate={() => setActiveTab('benefits')}
                    >
                        Benefits
                    </CardTab>
                </div>

                <CardTabPanel id="details" active={activeTab === 'details'}>
                    <p>We're looking for a skilled Software Engineer to join our growing team...</p>
                </CardTabPanel>

                <CardTabPanel id="requirements" active={activeTab === 'requirements'}>
                    <ul>
                        <li>3+ years of experience with React</li>
                        <li>Strong TypeScript skills</li>
                        <li>Experience with modern frontend frameworks</li>
                    </ul>
                </CardTabPanel>

                <CardTabPanel id="benefits" active={activeTab === 'benefits'}>
                    <ul>
                        <li>Competitive salary</li>
                        <li>Remote work options</li>
                        <li>Health insurance</li>
                        <li>401(k) matching</li>
                    </ul>
                </CardTabPanel>

                <CardFooter>
                    <button className="job-card-apply-button">Apply Now</button>
                    <button className="job-card-save-button">Save Job</button>
                </CardFooter>
            </Card>
        </CardAccessibilityProvider>
    );
};

const MockContactFormCard = () => (
    <Card
        variant="glass"
        glassEffect
        className="contact-form-card"
        role="form"
    >
        <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you</CardDescription>
        </CardHeader>
        <CardContent>
            <form className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" aria-required="true" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" aria-required="true" />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" aria-required="true"></textarea>
                </div>
            </form>
        </CardContent>
        <CardFooter>
            <button type="submit" className="submit-button">Send Message</button>
        </CardFooter>
    </Card>
);

const MockNotificationCard = () => (
    <Card
        variant="notification"
        role="alert"
        ariaLive="polite"
        ariaAtomic={true}
        className="notification-card"
    >
        <CardHeader>
            <CardTitle>New Message</CardTitle>
        </CardHeader>
        <CardContent>
            <p>You have received a new message from John Doe.</p>
        </CardContent>
        <CardFooter>
            <button className="notification-view-button">View</button>
            <button className="notification-dismiss-button">Dismiss</button>
        </CardFooter>
    </Card>
);

const MockProcessCard = ({ step, active = false }) => (
    <Card
        variant="process"
        ariaCurrent={active ? "step" : undefined}
        className={`process-card ${active ? 'active' : ''}`}
    >
        <CardHeader>
            <CardTitle>Step {step}: {step === 1 ? 'Choose Service' : step === 2 ? 'Select Date' : 'Confirm Booking'}</CardTitle>
        </CardHeader>
        <CardContent>
            {step === 1 && <p>Select the service you need from our options.</p>}
            {step === 2 && <p>Choose a date and time that works for you.</p>}
            {step === 3 && <p>Review your booking details and confirm.</p>}
        </CardContent>
        <CardFooter>
            {step < 3 ? (
                <button className="process-continue-button">Continue</button>
            ) : (
                <button className="process-complete-button">Complete Booking</button>
            )}
            {step > 1 && <button className="process-back-button">Back</button>}
        </CardFooter>
    </Card>
);

describe('Card Integration Tests', () => {
    describe('Home Section Cards', () => {
        it('renders ServiceCard correctly', () => {
            render(<MockServiceCard />);

            expect(screen.getByText('Lawn Mowing')).toBeInTheDocument();
            expect(screen.getByText('Professional lawn mowing services starting at $25')).toBeInTheDocument();
        });

        it('renders TestimonialCard correctly', () => {
            render(<MockTestimonialCard />);

            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('Customer since 2020')).toBeInTheDocument();
            expect(screen.getByText('❝')).toBeInTheDocument();
            expect(screen.getByText('This service is amazing! My lawn has never looked better. The team was professional and efficient.')).toBeInTheDocument();
        });
    });

    describe('Blog Section Cards', () => {
        it('renders standard BlogCard correctly', () => {
            render(<MockBlogCard />);

            expect(screen.getByText('10 Tips for a Greener Lawn')).toBeInTheDocument();
            expect(screen.getByText('Posted on January 1, 2023 • 5 min read')).toBeInTheDocument();
            expect(screen.getByText('Learn the secrets to maintaining a lush, green lawn all year round...')).toBeInTheDocument();
            expect(screen.getByText('Read More')).toBeInTheDocument();
        });

        it('renders featured BlogCard correctly', () => {
            render(<MockBlogCard featured={true} />);

            expect(screen.getByText('10 Tips for a Greener Lawn')).toBeInTheDocument();
            const card = screen.getByRole('article');
            expect(card).toHaveClass('blog-card-featured');
        });
    });

    describe('Careers Section Cards', () => {
        it('renders JobCard with tabs correctly', async () => {
            const user = userEvent.setup();
            render(<MockJobCard />);

            // Check initial state
            expect(screen.getByText('Software Engineer')).toBeInTheDocument();
            expect(screen.getByText('Full-time position • Remote')).toBeInTheDocument();
            expect(screen.getByText('We\'re looking for a skilled Software Engineer to join our growing team...')).toBeInTheDocument();

            // Switch tabs
            const requirementsTab = screen.getByText('Requirements');
            await user.click(requirementsTab);

            // Check new content is visible
            expect(screen.getByText('3+ years of experience with React')).toBeInTheDocument();
            expect(screen.getByText('Strong TypeScript skills')).toBeInTheDocument();
        });
    });

    describe('Contact Section Cards', () => {
        it('renders ContactFormCard with glass effect correctly', () => {
            render(<MockContactFormCard />);

            expect(screen.getByText('Contact Us')).toBeInTheDocument();
            expect(screen.getByText('Fill out the form below and we\'ll get back to you')).toBeInTheDocument();
            expect(screen.getByLabelText('Name')).toBeInTheDocument();
            expect(screen.getByLabelText('Email')).toBeInTheDocument();
            expect(screen.getByLabelText('Message')).toBeInTheDocument();
            expect(screen.getByText('Send Message')).toBeInTheDocument();
        });
    });

    describe('Notification Cards', () => {
        it('renders NotificationCard correctly', () => {
            render(<MockNotificationCard />);

            expect(screen.getByText('New Message')).toBeInTheDocument();
            expect(screen.getByText('You have received a new message from John Doe.')).toBeInTheDocument();
            expect(screen.getByText('View')).toBeInTheDocument();
            expect(screen.getByText('Dismiss')).toBeInTheDocument();
        });
    });

    describe('Process Cards', () => {
        it('renders ProcessCard correctly', () => {
            render(
                <div>
                    <MockProcessCard step={1} active={true} />
                    <MockProcessCard step={2} />
                    <MockProcessCard step={3} />
                </div>
            );

            expect(screen.getByText('Step 1: Choose Service')).toBeInTheDocument();
            expect(screen.getByText('Step 2: Select Date')).toBeInTheDocument();
            expect(screen.getByText('Step 3: Confirm Booking')).toBeInTheDocument();

            // Check active state
            const activeCard = screen.getByText('Step 1: Choose Service').closest('.process-card');
            expect(activeCard).toHaveClass('active');
        });
    });

    describe('Cross-Section Consistency', () => {
        it('maintains consistent styling across different card types', () => {
            const { container } = render(
                <div className="card-grid">
                    <MockServiceCard />
                    <MockBlogCard />
                    <MockTestimonialCard />
                    <MockJobCard />
                    <MockContactFormCard />
                    <MockNotificationCard />
                    <MockProcessCard step={1} active />
                </div>
            );

            // This would normally use visual regression testing
            // Here we're just checking that all cards render without errors
            expect(container.querySelectorAll('.card-grid > *').length).toBe(7);
        });
    });

    describe('Responsive Behavior', () => {
        it('adapts to different screen sizes', () => {
            // Mock different screen sizes
            const originalInnerWidth = global.innerWidth;

            // Test mobile view
            global.innerWidth = 375;
            global.dispatchEvent(new Event('resize'));

            const { rerender } = render(<MockBlogCard />);

            // Test tablet view
            global.innerWidth = 768;
            global.dispatchEvent(new Event('resize'));
            rerender(<MockBlogCard />);

            // Test desktop view
            global.innerWidth = 1200;
            global.dispatchEvent(new Event('resize'));
            rerender(<MockBlogCard />);

            // Restore original window size
            global.innerWidth = originalInnerWidth;
            global.dispatchEvent(new Event('resize'));

            // This would normally use visual regression testing
            // Here we're just checking that the component renders without errors at different sizes
            expect(screen.getByText('10 Tips for a Greener Lawn')).toBeInTheDocument();
        });
    });
});

// Visual Regression Tests (Mock Implementation)
describe('Visual Regression Tests', () => {
    it('compares before/after card appearances', () => {
        // This would normally use a visual regression testing library like Percy or Chromatic
        // Here we're just checking that the components render without errors

        const { container } = render(
            <div className="visual-regression-test">
                <div className="before">
                    <MockServiceCard />
                    <MockBlogCard />
                    <MockTestimonialCard />
                </div>
                <div className="after">
                    <MockServiceCard />
                    <MockBlogCard />
                    <MockTestimonialCard />
                </div>
            </div>
        );

        expect(container).toBeTruthy();
    });
});