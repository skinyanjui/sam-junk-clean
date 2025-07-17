
import { Link } from 'react-router-dom';

const BlogSidebar = () => {
  return (
    <aside aria-labelledby="popular-articles-heading">
      <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
        <h3 id="popular-articles-heading" className="font-bold text-lg mb-4">Popular Articles</h3>
        <div className="space-y-4">
          <Link to="/blog/dispose-electronic-waste" className="block group pb-4">
            <h4 className="font-medium group-hover:text-brand-red transition-colors">How to Properly Dispose of Electronic Waste</h4>
            <p className="text-sm text-gray-500">May 2, 2025</p>
          </Link>
          
          <Link to="/blog/cost-of-hoarding" className="block group py-4">
            <h4 className="font-medium group-hover:text-brand-red transition-colors">The Cost of Hoarding: Financial and Emotional Impact</h4>
            <p className="text-sm text-gray-500">April 25, 2025</p>
          </Link>
          
          <Link to="/blog/spring-cleaning-checklist" className="block group pt-4">
            <h4 className="font-medium group-hover:text-brand-red transition-colors">Spring Cleaning: The Ultimate Checklist</h4>
            <p className="text-sm text-gray-500">March 28, 2025</p>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
