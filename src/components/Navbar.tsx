
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Get a Quote', path: '/quote' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-1' : 'bg-white/95 py-2'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/4cf42708-88ba-4818-a535-0ad1dba464c4.png" 
            alt="Uncle Sam Junk Removal" 
            className="h-20 md:h-24"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 font-medium transition-colors hover:text-brand-red text-gray-800 ${
                location.pathname === link.path
                  ? 'text-brand-red font-semibold'
                  : 'text-gray-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a 
            href="tel:+18005551234" 
            className="ml-4 flex items-center gap-2 bg-brand-red text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all"
          >
            <Phone size={18} />
            <span className="font-medium">(800) 555-1234</span>
          </a>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden">
          <a 
            href="tel:+18005551234" 
            className="mr-4 bg-brand-red text-white p-2 rounded-full hover:bg-opacity-90"
            aria-label="Call us"
          >
            <Phone size={20} />
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-brand-navy p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col container-custom pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-3 px-2 border-b border-gray-100 font-medium ${
                  location.pathname === link.path
                    ? 'text-brand-red'
                    : 'text-brand-navy'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4">
              <Button className="w-full bg-brand-red hover:bg-opacity-90">
                Get a Free Quote
              </Button>
            </div>
          </nav>
        </div>
      )}
      
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 w-full md:hidden bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] p-3 z-40">
        <Button 
          asChild
          className="w-full bg-brand-red hover:bg-opacity-90 text-white"
        >
          <Link to="/quote">Get a Free Quote</Link>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
