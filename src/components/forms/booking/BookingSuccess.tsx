
import React from 'react';
import SuccessView from '../SuccessView';

interface BookingSuccessProps {
  resetForm: () => void;
}

const BookingSuccess = ({ resetForm }: BookingSuccessProps) => {
  return (
    <SuccessView 
      title="Booking Successful!" 
      message="We've received your booking request. Our team will contact you shortly to confirm your appointment." 
      resetForm={resetForm}
    />
  );
};

export default BookingSuccess;
