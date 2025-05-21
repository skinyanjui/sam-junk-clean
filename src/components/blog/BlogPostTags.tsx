
interface BlogPostTagsProps {
  tags: string[];
}

const BlogPostTags = ({ tags }: BlogPostTagsProps) => {
  const displayTags = tags && tags.length > 0 
    ? tags 
    : ['Junk Removal', 'Recycling', 'Home Improvement', 'Decluttering'];
    
  return (
    <div className="mt-10 pt-6 border-t border-gray-200">
      <h3 className="font-medium mb-3">Related Topics</h3>
      <div className="flex flex-wrap gap-2">
        {displayTags.map((tag: string) => (
          <span 
            key={tag} 
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlogPostTags;
