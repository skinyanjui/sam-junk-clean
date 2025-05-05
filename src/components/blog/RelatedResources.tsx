
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface RelatedLink {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon | null;
}

interface RelatedResourcesProps {
  links: RelatedLink[];
}

const RelatedResources = ({ links }: RelatedResourcesProps) => {
  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-brand-navy mb-8">Related Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {links.map((link, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start mb-3">
                  {link.icon && <link.icon size={24} className="mr-3 text-brand-red" />}
                  <h3 className="text-xl font-bold text-brand-navy">{link.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{link.description}</p>
                <Button variant="link" className="text-brand-red p-0" asChild>
                  <Link to={link.path}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedResources;
