
import { BlogPost } from '@/types/blog';

// Sample blog posts based on requested topics
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Prepare Your Home for Junk Removal Service',
    excerpt: 'Learn the essential steps to prepare your home for a smooth and efficient junk removal experience.',
    category: 'Preparation',
    date: 'May 12, 2025',
    author: 'Mike Johnson',
    imageUrl: 'https://images.unsplash.com/photo-1584835732100-9c7b00ad260c',
    slug: 'prepare-for-junk-removal'
  },
  {
    id: '2',
    title: 'Environmental Benefits of Professional Junk Removal',
    excerpt: 'Discover how proper junk disposal contributes to environmental conservation and sustainability.',
    category: 'Sustainability',
    date: 'May 5, 2025',
    author: 'Sarah Williams',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b',
    slug: 'environmental-benefits-junk-removal'
  },
  {
    id: '3',
    title: 'DIY vs. Professional Junk Removal: What You Need to Know',
    excerpt: 'Compare the pros and cons of handling junk removal yourself versus hiring professionals.',
    category: 'Comparison',
    date: 'April 28, 2025',
    author: 'James Rodriguez',
    imageUrl: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc',
    slug: 'diy-vs-professional-removal'
  },
  {
    id: '4',
    title: 'Spring Cleaning Guide: Decluttering Your Home for the New Season',
    excerpt: 'A comprehensive guide to decluttering and organizing your home during the spring season.',
    category: 'Seasonal',
    date: 'April 15, 2025',
    author: 'Emily Chen',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952',
    slug: 'spring-cleaning-guide'
  },
  {
    id: '5',
    title: 'Recycle, Donate, or Discard: Making the Right Choice for Your Items',
    excerpt: 'Learn how to determine whether your unwanted items should be recycled, donated, or discarded.',
    category: 'Recycling',
    date: 'April 8, 2025',
    author: 'Mike Johnson',
    imageUrl: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807',
    slug: 'recycle-donate-discard'
  },
  {
    id: '6',
    title: 'Amazing Transformation: From Cluttered Garage to Organized Workspace',
    excerpt: 'See the incredible before and after transformation of a cluttered garage into a functional workspace.',
    category: 'Transformations',
    date: 'March 30, 2025',
    author: 'Lisa Morgan',
    imageUrl: 'https://images.unsplash.com/photo-1530563885674-66db9af5a785',
    slug: 'garage-transformation'
  },
  {
    id: '7',
    title: 'Fall Cleanup: Preparing Your Yard and Home for Winter',
    excerpt: 'Essential tips for clearing out your yard and home before the winter months arrive.',
    category: 'Seasonal',
    date: 'March 22, 2025',
    author: 'David Wilson',
    imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071',
    slug: 'fall-cleanup-guide'
  },
  {
    id: '8',
    title: 'Electronic Waste Disposal: What You Need to Know',
    excerpt: 'Learn the proper ways to dispose of electronic waste to minimize environmental impact.',
    category: 'Recycling',
    date: 'March 15, 2025',
    author: 'Sarah Williams',
    imageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03',
    slug: 'electronic-waste-disposal'
  },
  {
    id: '9',
    title: 'From Hoarded Home to Haven: A Complete Transformation Story',
    excerpt: 'The inspiring story of how professional junk removal transformed a hoarded house into a comfortable home.',
    category: 'Transformations',
    date: 'March 5, 2025',
    author: 'James Rodriguez',
    imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858',
    slug: 'hoarded-home-transformation'
  }
];

// Related links for blog readers
export const relatedLinks = [
  { title: "FAQ", description: "Find answers to common questions about junk removal", path: "/faq", icon: null },
  { title: "Services", description: "Learn about our full range of junk removal services", path: "/services", icon: null },
  { title: "Get a Quote", description: "Free, no-obligation estimate for your project", path: "/quote", icon: null },
];
