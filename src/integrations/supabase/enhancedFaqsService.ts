
import { supabase } from './client';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  priority: number;
  isPopular: boolean;
  lastUpdated: string;
  relatedQuestions?: string[];
}

export interface FaqCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  itemCount: number;
}

export const fetchEnhancedFaqs = async (): Promise<FaqItem[]> => {
  try {
    const comprehensiveFaqs: FaqItem[] = [
      // Pricing & Estimates
      {
        id: '1',
        question: 'How much does junk removal cost in Evansville?',
        answer: 'Our pricing is based on volume and type of items. Small loads start at $99, medium loads are $199-299, and large loads range from $399-599. We provide free, no-obligation estimates and honor our quoted prices with no hidden fees.',
        category: 'Pricing & Estimates',
        tags: ['pricing', 'cost', 'estimates', 'evansville'],
        priority: 1,
        isPopular: true,
        lastUpdated: new Date().toISOString(),
        relatedQuestions: ['2', '3', '4']
      },
      {
        id: '2',
        question: 'Do you charge extra for heavy items like appliances or furniture?',
        answer: 'Heavy items like refrigerators, washers, couches, and mattresses are included in our volume-based pricing. We only charge additional fees for hazardous materials or items requiring special disposal permits.',
        category: 'Pricing & Estimates',
        tags: ['appliances', 'furniture', 'heavy items', 'pricing'],
        priority: 2,
        isPopular: true,
        lastUpdated: new Date().toISOString(),
        relatedQuestions: ['1', '3', '12']
      },
      {
        id: '3',
        question: 'Is there a minimum charge for small items?',
        answer: 'Yes, we have a minimum charge of $99 for any service call. This covers our truck, labor, and disposal costs. However, this minimum often covers more items than customers expect!',
        category: 'Pricing & Estimates',
        tags: ['minimum charge', 'small items', 'pricing'],
        priority: 3,
        isPopular: false,
        lastUpdated: new Date().toISOString(),
        relatedQuestions: ['1', '2']
      },
      {
        id: '4',
        question: 'Do you offer discounts for veterans or seniors?',
        answer: 'Yes! As a veteran-owned business, we offer 10% discounts for veterans, active military, and seniors (65+). We also have special rates for repeat customers and referrals.',
        category: 'Pricing & Estimates',
        tags: ['discounts', 'veterans', 'seniors', 'military'],
        priority: 2,
        isPopular: true,
        lastUpdated: new Date().toISOString(),
        relatedQuestions: ['1']
      },

      // Services & Items
      {
        id: '5',
        question: 'What items do you remove?',
        answer: 'We remove almost everything: furniture, appliances, electronics, construction debris, yard waste, hot tubs, exercise equipment, and general household clutter. We cannot remove hazardous materials, chemicals, paint, or biological waste.',
        category: 'Services & Items',
        tags: ['what we remove', 'items', 'services'],
        priority: 1,
        isPopular: true,
        lastUpdated: new Date().toISOString(),
        relatedQuestions: ['6', '7', '8']
      },
      {
        id: '6',
        question: 'Do you remove construction debris and renovation waste?',
        answer: 'Yes, we specialize in construction debris removal including drywall, flooring, fixtures, cabinets, and general renovation waste. We can handle small DIY projects to large contractor cleanouts.',
        category: 'Services & Items',
        tags: ['construction debris', 'renovation', 'contractors'],
        priority: 2,
        isPopular: true,
        lastUpdated: new Date().toISOString(),
        relatedQuestions: ['5', '13']
      },
      {
        id: '7',
        question: 'Can you remove items from basements, attics, or upper floors?',
        answer: 'Absolutely! Our experienced team can safely remove items from any location in your home or business, including tight spaces, basements, attics, and multi-story buildings.',
        category: 'Services & Items',
        tags: ['basements', 'attics', 'stairs', 'difficult access'],
        priority: 3,
        isPopular: true,
        lastUpdated: new Date().toISOString(),
        relatedQuestions: ['5', '14']
      },
      {
        id: '8',
        question: 'What items can\'t you remove?',
        answer: 'We cannot remove hazardous materials (paint, chemicals, asbestos), biological waste, medical waste, radioactive materials, or anything illegal. We\'ll help you find proper disposal methods for these items.',
        category: 'Services & Items',
        tags: ['prohibited items', 'hazardous materials', 'restrictions'],
        priority: 2,
        isPopular: false,
        lastUpdated: new Date().toISOString(),
        relatedQuestions: ['5']
      },

      // Scheduling & Service
      {
        id: '9',
        question: 'Do you offer same-day service?',
        answer: 'Yes! We offer same-day service when our schedule allows, typically until 3 PM. We also provide next-day service and can schedule up to 2 weeks in advance for your convenience.',
        category: 'Scheduling & Service',
        tags: ['same-day', 'scheduling', 'availability'],
        priority: 1,
        isPopular: true,
        lastUpdated: new Date().toISOString(),
        relatedQuestions: ['10', '11']
      },
      {
        id: '10',
        question: 'What are your service hours?',
        answer: 'We operate Monday-Friday 7 AM to 7 PM, Saturdays 8 AM to 5 PM. We\'re available for emergency calls on Sundays. We offer flexible scheduling to work around your busy schedule.',
        category: 'Scheduling & Service',
        tags: ['hours', 'schedule', 'availability'],
        priority: 2,
        isPopular: true,
        lastUpdated: new Date().toISOString(),
        relatedQuestions: ['9']
      },
      {
        id: '11',
        question: 'How far in advance do I need to schedule?',
        answer: 'We can often accommodate same-day requests, but we recommend scheduling 24-48 hours in advance for guaranteed availability. During busy seasons (spring cleaning, holidays), book 3-5 days ahead.',
        category: 'Scheduling & Service',
        tags: ['advance booking', 'scheduling'],
        priority: 3,
        isPopular: false,
        lastUpdated: new Date().toISOString(),
        relatedQuestions: ['9', '10']
      },

      // Environmental & Disposal
      {
        id: '12',
        question: 'What happens to my junk after you remove it?',
        answer: 'We maintain a 95% recycling rate! Items go to donation centers, recycling facilities, or proper disposal sites. We partner with local charities and ensure environmentally responsible disposal.',
        category: 'Environmental & Disposal',
        tags: ['recycling', 'donation', 'environmental', 'disposal'],
        priority: 1,
        isPopular: true,
        lastUpdated: new Date().toISOString(),
        relatedQuestions: ['13', '5']
      },
      {
        id: '13',
        question: 'Do you donate items that are still usable?',
        answer: 'Yes! We work with local charities including Goodwill, Salvation Army, and Habitat for Humanity ReStore. Items in good condition are donated rather than disposed of whenever possible.',
        category: 'Environmental & Disposal',
        tags: ['donation', 'charity', 'usable items'],
        priority: 2,
        isPopular: true,
        lastUpdated: new Date().toISOString(),
        relatedQuestions: ['12']
      },

      // Process & Preparation
      {
        id: '14',
        question: 'Do I need to be present during the removal?',
        answer: 'We prefer that you\'re present to point out items and answer any questions, but it\'s not required. You can leave clear instructions and payment arrangements if you can\'t be there.',
        category: 'Process & Preparation',
        tags: ['presence required', 'process'],
        priority: 3,
        isPopular: false,
        lastUpdated: new Date().toISOString(),
        relatedQuestions: ['15']
      },
      {
        id: '15',
        question: 'How should I prepare for your arrival?',
        answer: 'Simply gather items in an accessible area and remove any personal belongings you want to keep. We\'ll handle the heavy lifting and moving. Clear a path to the items if possible.',
        category: 'Process & Preparation',
        tags: ['preparation', 'before service'],
        priority: 2,
        isPopular: true,
        lastUpdated: new Date().toISOString(),
        relatedQuestions: ['14', '7']
      },

      // Business & Trust
      {
        id: '16',
        question: 'Are you licensed and insured?',
        answer: 'Yes, we\'re fully licensed and carry $2 million in liability insurance plus workers\' compensation. We\'re also bonded and maintain all required permits for waste disposal.',
        category: 'Business & Trust',
        tags: ['licensed', 'insured', 'bonded', 'permits'],
        priority: 1,
        isPopular: true,
        lastUpdated: new Date().toISOString(),
        relatedQuestions: ['17']
      },
      {
        id: '17',
        question: 'What makes Uncle Sam Junk Removal different?',
        answer: 'We\'re veteran-owned with military precision and values. We offer the highest recycling rate in the area (95%), same-day service, transparent pricing, and genuine care for our community and environment.',
        category: 'Business & Trust',
        tags: ['veteran owned', 'differentiators', 'company values'],
        priority: 1,
        isPopular: true,
        lastUpdated: new Date().toISOString(),
        relatedQuestions: ['16', '4']
      },

      // Payment & Billing
      {
        id: '18',
        question: 'What payment methods do you accept?',
        answer: 'We accept cash, check, and all major credit cards (Visa, MasterCard, American Express, Discover). Payment is due upon completion of service.',
        category: 'Payment & Billing',
        tags: ['payment methods', 'billing'],
        priority: 2,
        isPopular: false,
        lastUpdated: new Date().toISOString(),
        relatedQuestions: ['1']
      },
      {
        id: '19',
        question: 'Do you require payment upfront?',
        answer: 'No, payment is due after the work is completed and you\'re satisfied with our service. We believe in earning your trust through quality work, not requiring payment in advance.',
        category: 'Payment & Billing',
        tags: ['payment timing', 'upfront payment'],
        priority: 3,
        isPopular: false,
        lastUpdated: new Date().toISOString(),
        relatedQuestions: ['18']
      },

      // Service Areas
      {
        id: '20',
        question: 'What areas do you serve?',
        answer: 'We serve the greater Tri-State area including Evansville, Henderson, Newburgh, Owensboro, Boonville, Princeton, Mt. Vernon, and surrounding communities within 50 miles of Evansville.',
        category: 'Service Areas',
        tags: ['service area', 'locations', 'tri-state'],
        priority: 1,
        isPopular: true,
        lastUpdated: new Date().toISOString(),
        relatedQuestions: ['21']
      },
      {
        id: '21',
        question: 'Do you charge extra for travel outside Evansville?',
        answer: 'We may add a small travel fee for locations over 25 miles from Evansville, typically $25-50 depending on distance. We\'ll always discuss any additional fees upfront.',
        category: 'Service Areas',
        tags: ['travel fees', 'distance charges'],
        priority: 2,
        isPopular: false,
        lastUpdated: new Date().toISOString(),
        relatedQuestions: ['20']
      }
    ];
    
    return comprehensiveFaqs;
  } catch (error) {
    console.error('Error fetching enhanced FAQs:', error);
    return [];
  }
};

