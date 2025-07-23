
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui';
import { Card, CardContent } from '@/components/ui/card';

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
    <Card 
      className="mb-8 shadow-sm border"
    >
      <Collapsible
        open={isExpanded}
        onOpenChange={onToggle}
      >
        <CollapsibleTrigger className="card-collapsible-trigger w-full">
          <h2 id={`faq-category-${index}`} className="text-2xl font-bold text-brand-navy">
            {category} <span className="text-brand-red">({questions.length})</span>
          </h2>
          <ChevronDown 
            size={24} 
            className={`card-collapsible-icon text-brand-navy`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <Accordion type="single" collapsible className="space-y-2">
              {questions.map((item, qIndex) => (
                <Card 
                  key={qIndex} 
                  className="border-gray-200"
                >
                  <AccordionItem value={`item-${index}-${qIndex}`} className="border-none">
                    <AccordionTrigger className="px-4 py-3 hover:bg-brand-gray/50 hover:no-underline text-left rounded-t-lg">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-gray-600 border-t border-gray-100">
                      <div dangerouslySetInnerHTML={renderAnswer(item.answer)} />
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              ))}
            </Accordion>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default FaqCategory;
