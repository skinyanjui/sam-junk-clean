
import { Button } from '@/components/ui/button';

const CareerHero = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-brand-navy to-brand-navy/90 text-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Uncle Sam's Team</h1>
            <p className="text-xl mb-6 text-white/90">
              Uncle Sam wants YOU to join our patriotic team of junk removal professionals! We're looking for dedicated individuals who take pride in their work and want to make a difference in their community.
            </p>
            <Button asChild size="lg" className="bg-brand-red hover:bg-opacity-90">
              <a href="#openings">View Open Positions</a>
            </Button>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1551038247-3d9af20df552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
              alt="Team working together" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerHero;
