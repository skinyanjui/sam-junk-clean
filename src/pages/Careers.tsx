
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';
import { Home, Briefcase, Users, Award, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Careers = () => {
  // Job listings data
  const jobListings = [
    {
      id: 1,
      title: "Junk Removal Specialist",
      type: "Full-time",
      location: "Evansville, IN",
      description: "Join our team as a Junk Removal Specialist and help customers clear their spaces of unwanted items. You'll work directly with clients to assess their needs, provide estimates, and safely remove and dispose of items.",
      requirements: [
        "Valid driver's license with clean driving record",
        "Ability to lift up to 75 pounds repeatedly throughout the day",
        "Excellent customer service skills",
        "Attention to detail and problem-solving abilities",
        "Reliable transportation to work location"
      ],
      benefits: [
        "Competitive hourly wage plus tips",
        "Health insurance for full-time employees",
        "Paid time off",
        "Flexible scheduling",
        "Career advancement opportunities"
      ]
    },
    {
      id: 2,
      title: "Customer Service Representative",
      type: "Part-time",
      location: "Evansville, IN",
      description: "As a Customer Service Representative, you'll be the first point of contact for our customers. You'll schedule appointments, answer questions, and ensure a smooth customer experience from first call to service completion.",
      requirements: [
        "Excellent communication skills",
        "Proficiency with computers and scheduling software",
        "Ability to multitask in a fast-paced environment",
        "Problem-solving mindset",
        "Previous customer service experience preferred"
      ],
      benefits: [
        "Competitive hourly wage",
        "Flexible scheduling",
        "Friendly work environment",
        "Potential for advancement to full-time",
        "Employee discounts"
      ]
    },
    {
      id: 3,
      title: "Route Supervisor",
      type: "Full-time",
      location: "Evansville, IN",
      description: "Lead a team of junk removal specialists as a Route Supervisor. You'll coordinate daily routes, ensure quality service delivery, mentor team members, and help resolve any on-site challenges that may arise.",
      requirements: [
        "Previous experience in junk removal or related field",
        "Leadership experience preferred",
        "Valid driver's license with clean driving record",
        "Strong organizational and time management skills",
        "Excellent problem-solving abilities"
      ],
      benefits: [
        "Competitive salary",
        "Health, dental, and vision insurance",
        "401(k) with company match",
        "Paid time off and holidays",
        "Career growth opportunities"
      ]
    }
  ];

  return (
    <PageLayout>
      <SEO 
        title="Careers | Uncle Sam Junk Removal"
        description="Join our patriotic team of junk removal professionals. View current job openings, benefits, and apply online. Uncle Sam wants YOU!"
        keywords="junk removal jobs, Evansville job openings, Tri-State area employment, Uncle Sam Junk Removal careers, job applications, veteran owned business jobs"
      />

      <div className="bg-brand-gray py-8">
        <div className="container-custom">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/"><Home size={16} className="mr-1" /> Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Careers</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-brand-navy to-brand-navy/90 text-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Uncle Sam's Team</h1>
              <p className="text-xl mb-6 text-white/90">
                Uncle Sam wants YOU to join our patriotic team of junk removal professionals! We're looking for dedicated individuals who take pride in their work and want to make a difference in their community.
              </p>
              <Button asChild size="lg" className="bg-brand-red hover:bg-opacity-90">
                <a href="#openings">View Open Positions</a>
              </Button>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1551038247-3d9af20df552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Team working together" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">Why Work With Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join a team that values hard work, camaraderie, and customer satisfaction. 
              We're not just employees - we're a family on a mission to help our community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-brand-gray rounded-lg">
              <div className="bg-brand-navy/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-brand-navy" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-3">Supportive Team</h3>
              <p className="text-gray-600">
                Work with a team that has your back. We believe in collaboration, support, and helping each other succeed.
              </p>
            </div>

            <div className="text-center p-6 bg-brand-gray rounded-lg">
              <div className="bg-brand-navy/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={32} className="text-brand-navy" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-3">Growth Opportunities</h3>
              <p className="text-gray-600">
                We promote from within and provide training to help you advance your career with us as we continue to grow.
              </p>
            </div>

            <div className="text-center p-6 bg-brand-gray rounded-lg">
              <div className="bg-brand-navy/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-brand-navy" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-3">Veteran Supportive</h3>
              <p className="text-gray-600">
                As a veteran-owned business, we understand the value veterans bring to the workforce and actively support their transition to civilian careers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings Section */}
      <section id="openings" className="py-16 bg-brand-gray">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">Current Openings</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take a look at our current job openings and find a role that fits your skills and experience.
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {jobListings.map(job => (
              <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl text-brand-navy">{job.title}</CardTitle>
                      <CardDescription className="text-lg">
                        {job.type} • {job.location}
                      </CardDescription>
                    </div>
                    <Briefcase size={24} className="text-brand-red" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="description" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="requirements">Requirements</TabsTrigger>
                      <TabsTrigger value="benefits">Benefits</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="pt-4">
                      <p className="text-gray-600">{job.description}</p>
                    </TabsContent>
                    <TabsContent value="requirements" className="pt-4">
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        {job.requirements.map((requirement, index) => (
                          <li key={index}>{requirement}</li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="benefits" className="pt-4">
                      <ul className="list-disc pl-5 text-gray-600 space-y-1">
                        {job.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <Button className="w-full md:w-auto bg-brand-red hover:bg-opacity-90">Apply Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* No positions available fallback */}
          {jobListings.length === 0 && (
            <div className="bg-white p-8 rounded-lg text-center max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-brand-navy mb-3">No Positions Currently Available</h3>
              <p className="text-gray-600 mb-4">
                We don't have any open positions right now, but we're always looking for great talent. Send us your resume and we'll keep it on file for future opportunities.
              </p>
              <Button className="bg-brand-red hover:bg-opacity-90">Submit Your Resume</Button>
            </div>
          )}
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">Our Application Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here's what you can expect when applying for a position with Uncle Sam Junk Removal.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="relative text-center">
              <div className="bg-brand-navy text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 z-10 relative">
                1
              </div>
              <div className="hidden md:block absolute top-6 left-1/2 w-full h-1 bg-brand-navy/20 z-0"></div>
              <h3 className="text-lg font-bold text-brand-navy mb-2">Apply Online</h3>
              <p className="text-gray-600">
                Submit your application through our online form or email us your resume.
              </p>
            </div>

            <div className="relative text-center">
              <div className="bg-brand-navy text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 z-10 relative">
                2
              </div>
              <div className="hidden md:block absolute top-6 left-1/2 w-full h-1 bg-brand-navy/20 z-0"></div>
              <h3 className="text-lg font-bold text-brand-navy mb-2">Phone Interview</h3>
              <p className="text-gray-600">
                If your qualifications match our needs, we'll schedule a phone interview.
              </p>
            </div>

            <div className="relative text-center">
              <div className="bg-brand-navy text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 z-10 relative">
                3
              </div>
              <div className="hidden md:block absolute top-6 left-1/2 w-full h-1 bg-brand-navy/20 z-0"></div>
              <h3 className="text-lg font-bold text-brand-navy mb-2">In-Person Interview</h3>
              <p className="text-gray-600">
                Meet our team in person and learn more about the role and our company.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-brand-red text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-bold text-brand-navy mb-2">Job Offer</h3>
              <p className="text-gray-600">
                If you're a good fit, we'll make you an offer to join our team!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-navy text-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Join Our Team?</h2>
            <p className="text-xl mb-8 text-white/90">
              We're looking for hardworking, customer-focused individuals to help us grow. Apply today!
            </p>
            <Button asChild size="lg" className="bg-brand-red hover:bg-opacity-90">
              <a href="#openings">View Open Positions</a>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Careers;
