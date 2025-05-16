
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategoryProps {
  category: string;
  questions: FaqItem[];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const FaqCategory = ({ category, questions, index, isExpanded, onToggle }: FaqCategoryProps) => {
  const renderAnswer = (answer: string) => {
    return { __html: answer };
  };

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={onToggle}
      className="mb-8"
    >
      <CollapsibleTrigger className="w-full">
        <div className="flex justify-between items-center bg-brand-gray px-6 py-4 rounded-lg cursor-pointer shadow-sm hover:bg-brand-gray/80 transition-colors">
          <h2 id={`faq-category-${index}`} className="text-2xl font-bold text-brand-navy">
            {category} <span className="text-brand-red">({questions.length})</span>
          </h2>
          <ChevronDown 
            size={24} 
            className={`text-brand-navy transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm mt-2">
          {questions.map((item, qIndex) => (
            <AccordionItem key={qIndex} value={`item-${index}-${qIndex}`}>
              <AccordionTrigger className="px-6 hover:bg-brand-gray hover:no-underline text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-600">
                <div dangerouslySetInnerHTML={renderAnswer(item.answer)} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FaqCategory;
