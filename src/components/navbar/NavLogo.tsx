
import { Link } from 'react-router-dom';

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/lovable-uploads/b102b174-1562-4730-9825-d6bf5822fef0.png" 
        alt="Uncle Sam Junk Removal" 
        className="h-16 md:h-20"
      />
    </Link>
  );
};

export default NavLogo;
