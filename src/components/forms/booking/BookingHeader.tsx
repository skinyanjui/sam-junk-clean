
import React from 'react';
import { CalendarClock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingHeaderProps {
  variant?: 'default' | 'hero';
}

const BookingHeader = ({ variant = 'default' }: BookingHeaderProps) => {
  return (
    <div className={cn(
      "px-6 py-4",
      "bg-brand-navy"
    )}>
      <h3 className="text-white font-bold flex items-center gap-2 text-xl">
        <CalendarClock className="h-5 w-5" />
        Schedule a Pickup
      </h3>
    </div>
  );
};

export default BookingHeader;
