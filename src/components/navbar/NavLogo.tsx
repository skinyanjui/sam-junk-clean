
import { Link } from 'react-router-dom';

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/lovable-uploads/4cf42708-88ba-4818-a535-0ad1dba464c4.png" 
        alt="Uncle Sam Junk Removal" 
        className="h-16 md:h-18"
      />
    </Link>
  );
};

export default NavLogo;
