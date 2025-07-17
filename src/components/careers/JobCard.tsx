
import { Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface JobListing {
  id: string; // Changed from number to string for UUIDs
  title: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

interface JobCardProps {
  job: JobListing;
  onApply: (jobId: string) => void; // Changed from number to string
}

const JobCard = ({ job, onApply }: JobCardProps) => {
  return (
    <Card 
      variant="interactive"
      size="lg"
      elevation="sm"
      interactive={true}
      hasTabs={true}
      className="overflow-hidden hover:shadow-md transition-shadow flex flex-col"
    >
      <CardHeader size="lg">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <CardTitle size="lg" className="text-brand-navy">{job.title}</CardTitle>
            <CardDescription size="lg">
              {job.type} • {job.location}
            </CardDescription>
          </div>
          <Briefcase size={24} className="text-brand-red" />
        </div>
      </CardHeader>
      <CardContent size="lg" className="flex-grow">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3 card-tabs">
            <TabsTrigger value="description" className="card-tab">Description</TabsTrigger>
            <TabsTrigger value="requirements" className="card-tab">Requirements</TabsTrigger>
            <TabsTrigger value="benefits" className="card-tab">Benefits</TabsTrigger>
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
      <CardFooter size="lg" className="flex justify-end">
        <Button 
          className="w-full md:w-auto bg-brand-red hover:bg-opacity-90"
          onClick={() => onApply(job.id)}
        >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
