
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import JobApplicationForm from '@/components/careers/JobApplicationForm';
import CareerHero from '@/components/careers/CareerHero';
import WhyWorkWithUs from '@/components/careers/WhyWorkWithUs';
import JobListings from '@/components/careers/JobListings';
import ApplicationProcess from '@/components/careers/ApplicationProcess';
import CareersCta from '@/components/careers/CareersCta';
import { jobListings } from '@/components/careers/jobData';

const Careers = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  const handleOpenApplicationForm = (jobId: number) => {
    setSelectedJobId(jobId);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <PageLayout>
      <SEO 
        title="Careers | Uncle Sam Junk Removal"
        description="Join our patriotic team of junk removal professionals. View current job openings, benefits, and apply online. Uncle Sam wants YOU!"
        keywords="junk removal jobs, Evansville job openings, Tri-State area employment, Uncle Sam Junk Removal careers, job applications, veteran owned business jobs"
      />

      <CareerHero />
      <WhyWorkWithUs />
      <JobListings jobListings={jobListings} onApply={handleOpenApplicationForm} />
      <ApplicationProcess />
      <CareersCta />

      {/* Application Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <JobApplicationForm 
            positions={jobListings.map(job => ({ id: job.id, title: job.title }))}
            onClose={handleCloseDialog}
            preselectedPosition={selectedJobId || undefined}
          />
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Careers;
