import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FooterCopyrightProps } from './types';

const FooterCopyright: React.FC<FooterCopyrightProps> = ({ currentYear }) => {
  const { t } = useTranslation();

  return (
    <div className="pt-6 mt-4 border-t border-white/10 text-xs text-gray-400">
      <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
        <p className="text-center sm:text-left mt-4 sm:mt-0">
          {t('footer.copyright', { year: currentYear })} • Uncle Sam Junk Removal
        </p>
        
        {/* Mobile and desktop optimized links */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-0">
          <Link 
            to="/privacy" 
            className="text-gray-400 hover:text-white transition-colors duration-200 px-3 py-1.5 rounded-md hover:bg-white/5 min-w-[80px] text-center"
          >
            {t('footer.privacyPolicy')}
          </Link>
          <span className="hidden sm:inline mx-1 text-gray-600 self-center">•</span>
          <Link 
            to="/terms" 
            className="text-gray-400 hover:text-white transition-colors duration-200 px-3 py-1.5 rounded-md hover:bg-white/5 min-w-[80px] text-center"
          >
            {t('footer.termsOfService')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterCopyright;