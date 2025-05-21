
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogPostHeaderProps {
  category: string;
  title: string;
  author: string;
  date: string;
}

const BlogPostHeader = ({ category, title, author, date }: BlogPostHeaderProps) => {
  return (
    <header className="mb-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="text-gray-600 pl-0 hover:bg-transparent hover:text-brand-red">
          <Link to="/blog" className="flex items-center">
            <ArrowLeft size={18} className="mr-2" />
            Back to all articles
          </Link>
        </Button>
      </div>
      
      <span className="text-brand-red font-medium">{category}</span>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mt-2 mb-4">{title}</h1>
      
      <div className="flex flex-wrap items-center text-gray-600 gap-x-6 gap-y-2">
        <div className="flex items-center">
          <User size={16} className="mr-2" aria-hidden="true" />
          <span>{author}</span>
        </div>
        <div className="flex items-center">
          <Calendar size={16} className="mr-2" aria-hidden="true" />
          <span>{date}</span>
        </div>
      </div>
    </header>
  );
};

export default BlogPostHeader;
