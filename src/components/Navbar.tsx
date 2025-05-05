import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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
    setOpenDropdown(null);
  }, [location]);

  // Navigation structure with dropdowns - updated and consolidated
  const navStructure = [
    { name: 'Home', path: '/', hasDropdown: false },
    { 
      name: 'Services', 
      path: '/services', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Residential', path: '/services#residential' },
        { name: 'Commercial', path: '/services#commercial' },
        { name: 'Recycling', path: '/services#recycling' },
        { name: 'Specialized', path: '/services#specialized' },
        { name: 'Pricing', path: '/pricing' }
      ]
    },
    { 
      name: 'Service Locations', 
      path: '/locations', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Indiana', path: '/locations#indiana' },
        { name: 'Kentucky', path: '/locations#kentucky' },
        { name: 'Illinois', path: '/locations#illinois' }
      ]
    },
    { 
      name: 'About', 
      path: '/about', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Our Story', path: '/about#story' },
        { name: 'Our Team', path: '/about#team' },
        { name: 'Veterans', path: '/about#veterans' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Blog', path: '/blog' },
        { name: 'Careers', path: '/careers' }
      ]
    },
    { name: 'Contact', path: '/contact', hasDropdown: false },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-0.5' : 'bg-white/95 py-1'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo - reduced size */}
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/4cf42708-88ba-4818-a535-0ad1dba464c4.png" 
            alt="Uncle Sam Junk Removal" 
            className="h-16 md:h-18"
          />
        </Link>

        {/* Desktop Navigation with Dropdowns */}
        <nav className="hidden md:flex items-center space-x-1">
          {navStructure.map((item) => (
            item.hasDropdown ? (
              <DropdownMenu key={item.path}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`px-2.5 py-1.5 text-sm font-medium transition-colors hover:text-brand-red text-gray-800 flex items-center ${
                      location.pathname === item.path
                        ? 'text-brand-red font-semibold'
                        : 'text-gray-800'
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" sideOffset={5} className="bg-white border border-gray-100 shadow-md">
                  {item.dropdownItems?.map((dropdownItem) => (
                    <DropdownMenuItem key={dropdownItem.path} asChild>
                      <Link
                        to={dropdownItem.path}
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:text-brand-red hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        {dropdownItem.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`px-2.5 py-1.5 text-sm font-medium transition-colors hover:text-brand-red text-gray-800 ${
                  location.pathname === item.path
                    ? 'text-brand-red font-semibold'
                    : 'text-gray-800'
                }`}
              >
                {item.name}
              </Link>
            )
          ))}
          <a 
            href="tel:+18005551234" 
            className="ml-3 flex items-center gap-1.5 bg-brand-red text-white px-3 py-1.5 rounded-md hover:bg-opacity-90 transition-all"
          >
            <Phone size={16} />
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
            <Phone size={18} />
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-brand-navy p-1.5"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Accordions */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col container-custom pb-4">
            {navStructure.map((item) => (
              <div key={item.path} className="border-b border-gray-100">
                {item.hasDropdown ? (
                  <div>
                    <button 
                      onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                      className={`flex justify-between items-center w-full py-2.5 px-2 font-medium ${
                        location.pathname === item.path
                          ? 'text-brand-red'
                          : 'text-brand-navy'
                      }`}
                    >
                      {item.name}
                      {openDropdown === item.name ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>
                    {openDropdown === item.name && (
                      <div className="ml-4 pb-2 border-t border-gray-50">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.path}
                            to={dropdownItem.path}
                            className="block py-2 px-4 text-gray-700 hover:text-brand-red"
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`block py-2.5 px-2 font-medium ${
                      location.pathname === item.path
                        ? 'text-brand-red'
                        : 'text-brand-navy'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-4">
              <Button asChild className="w-full bg-brand-red hover:bg-opacity-90">
                <Link to="/quote">Get a Free Quote</Link>
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
