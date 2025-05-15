
import { Button } from '@/components/ui/button';

interface BlogCategoriesProps {
  categories: string[];
  activeCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const BlogCategories = ({ categories, activeCategory, onSelectCategory }: BlogCategoriesProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={activeCategory === null ? "default" : "outline"}
        onClick={() => onSelectCategory(null)}
        className={`${
          activeCategory === null ? 'bg-brand-red text-white' : 'bg-white'
        } rounded-full`}
      >
        All
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          onClick={() => onSelectCategory(category)}
          className={`${
            activeCategory === category ? 'bg-brand-red text-white' : 'bg-white'
          } rounded-full`}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default BlogCategories;
