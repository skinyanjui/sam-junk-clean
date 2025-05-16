
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center transition-all duration-300">
      <motion.img 
        initial={{ opacity: 0.8 }}
        whileHover={{ scale: 1.03, opacity: 1 }}
        transition={{ duration: 0.3 }}
        src="/lovable-uploads/92c7287f-ec89-4c0f-9ad4-a2ed585a70a3.png" 
        alt="Uncle Sam Junk Removal" 
        className="h-16 md:h-20 object-contain" 
      />
    </Link>
  );
};

export default NavLogo;
