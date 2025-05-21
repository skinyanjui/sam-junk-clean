
import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { getCompanyContactDetails, getSocialLinks, getBusinessHours } from '@/integrations/supabase/companyInfoService';

const ContactInformation = () => {
  const [contactInfo, setContactInfo] = useState({
    phone: '(812) 610-1657',
    email: 'info@unclesamjunkremoval.com',
    address: '123 Main St',
    city: 'Bloomington',
    state: 'IN',
    zip: '47401'
  });

  const [businessHours, setBusinessHours] = useState({
    weekday: 'Monday - Saturday: 7:00 AM - 7:00 PM',
    weekend: 'Sunday: Closed'
  });

  const [socialLinks, setSocialLinks] = useState({
    facebook: 'https://facebook.com/unclesamjunkremoval',
    instagram: 'https://instagram.com/unclesamjunkremoval',
    twitter: 'https://twitter.com/unclesamjunk'
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const [contactData, socialData, hoursData] = await Promise.all([
          getCompanyContactDetails(),
          getSocialLinks(),
          getBusinessHours()
        ]);

        // Always use this specific phone number
        setContactInfo(prevState => ({
          ...prevState,
          phone: '(812) 610-1657',
          email: contactData.email || prevState.email,
          address: contactData.address || prevState.address,
          city: contactData.city || prevState.city,
          state: contactData.state || prevState.state,
          zip: contactData.zip || prevState.zip
        }));

        setSocialLinks({
          facebook: socialData.facebook || 'https://facebook.com/unclesamjunkremoval',
          instagram: socialData.instagram || 'https://instagram.com/unclesamjunkremoval',
          twitter: socialData.twitter || 'https://twitter.com/unclesamjunk'
        });

        setBusinessHours({
          weekday: hoursData.weekday || 'Monday - Saturday: 7:00 AM - 7:00 PM',
          weekend: hoursData.weekend || 'Sunday: Closed'
        });
      } catch (error) {
        console.error('Error fetching contact information:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactData();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-brand-navy mb-8">Get In Touch</h2>
      
      <div className="space-y-8">
        <div className="flex items-start">
          <div className="bg-brand-red p-3.5 rounded-xl text-white mr-4 shadow-md" aria-hidden="true">
            <Phone size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-brand-navy mb-1">Phone</h3>
            <p className="text-gray-700">
              <a 
                href="tel:+18126101657" 
                className="hover:text-brand-red transition-colors text-lg"
                aria-label="Call us at 812-610-1657"
              >
                {contactInfo.phone}
              </a>
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-brand-red p-3.5 rounded-xl text-white mr-4 shadow-md" aria-hidden="true">
            <Mail size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-brand-navy mb-1">Email</h3>
            <p className="text-gray-700">
              <a 
                href={`mailto:${contactInfo.email}`}
                className="hover:text-brand-red transition-colors text-lg"
                aria-label={`Email us at ${contactInfo.email}`}
              >
                {contactInfo.email}
              </a>
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-brand-red p-3.5 rounded-xl text-white mr-4 shadow-md" aria-hidden="true">
            <MapPin size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-brand-navy mb-1">Service Area</h3>
            <p className="text-gray-700">
              Evansville, Newburgh, Henderson, Owensboro, Mt. Carmel, and surrounding areas throughout the Tri-State region
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-brand-red p-3.5 rounded-xl text-white mr-4 shadow-md" aria-hidden="true">
            <Clock size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-brand-navy mb-1">Hours of Operation</h3>
            <p className="text-gray-700">
              {businessHours.weekday}<br />
              {businessHours.weekend}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-brand-navy mb-4">Follow Us</h3>
        <div className="flex space-x-4">
          <a 
            href={socialLinks.facebook}
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gray-100 hover:bg-gray-200 p-3.5 rounded-full transition-colors shadow-sm"
            aria-label="Visit our Facebook page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-navy" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a 
            href={socialLinks.instagram}
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gray-100 hover:bg-gray-200 p-3.5 rounded-full transition-colors shadow-sm"
            aria-label="Visit our Instagram page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-navy" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a 
            href={socialLinks.twitter}
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gray-100 hover:bg-gray-200 p-3.5 rounded-full transition-colors shadow-sm"
            aria-label="Visit our Twitter page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-navy" aria-hidden="true"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
