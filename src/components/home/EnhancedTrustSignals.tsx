
import { useEffect, useState } from 'react';
import { Shield, Award, Star, Users, Clock, CheckCircle, Phone, Calendar } from 'lucide-react';
import { fetchTrustSignals, fetchCompanyStats } from '@/integrations/supabase/siteContentService';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PHONE_NUMBER } from '@/utils/contact-info';

const EnhancedTrustSignals = () => {
  const [trustData, setTrustData] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [availableToday, setAvailableToday] = useState(true);

  useEffect(() => {
    const loadTrustData = async () => {
      try {
        const [trustSignals, companyStats] = await Promise.all([
          fetchTrustSignals(),
          fetchCompanyStats()
        ]);
        setTrustData(trustSignals);
        setStats(companyStats);
      } catch (error) {
        console.error('Error loading trust data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTrustData();
  }, []);

  if (isLoading || !trustData || !stats) {
    return null;
  }

  return (
    <section className="py-8 bg-white border-t border-gray-100">
      <div className="container-custom">
        {/* Urgency Banner */}
        <div className="bg-brand-red text-white py-3 px-6 rounded-lg mb-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Clock className="h-4 w-4" />
            <span className="font-bold">SAME-DAY SERVICE AVAILABLE</span>
          </div>
          <p className="text-sm opacity-90">
            {availableToday ? "3 spots remaining for today" : "Next available: Tomorrow 8 AM"} • 
            Call now to secure your slot!
          </p>
        </div>

        {/* Trust Credentials */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <Shield className="h-8 w-8 text-brand-red mx-auto mb-2" />
            <h3 className="font-semibold text-sm text-brand-navy">Licensed & Fully Insured</h3>
            <p className="text-xs text-gray-600">{trustData.insurance.liability} Coverage</p>
            <Badge variant="outline" className="mt-1 text-xs">License #JR-2025-INV</Badge>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <Award className="h-8 w-8 text-brand-red mx-auto mb-2" />
            <h3 className="font-semibold text-sm text-brand-navy">Veteran Owned & Operated</h3>
            <p className="text-xs text-gray-600">U.S. Marine Corps Veteran</p>
            <Badge variant="outline" className="mt-1 text-xs">Founded in 2025</Badge>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <Star className="h-8 w-8 text-brand-red mx-auto mb-2" />
            <h3 className="font-semibold text-sm text-brand-navy">{stats.customer_satisfaction} Rating</h3>
            <p className="text-xs text-gray-600">{stats.total_reviews} Verified Reviews</p>
            <Badge variant="outline" className="mt-1 text-xs">Google Guaranteed</Badge>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <Users className="h-8 w-8 text-brand-red mx-auto mb-2" />
            <h3 className="font-semibold text-sm text-brand-navy">{stats.customers_served}+ Customers</h3>
            <p className="text-xs text-gray-600">Since 2025</p>
            <Badge variant="outline" className="mt-1 text-xs">BBB A+ Rating</Badge>
          </div>
        </div>

        {/* Social Proof & Statistics */}
        <div className="bg-brand-navy text-white py-6 px-8 rounded-lg mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-brand-red">{stats.years_in_business}+</div>
              <div className="text-sm">Years Serving Tri-State</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-red">{stats.customers_served.toLocaleString()}+</div>
              <div className="text-sm">Happy Customers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-red">95%</div>
              <div className="text-sm">Recycling Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-red">{stats.same_day_completion_rate}%</div>
              <div className="text-sm">Same-Day Completion</div>
            </div>
          </div>
        </div>

        {/* Multiple Conversion Paths */}
        <div className="bg-brand-gray p-6 rounded-lg">
          <h3 className="text-xl font-bold text-brand-navy mb-4 text-center">
            Ready to Experience the Uncle Sam Difference?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button size="lg" className="bg-brand-red hover:bg-brand-red/90 h-auto py-4 flex-col">
              <Phone className="h-5 w-5 mb-1" />
              <span className="font-bold">Call Now</span>
              <span className="text-sm opacity-90">{PHONE_NUMBER}</span>
            </Button>
            
            <Button size="lg" variant="outline" className="border-brand-navy text-brand-navy h-auto py-4 flex-col">
              <Calendar className="h-5 w-5 mb-1" />
              <span className="font-bold">Free Quote</span>
              <span className="text-sm opacity-70">No Obligation</span>
            </Button>
            
            <Button size="lg" variant="outline" className="border-brand-navy text-brand-navy h-auto py-4 flex-col">
              <CheckCircle className="h-5 w-5 mb-1" />
              <span className="font-bold">Same-Day Service</span>
              <span className="text-sm opacity-70">Flexible Scheduling</span>
            </Button>
          </div>
        </div>

        {/* Recent Activity Social Proof */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-800 px-4 py-2 rounded-full text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Just served a customer in Henderson • 2 hours ago</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedTrustSignals;
