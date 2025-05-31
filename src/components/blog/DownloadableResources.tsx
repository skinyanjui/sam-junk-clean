
import { Download, FileText, CheckCircle, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Resource {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  downloadUrl: string;
  fileSize: string;
  fileType: string;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Junk Removal Preparation Checklist',
    description: 'Complete step-by-step checklist to prepare your home for efficient junk removal service.',
    icon: CheckCircle,
    downloadUrl: '#', // This would be a real URL to a PDF
    fileSize: '2.3 MB',
    fileType: 'PDF'
  },
  {
    id: '2',
    title: 'Evansville Area Pricing Guide 2025',
    description: 'Transparent pricing guide for all junk removal services in the Tri-State area.',
    icon: Calculator,
    downloadUrl: '#', // This would be a real URL to a PDF
    fileSize: '1.8 MB',
    fileType: 'PDF'
  },
  {
    id: '3',
    title: 'Donation Centers Directory',
    description: 'Complete directory of local donation centers and their accepted items in our service area.',
    icon: FileText,
    downloadUrl: '#', // This would be a real URL to a PDF
    fileSize: '1.2 MB',
    fileType: 'PDF'
  },
  {
    id: '4',
    title: 'Home Decluttering Worksheet',
    description: 'Room-by-room decluttering worksheet to help you organize before your junk removal appointment.',
    icon: CheckCircle,
    downloadUrl: '#', // This would be a real URL to a PDF
    fileSize: '956 KB',
    fileType: 'PDF'
  }
];

const DownloadableResources = () => {
  const handleDownload = (resource: Resource) => {
    // In a real implementation, this would track the download
    console.log(`Downloading ${resource.title}`);
    // For now, just show an alert since we don't have real files
    alert(`This would download: ${resource.title}\nIn a real implementation, this would be a PDF file.`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            Free Downloadable Resources
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Download our comprehensive guides and checklists to make your junk removal experience smooth and efficient.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource) => {
            const IconComponent = resource.icon;
            return (
              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-red/10 rounded-lg">
                        <IconComponent className="text-brand-red" size={24} />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-brand-navy">
                          {resource.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {resource.fileType}
                          </span>
                          <span className="text-xs text-gray-500">{resource.fileSize}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4">
                    {resource.description}
                  </p>
                  
                  <Button 
                    onClick={() => handleDownload(resource)}
                    className="w-full bg-brand-red hover:bg-brand-red/90 text-white flex items-center gap-2"
                  >
                    <Download size={16} />
                    Download Free Guide
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Newsletter signup CTA */}
        <div className="mt-12 text-center p-8 bg-white rounded-lg shadow-sm">
          <h3 className="text-2xl font-bold text-brand-navy mb-4">
            Want More Tips and Resources?
          </h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Subscribe to our newsletter for exclusive junk removal tips, seasonal cleaning guides, and special offers for Tri-State area residents.
          </p>
          <Button className="bg-brand-red hover:bg-brand-red/90 text-white px-8 py-3">
            Subscribe to Newsletter
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DownloadableResources;

