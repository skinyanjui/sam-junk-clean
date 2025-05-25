
import { useEffect, useState } from 'react';
import { Shield, Award, Star, Users } from 'lucide-react';
import { fetchTrustSignals, fetchCompanyStats } from '@/integrations/supabase/siteContentService';

const TrustSignals = () => {
  const [trustData, setTrustData] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Shield className="h-8 w-8 text-brand-red mx-auto mb-2" />
            <h3 className="font-semibold text-sm text-brand-navy">Licensed & Insured</h3>
            <p className="text-xs text-gray-600">{trustData.insurance.liability} Coverage</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Award className="h-8 w-8 text-brand-red mx-auto mb-2" />
            <h3 className="font-semibold text-sm text-brand-navy">Veteran Owned</h3>
            <p className="text-xs text-gray-600">{trustData.veteran_status.owner_branch} Veteran</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Star className="h-8 w-8 text-brand-red mx-auto mb-2" />
            <h3 className="font-semibold text-sm text-brand-navy">{stats.customer_satisfaction} Rating</h3>
            <p className="text-xs text-gray-600">{stats.total_reviews} Reviews</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Users className="h-8 w-8 text-brand-red mx-auto mb-2" />
            <h3 className="font-semibold text-sm text-brand-navy">{stats.customers_served}+ Customers</h3>
            <p className="text-xs text-gray-600">Since 2018</p>
          </div>
        </div>

        {/* Statistics Bar */}
        <div className="bg-brand-navy text-white py-6 px-8 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-brand-red">{stats.years_in_business}+</div>
              <div className="text-sm">Years in Business</div>
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
              <div className="text-sm">Same-Day Service</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
