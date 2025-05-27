
import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import JobApplicationForm from '@/components/careers/JobApplicationForm';
import CareerHero from '@/components/careers/CareerHero';
import WhyWorkWithUs from '@/components/careers/WhyWorkWithUs';
import JobListings from '@/components/careers/JobListings';
import ApplicationProcess from '@/components/careers/ApplicationProcess';
import CareersCta from '@/components/careers/CareersCta';
// Removed: import { jobListings } from '@/components/careers/jobData';
import { fetchActiveJobListings, JobListingDb } from '@/integrations/supabase/jobService';
import { JobListing as JobCardListing } from '@/components/careers/JobCard'; // For type mapping

const Careers = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null); // Changed to string for UUID
  const [jobs, setJobs] = useState<JobListingDb[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJobs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedJobs = await fetchActiveJobListings();
        setJobs(fetchedJobs);
      } catch (e) {
        console.error("Error fetching job listings:", e);
        setError("Failed to load job openings. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    loadJobs();
  }, []);

  const handleOpenApplicationForm = (jobId: string) => { // Changed to string for UUID
    setSelectedJobId(jobId);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedJobId(null); // Reset selected job
  };

  // Map JobListingDb to JobCardListing
  const mappedJobs: JobCardListing[] = jobs.map(job => ({
    id: job.id, // Pass UUID string
    title: job.title,
    type: job.type || 'N/A',
    location: job.location || 'N/A',
    description: job.description || 'No description available.',
    requirements: job.requirements || [],
    benefits: job.benefits || [],
  }));
  
  // Prepare positions for JobApplicationForm, ensuring id is string
  const applicationFormPositions = jobs.map(job => ({ id: job.id, title: job.title }));


  return (
    <PageLayout>
      <SEO 
        title="Careers | Uncle Sam Junk Removal"
        description="Join our patriotic team of junk removal professionals. View current job openings, benefits, and apply online. Uncle Sam wants YOU!"
        keywords="junk removal jobs, Evansville job openings, Tri-State area employment, Uncle Sam Junk Removal careers, job applications, veteran owned business jobs"
      />

      <CareerHero />
      <WhyWorkWithUs />
      
      {isLoading && (
        <div className="container-custom py-12 text-center">
          <p className="text-xl text-brand-navy">Loading job listings...</p>
        </div>
      )}
      {!isLoading && error && (
        <div className="container-custom py-12 text-center">
          <p className="text-xl text-red-600">{error}</p>
        </div>
      )}
      {!isLoading && !error && mappedJobs.length === 0 && (
        <div className="container-custom py-12 text-center">
          <p className="text-xl text-brand-navy">No job openings currently available. Please check back soon!</p>
        </div>
      )}
      {!isLoading && !error && mappedJobs.length > 0 && (
        <JobListings jobListings={mappedJobs} onApply={handleOpenApplicationForm} />
      )}
      
      <ApplicationProcess />
      <CareersCta />

      {/* Related Resources Section */}
      <section className="py-16 bg-brand-gray" aria-labelledby="learn-more-heading">
        <div className="container-custom">
          <h2 id="learn-more-heading" className="text-3xl font-bold text-center text-brand-navy mb-8">Learn More About Us</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-brand-navy mb-3">Our Company Values</h3>
              <p className="text-gray-600 mb-4">
                Learn about our mission, vision, and the principles that guide our work every day.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/about" className="flex items-center justify-center">
                  Visit Our About Page <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-brand-navy mb-3">Our Service Areas</h3>
              <p className="text-gray-600 mb-4">
                Discover all the communities we serve throughout the Tri-State area.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/locations" className="flex items-center justify-center">
                  View Service Locations <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-brand-navy mb-3">Recent Company News</h3>
              <p className="text-gray-600 mb-4">
                Stay up to date with our latest announcements and industry insights on our blog.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/blog" className="flex items-center justify-center">
                  Read Our Blog <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-step Application Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <JobApplicationForm 
            positions={applicationFormPositions} // Use mapped positions with string IDs
            onClose={handleCloseDialog}
            preselectedPosition={selectedJobId || undefined} // Will now be string | undefined
          />
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Careers;
