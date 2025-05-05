
import { BlogPost } from '@/types/blog';

// Sample blog posts
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Properly Dispose of Electronic Waste',
    excerpt: 'Learn about the environmental impact of e-waste and how to responsibly dispose of your old electronics.',
    category: 'Tips & Advice',
    date: 'May 2, 2025',
    author: 'Mike Johnson',
    imageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03',
    slug: 'dispose-electronic-waste'
  },
  {
    id: '2',
    title: 'The Cost of Hoarding: Financial and Emotional Impact',
    excerpt: 'Exploring the hidden costs of keeping too much stuff and how decluttering can improve your life.',
    category: 'Lifestyle',
    date: 'April 25, 2025',
    author: 'Sarah Williams',
    imageUrl: 'https://images.unsplash.com/photo-1534653299134-96a171b61581',
    slug: 'cost-of-hoarding'
  },
  {
    id: '3',
    title: 'Commercial Junk Removal: What Businesses Need to Know',
    excerpt: 'A complete guide for businesses looking to efficiently manage office cleanouts and junk disposal.',
    category: 'Business',
    date: 'April 18, 2025',
    author: 'James Rodriguez',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7',
    slug: 'commercial-junk-removal'
  },
  {
    id: '4',
    title: '5 Ways to Reuse and Recycle Household Items',
    excerpt: 'Creative ideas for giving new life to old items instead of throwing them away.',
    category: 'Sustainability',
    date: 'April 10, 2025',
    author: 'Emily Chen',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b',
    slug: 'reuse-recycle-items'
  },
  {
    id: '5',
    title: 'Spring Cleaning: The Ultimate Checklist',
    excerpt: 'Get your home ready for spring with this comprehensive cleaning and decluttering guide.',
    category: 'Tips & Advice',
    date: 'March 28, 2025',
    author: 'Mike Johnson',
    imageUrl: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab',
    slug: 'spring-cleaning-checklist'
  },
  {
    id: '6',
    title: 'The Environmental Impact of Improper Waste Disposal',
    excerpt: 'Understanding how incorrect waste disposal affects our planet and what you can do about it.',
    category: 'Sustainability',
    date: 'March 15, 2025',
    author: 'Lisa Morgan',
    imageUrl: 'https://images.unsplash.com/photo-1610392347604-86b8deafd3e9',
    slug: 'environmental-impact-waste'
  }
];

// Related links for blog readers
export const relatedLinks = [
  { title: "FAQ", description: "Find answers to common questions", path: "/faq", icon: null },
  { title: "Services", description: "Learn about what we offer", path: "/services", icon: null },
  { title: "Get a Quote", description: "Free, no-obligation estimate", path: "/quote", icon: null },
];
