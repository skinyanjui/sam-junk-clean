import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const LocationsSeoContent = () => {
  return (
    <section className="py-6 bg-brand-gray">
      <div className="container-custom">
        <Card variant="standard" className="bg-white">
          <CardHeader className="pb-1">
            <CardTitle size="md">Junk Removal Throughout the Tri-State Area</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="mb-2">Uncle Sam Junk Removal is the Tri-State's premier junk removal service, proudly serving residential and commercial customers across Indiana, Kentucky, and Illinois. Our veteran-owned business takes pride in providing fast, efficient, and eco-friendly junk removal services to all communities in our service area.</p>
            
            <div className="grid md:grid-cols-3 gap-3 mt-3">
              <div>
                <h3 className="text-base font-semibold mb-1">Indiana Service Areas</h3>
                <p className="text-sm text-gray-700">Our Indiana junk removal services cover Vanderburgh County, Warrick County, Posey County, Gibson County, and Pike County, including the cities and towns of <strong>Evansville</strong>, <strong>Newburgh</strong>, <strong>Boonville</strong>, <strong>Princeton</strong>, <strong>Mt. Vernon</strong>, and <strong>Petersburg</strong>.</p>
              </div>
              
              <div>
                <h3 className="text-base font-semibold mb-1">Kentucky Service Areas</h3>
                <p className="text-sm text-gray-700">We provide full-service junk removal throughout Henderson County, Daviess County, Union County, and Webster County, serving the communities of <strong>Henderson</strong>, <strong>Owensboro</strong>, <strong>Morganfield</strong>, and <strong>Dixon</strong>.</p>
              </div>
              
              <div>
                <h3 className="text-base font-semibold mb-1">Illinois Service Areas</h3>
                <p className="text-sm text-gray-700">Our Illinois service region includes Wabash County, White County, and Edwards County, with regular service to <strong>Mt. Carmel</strong>, <strong>Grayville</strong>, and <strong>Albion</strong>.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};