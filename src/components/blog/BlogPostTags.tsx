
import { Link } from 'react-router-dom';
import { Tag as TagIcon } from 'lucide-react';

interface BlogPostTagsProps {
  tags: string[];
}

const BlogPostTags = ({ tags }: BlogPostTagsProps) => {
  const displayTags = tags && tags.length > 0 
    ? tags 
    : ['Junk Removal', 'Recycling', 'Home Improvement', 'Decluttering'];
    
  return (
    <div className="mt-10 pt-6 border-t border-gray-200">
      <h3 className="font-medium mb-3 flex items-center">
        <TagIcon size={18} className="mr-2 text-gray-500" />
        Related Topics
      </h3>
      <div className="flex flex-wrap gap-2" aria-label="Article tags">
        {displayTags.map((tag: string) => (
          <Link 
            key={tag}
            to={`/blog?q=${encodeURIComponent(tag)}`} 
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPostTags;
