import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/quote', label: 'Get a Quote' },
  { to: '/locations', label: 'Service Areas' },
  { to: '/blog', label: 'Blog' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

const CrossLinks = () => {
  const location = useLocation();
  const path = location.pathname;

  // Hide the current page from the list to avoid redundant links
  const filtered = links.filter(l => l.to !== path);

  return (
    <section className="bg-white border-t border-gray-200">
      <div className="container-custom py-4">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[13px]">
          {filtered.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-brand-navy hover:text-brand-red transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CrossLinks;