
import { Button } from '@/components/ui/button';
import JobCard, { JobListing } from './JobCard';

interface JobListingsProps {
  jobListings: JobListing[];
  onApply: (jobId: number) => void;
}

const JobListings = ({ jobListings, onApply }: JobListingsProps) => {
  return (
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
            <JobCard key={job.id} job={job} onApply={onApply} />
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
  );
};

export default JobListings;
