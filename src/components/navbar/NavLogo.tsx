
import { Link } from 'react-router-dom';

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center py-0.5">
      <img 
        src="/lovable-uploads/b102b174-1562-4730-9825-d6bf5822fef0.png" 
        alt="Uncle Sam Junk Removal" 
        className="h-12 md:h-14 object-contain"
      />
    </Link>
  );
};

export default NavLogo;
