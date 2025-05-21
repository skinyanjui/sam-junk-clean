
import { Share2 } from 'lucide-react';

const ShareButtons = () => {
  return (
    <div className="mt-8 flex items-center space-x-4">
      <span className="font-medium">Share this article:</span>
      <button aria-label="Share on Facebook" className="text-gray-500 hover:text-brand-navy">
        <Share2 size={18} />
      </button>
      <button aria-label="Share on Twitter" className="text-gray-500 hover:text-brand-navy">
        <Share2 size={18} />
      </button>
      <button aria-label="Share on LinkedIn" className="text-gray-500 hover:text-brand-navy">
        <Share2 size={18} />
      </button>
    </div>
  );
};

export default ShareButtons;
