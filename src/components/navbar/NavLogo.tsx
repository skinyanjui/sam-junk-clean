
import { Link } from 'react-router-dom';

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/lovable-uploads/78c1523b-6914-4dad-8114-e021500b535e.png" 
        alt="Uncle Sam Junk Removal" 
        className="h-16 md:h-20"
      />
    </Link>
  );
};

export default NavLogo;