export const fetchFaqCategories = async (): Promise<FaqCategory[]> => {
  try {
    const categories: FaqCategory[] = [
      {
        id: '1',
        name: 'Pricing & Estimates',
        description: 'Questions about costs, estimates, and pricing structure',
        icon: 'DollarSign',
        itemCount: 4
      },
      {
        id: '2',
        name: 'Services & Items',
        description: 'What we remove and services we provide',
        icon: 'Truck',
        itemCount: 4
      },
      {
        id: '3',
        name: 'Scheduling & Service',
        description: 'Booking, availability, and service times',
        icon: 'Calendar',
        itemCount: 3
      },
      {
        id: '4',
        name: 'Environmental & Disposal',
        description: 'Recycling, donations, and eco-friendly practices',
        icon: 'Recycle',
        itemCount: 2
      },
      {
        id: '5',
        name: 'Process & Preparation',
        description: 'What to expect and how to prepare',
        icon: 'CheckCircle',
        itemCount: 2
      },
      {
        id: '6',
        name: 'Business & Trust',
        description: 'Licensing, insurance, and company information',
        icon: 'Shield',
        itemCount: 2
      },
      {
        id: '7',
        name: 'Payment & Billing',
        description: 'Payment methods and billing questions',
        icon: 'CreditCard',
        itemCount: 2
      },
      {
        id: '8',
        name: 'Service Areas',
        description: 'Where we serve and travel policies',
        icon: 'MapPin',
        itemCount: 2
      }
    ];
    
    return categories;
  } catch (error) {
    console.error('Error fetching FAQ categories:', error);
    return [];
  }
};

export const fetchPopularFaqs = async (limit: number = 5): Promise<FaqItem[]> => {
  try {
    const allFaqs = await fetchEnhancedFaqs();
    return allFaqs
      .filter(faq => faq.isPopular)
      .sort((a, b) => a.priority - b.priority)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching popular FAQs:', error);
    return [];
  }
};
