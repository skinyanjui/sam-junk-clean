
import { Facebook, Twitter, Linkedin, Link } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonsProps {
  title?: string;
  url?: string;
}

const ShareButtons = ({ title = document.title, url = window.location.href }: ShareButtonsProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "Link copied",
        description: "URL copied to clipboard",
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast({
        title: "Copy failed",
        description: "Could not copy the URL to clipboard",
        variant: "destructive",
      });
    }
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, 
      'facebook-share-dialog', 
      'width=626,height=436');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, 
      'twitter-share-dialog', 
      'width=626,height=436');
  };

  const shareOnLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, 
      'linkedin-share-dialog', 
      'width=626,height=436');
  };

  return (
    <div className="mt-8">
      <h3 className="font-medium mb-3">Share this article</h3>
      <div className="flex items-center space-x-4">
        <button 
          onClick={shareOnFacebook}
          aria-label="Share on Facebook" 
          className="text-gray-500 hover:text-[#1877F2] transition-colors p-2 rounded-full hover:bg-gray-100"
        >
          <Facebook size={20} />
        </button>
        <button 
          onClick={shareOnTwitter}
          aria-label="Share on Twitter" 
          className="text-gray-500 hover:text-[#1DA1F2] transition-colors p-2 rounded-full hover:bg-gray-100"
        >
          <Twitter size={20} />
        </button>
        <button 
          onClick={shareOnLinkedin}
          aria-label="Share on LinkedIn" 
          className="text-gray-500 hover:text-[#0A66C2] transition-colors p-2 rounded-full hover:bg-gray-100"
        >
          <Linkedin size={20} />
        </button>
        <button 
          onClick={handleCopyLink}
          aria-label="Copy link" 
          className="text-gray-500 hover:text-brand-navy transition-colors p-2 rounded-full hover:bg-gray-100"
        >
          <Link size={20} />
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;
