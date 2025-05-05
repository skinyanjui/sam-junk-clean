
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const serviceAreas = [
    'Evansville, IN',
    'Newburgh, IN',
    'Henderson, KY',
    'Owensboro, KY',
    'Mt. Carmel, IL',
    'Princeton, IN',
    'Boonville, IN',
    'Vincennes, IN',
    'Madisonville, KY',
    'Carmi, IL',
    'Fairfield, IL',
    'Grayville, IL',
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="flex flex-col items-center md:items-start">
            <img 
              src="/lovable-uploads/acf3ac1c-8d3b-4125-896d-7a7416fab53a.png" 
              alt="Uncle Sam Junk Removal" 
              className="h-16 mb-4"
            />
            <p className="text-gray-300 mb-4 text-center md:text-left">
              Veteran-owned junk removal service proudly serving the Tri-State area with patriotic pride and professional service.
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 relative">
              <span className="relative inline-block after:content-[''] after:absolute after:w-12 after:h-1 after:bg-brand-red after:left-0 after:-bottom-2 md:after:mx-0 after:mx-auto after:right-0">Quick Links</span>
            </h3>
            <ul className="space-y-2 mt-6">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors hover:underline">Home</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors hover:underline">Services</Link></li>
              <li><Link to="/quote" className="text-gray-300 hover:text-white transition-colors hover:underline">Get a Quote</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors hover:underline">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors hover:underline">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors hover:underline">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Service Areas - Now in 2 columns for better mobile display */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 relative">
              <span className="relative inline-block after:content-[''] after:absolute after:w-12 after:h-1 after:bg-brand-red after:left-0 after:-bottom-2 md:after:mx-0 after:mx-auto after:right-0">Service Areas</span>
            </h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 mt-6">
              {serviceAreas.map((area) => (
                <div key={area}>
                  <span className="text-gray-300 text-sm">{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 relative">
              <span className="relative inline-block after:content-[''] after:absolute after:w-12 after:h-1 after:bg-brand-red after:left-0 after:-bottom-2 md:after:mx-0 after:mx-auto after:right-0">Contact Us</span>
            </h3>
            <ul className="space-y-4 mt-6">
              <li className="flex items-center justify-center md:justify-start">
                <Phone size={18} className="mr-2 text-brand-red" />
                <a href="tel:+18005551234" className="text-gray-300 hover:text-white">(800) 555-1234</a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Mail size={18} className="mr-2 text-brand-red" />
                <a href="mailto:info@unclesamjunk.com" className="text-gray-300 hover:text-white">info@unclesamjunk.com</a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <MapPin size={18} className="mr-2 text-brand-red" />
                <span className="text-gray-300">Hours: Mon-Sat, 7AM-7PM</span>
              </li>
            </ul>
            <Link to="/quote" className="inline-block mt-4 bg-brand-red hover:bg-opacity-90 text-white py-2 px-4 rounded transition-colors">
              Request a Quote
            </Link>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-6 border-t border-white/20 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-3 md:mb-0">© {currentYear} Uncle Sam Junk Removal. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
