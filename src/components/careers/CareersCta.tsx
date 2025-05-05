
import { Button } from '@/components/ui/button';

const CareersCta = () => {
  return (
    <section className="py-16 bg-brand-navy text-white">
      <div className="container-custom max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Team?</h2>
          <p className="text-xl mb-8 text-white/90">
            We're looking for hardworking, customer-focused individuals to help us grow. Apply today!
          </p>
          <Button asChild size="lg" className="bg-brand-red hover:bg-opacity-90">
            <a href="#openings">View Open Positions</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CareersCta;
