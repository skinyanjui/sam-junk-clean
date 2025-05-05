
import { useLocation, Link } from 'react-router-dom';
import { 
  Breadcrumb as BreadcrumbUI,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Home as HomeIcon } from 'lucide-react';

export const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  
  // Don't show breadcrumbs on homepage
  if (pathnames.length === 0) {
    return null;
  }

  // Create page name mapping for better display
  const pageNameMap: Record<string, string> = {
    'services': 'Services',
    'pricing': 'Pricing',
    'quote': 'Get a Quote',
    'about': 'About Us',
    'contact': 'Contact',
    'privacy': 'Privacy Policy',
    'terms': 'Terms of Service',
    'faq': 'FAQ',
    'blog': 'Blog',
    'careers': 'Careers',
    'locations': 'Locations'
  };

  return (
    <div className="container-custom">
      <BreadcrumbUI>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">
                <HomeIcon className="h-4 w-4" />
                <span className="sr-only">Home</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const displayName = pageNameMap[name] || name.charAt(0).toUpperCase() + name.slice(1);
            
            return isLast ? (
              <BreadcrumbItem key={name}>
                <BreadcrumbPage>{displayName}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem key={name}>
                <BreadcrumbLink asChild>
                  <Link to={routeTo}>{displayName}</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </BreadcrumbUI>
    </div>
  );
};
