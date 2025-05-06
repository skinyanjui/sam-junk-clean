
import { Button } from '@/components/ui/button';

const CareerHero = () => {
  return (
    <section className="pt-28 pb-16 bg-brand-navy text-white">
      <div className="container-custom">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Uncle Sam's Team</h1>
          <p className="text-xl mb-6 text-white/90 max-w-3xl mx-auto">
            Uncle Sam wants YOU to join our patriotic team of junk removal professionals! We're looking for dedicated individuals who take pride in their work and want to make a difference in their community.
          </p>
          <Button asChild size="lg" className="bg-brand-red hover:bg-opacity-90">
            <a href="#openings">View Open Positions</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CareerHero;
