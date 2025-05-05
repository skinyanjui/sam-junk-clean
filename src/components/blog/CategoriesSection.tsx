
import { Button } from '@/components/ui/button';

interface CategoriesSectionProps {
  categories: string[];
  setSearchQuery: (query: string) => void;
}

const CategoriesSection = ({ categories, setSearchQuery }: CategoriesSectionProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-brand-navy mb-8">Browse by Category</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <Button 
              key={index}
              variant="outline" 
              className="border-brand-red text-brand-navy hover:bg-brand-red hover:text-white"
              onClick={() => setSearchQuery(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
