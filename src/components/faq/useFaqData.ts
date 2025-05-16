
import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchFaqs, fetchFaqCategories } from '@/integrations/supabase/faqsService';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategoryData {
  category: string;
  questions: FaqItem[];
}

export const useFaqData = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  
  // Fetch FAQ data from Supabase
  const { data: faqsData = [] } = useQuery({
    queryKey: ['faqs'],
    queryFn: () => fetchFaqs(),
  });

  const { data: categoriesData = [] } = useQuery({
    queryKey: ['faqCategories'],
    queryFn: () => fetchFaqCategories(),
  });

  // Organize FAQs by category
  const faqData = useMemo(() => {
    const categories = categoriesData.map(category => ({
      id: category.id,
      category: category.name,
      questions: faqsData
        .filter(faq => faq.category_id === category.id)
        .map(faq => ({
          question: faq.question,
          answer: faq.answer
        }))
    }));

    const uncategorizedFaqs = faqsData
      .filter(faq => !faq.category_id)
      .map(faq => ({
        question: faq.question,
        answer: faq.answer
      }));

    if (uncategorizedFaqs.length > 0) {
      categories.push({
        id: 'uncategorized',
        category: 'Other Questions',
        questions: uncategorizedFaqs
      });
    }

    return categories;
  }, [faqsData, categoriesData]);

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  // Filter questions based on search query
  const filteredFAQs = useMemo(() => {
    if (!searchQuery.trim()) return faqData;
    
    return faqData
      .map(category => {
        const filteredQuestions = category.questions.filter(item => 
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        return {
          ...category,
          questions: filteredQuestions
        };
      })
      .filter(category => category.questions.length > 0);
  }, [faqData, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    expandedCategories,
    toggleCategory,
    filteredFAQs,
  };
};
