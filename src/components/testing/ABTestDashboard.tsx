import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BarChart, TrendingUp, Users, Target, AlertCircle, CheckCircle } from 'lucide-react';
import { useABTest } from './ABTestProvider';

interface TestMetrics {
  testId: string;
  testName: string;
  variants: VariantMetrics[];
  isActive: boolean;
  startDate: string;
  endDate?: string;
  totalParticipants: number;
  statisticalSignificance: number;
  winner?: string;
}

interface VariantMetrics {
  variantId: string;
  variantName: string;
  participants: number;
  conversions: number;
  conversionRate: number;
  confidence: number;
  isWinner: boolean;
  lift?: number;
}

const ABTestDashboard = () => {
  const [testMetrics, setTestMetrics] = useState<TestMetrics[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isUserInTest } = useABTest();

  // Mock data - in production, this would come from analytics API
  useEffect(() => {
    const mockMetrics: TestMetrics[] = [
      {
        testId: 'hero-cta-test',
        testName: 'Hero CTA Button Optimization',
        isActive: true,
        startDate: '2025-01-16',
        totalParticipants: 1247,
        statisticalSignificance: 95.2,
        variants: [
          {
            variantId: 'control',
            variantName: 'Control - Get Free Quote',
            participants: 623,
            conversions: 87,
            conversionRate: 13.96,
            confidence: 0,
            isWinner: false
          },
          {
            variantId: 'variant-a',
            variantName: 'Variant A - Get Instant Quote',
            participants: 624,
            conversions: 112,
            conversionRate: 17.95,
            confidence: 95.2,
            isWinner: true,
            lift: 28.6
          }
        ]
      },
      {
        testId: 'pricing-display-test',
        testName: 'Pricing Display Format',
        isActive: true,
        startDate: '2025-01-16',
        totalParticipants: 892,
        statisticalSignificance: 78.4,
        variants: [
          {
            variantId: 'control',
            variantName: 'Control - Range Format',
            participants: 446,
            conversions: 52,
            conversionRate: 11.66,
            confidence: 0,
            isWinner: false
          },
          {
            variantId: 'variant-a',
            variantName: 'Variant A - Starting At Format',
            participants: 446,
            conversions: 61,
            conversionRate: 13.68,
            confidence: 78.4,
            isWinner: false,
            lift: 17.3
          }
        ]
      },
      {
        testId: 'testimonial-layout-test',
        testName: 'Testimonial Section Layout',
        isActive: true,
        startDate: '2025-01-16',
        totalParticipants: 1456,
        statisticalSignificance: 89.7,
        variants: [
          {
            variantId: 'control',
            variantName: 'Control - Grid Layout',
            participants: 485,
            conversions: 43,
            conversionRate: 8.87,
            confidence: 0,
            isWinner: false
          },
          {
            variantId: 'variant-a',
            variantName: 'Variant A - Carousel Layout',
            participants: 481,
            conversions: 58,
            conversionRate: 12.06,
            confidence: 89.7,
            isWinner: true,
            lift: 35.9
          },
          {
            variantId: 'variant-b',
            variantName: 'Variant B - Single Featured',
            participants: 490,
            conversions: 51,
            conversionRate: 10.41,
            confidence: 67.2,
            isWinner: false,
            lift: 17.4
          }
        ]
      }
    ];

    setTimeout(() => {
      setTestMetrics(mockMetrics);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getSignificanceColor = (significance: number) => {
    if (significance >= 95) return 'text-green-600';
    if (significance >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSignificanceBadge = (significance: number) => {
    if (significance >= 95) return <Badge className="bg-green-100 text-green-800">High Confidence</Badge>;
    if (significance >= 80) return <Badge className="bg-yellow-100 text-yellow-800">Medium Confidence</Badge>;
    return <Badge className="bg-red-100 text-red-800">Low Confidence</Badge>;
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">A/B Test Dashboard</h1>
          <p className="text-gray-600">Monitor and analyze your conversion optimization tests</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {testMetrics.filter(t => t.isActive).length} Active Tests
        </Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tests</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testMetrics.filter(t => t.isActive).length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {testMetrics.reduce((sum, test) => sum + test.totalParticipants, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Significant Results</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {testMetrics.filter(t => t.statisticalSignificance >= 95).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Lift</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{(testMetrics
                .flatMap(t => t.variants)
                .filter(v => v.lift && v.lift > 0)
                .reduce((sum, v) => sum + (v.lift || 0), 0) / 
                testMetrics.flatMap(t => t.variants).filter(v => v.lift && v.lift > 0).length
              ).toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test Results */}
      <div className="space-y-6">
        {testMetrics.map(test => (
          <Card key={test.testId}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{test.testName}</CardTitle>
                  <CardDescription>
                    Started {new Date(test.startDate).toLocaleDateString()} • {test.totalParticipants.toLocaleString()} participants
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {getSignificanceBadge(test.statisticalSignificance)}
                  {test.isActive && <Badge>Active</Badge>}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="results" className="w-full">
                <TabsList>
                  <TabsTrigger value="results">Results</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>

                <TabsContent value="results" className="space-y-4">
                  {test.statisticalSignificance < 95 && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        This test hasn't reached statistical significance yet. Continue running for more reliable results.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="grid gap-4">
                    {test.variants.map(variant => (
                      <Card key={variant.variantId} className={variant.isWinner ? 'border-green-500 bg-green-50' : ''}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{variant.variantName}</h4>
                              {variant.isWinner && <Badge className="bg-green-100 text-green-800">Winner</Badge>}
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold">{variant.conversionRate.toFixed(2)}%</div>
                              <div className="text-sm text-gray-600">conversion rate</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <div className="text-gray-600">Participants</div>
                              <div className="font-medium">{variant.participants.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-gray-600">Conversions</div>
                              <div className="font-medium">{variant.conversions}</div>
                            </div>
                            <div>
                              <div className="text-gray-600">Confidence</div>
                              <div className={`font-medium ${getSignificanceColor(variant.confidence)}`}>
                                {variant.confidence.toFixed(1)}%
                              </div>
                            </div>
                          </div>

                          {variant.lift && (
                            <div className="mt-2 pt-2 border-t">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Lift vs Control</span>
                                <span className={`font-medium ${variant.lift > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {variant.lift > 0 ? '+' : ''}{variant.lift.toFixed(1)}%
                                </span>
                              </div>
                              <Progress 
                                value={Math.abs(variant.lift)} 
                                className="mt-1 h-2"
                              />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Test ID</div>
                      <div className="font-mono">{test.testId}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Statistical Significance</div>
                      <div className={getSignificanceColor(test.statisticalSignificance)}>
                        {test.statisticalSignificance.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600">Start Date</div>
                      <div>{new Date(test.startDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Status</div>
                      <div>{test.isActive ? 'Active' : 'Completed'}</div>
                    </div>
                  </div>

                  {test.statisticalSignificance >= 95 && test.variants.some(v => v.isWinner) && (
                    <Alert className="border-green-500 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        <strong>Recommendation:</strong> Implement the winning variant "{test.variants.find(v => v.isWinner)?.variantName}" 
                        for a potential {test.variants.find(v => v.isWinner)?.lift?.toFixed(1)}% improvement in conversions.
                      </AlertDescription>
                    </Alert>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ABTestDashboard;