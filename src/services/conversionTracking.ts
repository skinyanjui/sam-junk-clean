
import { supabase } from '@/integrations/supabase/client';

interface ConversionEvent {
  event_type: string;
  page_url: string;
  user_agent: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  session_id: string;
  user_id?: string;
  metadata?: Record<string, any>;
}

interface UserSession {
  session_id: string;
  start_time: Date;
  page_views: number;
  events: string[];
}

class ConversionTrackingService {
  private sessionId: string;
  private session: UserSession;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.session = {
      session_id: this.sessionId,
      start_time: new Date(),
      page_views: 0,
      events: []
    };
    this.initializeSession();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeSession() {
    // Track session start
    this.trackEvent('session_start', {
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
  }

  private getUtmParameters(): Record<string, string> {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_term: params.get('utm_term') || '',
      utm_content: params.get('utm_content') || ''
    };
  }

  async trackEvent(eventType: string, metadata: Record<string, any> = {}) {
    const utmParams = this.getUtmParameters();
    
    const event: ConversionEvent = {
      event_type: eventType,
      page_url: window.location.href,
      user_agent: navigator.userAgent,
      referrer: document.referrer || undefined,
      session_id: this.sessionId,
      metadata: {
        ...metadata,
        timestamp: new Date().toISOString(),
        ...utmParams
      },
      ...utmParams
    };

    // Update session
    this.session.events.push(eventType);
    if (eventType === 'page_view') {
      this.session.page_views++;
    }

    try {
      // Store in Supabase
      const { error } = await supabase
        .from('conversion_events')
        .insert(event);

      if (error) {
        console.error('Failed to track conversion event:', error);
      }
    } catch (error) {
      console.error('Conversion tracking error:', error);
    }

    // Also track with external analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventType, {
        custom_parameter: JSON.stringify(metadata),
        session_id: this.sessionId
      });
    }
  }

  trackPageView(pageTitle: string) {
    this.trackEvent('page_view', {
      page_title: pageTitle,
      page_path: window.location.pathname
    });
  }

  trackQuoteRequest(formData: any) {
    this.trackEvent('quote_request', {
      service_type: formData.jobType,
      city: formData.city,
      same_day: formData.sameDay,
      form_completion_time: Date.now() - this.session.start_time.getTime()
    });
  }

  trackBookingRequest(formData: any) {
    this.trackEvent('booking_request', {
      service_type: formData.service,
      date: formData.date,
      time: formData.time
    });
  }

  trackPhoneClick(phoneNumber: string) {
    this.trackEvent('phone_click', {
      phone_number: phoneNumber,
      click_location: window.location.pathname
    });
  }

  trackEmailClick(email: string) {
    this.trackEvent('email_click', {
      email_address: email,
      click_location: window.location.pathname
    });
  }

  trackExitIntent() {
    this.trackEvent('exit_intent', {
      time_on_page: Date.now() - this.session.start_time.getTime(),
      page_depth: this.session.page_views,
      events_triggered: this.session.events.length
    });
  }

  trackFormAbandonment(formType: string, fieldName: string) {
    this.trackEvent('form_abandonment', {
      form_type: formType,
      last_field: fieldName,
      time_on_form: Date.now() - this.session.start_time.getTime()
    });
  }

  trackButtonClick(buttonText: string, buttonLocation: string) {
    this.trackEvent('button_click', {
      button_text: buttonText,
      button_location: buttonLocation,
      page_path: window.location.pathname
    });
  }

  trackScrollDepth(percentage: number) {
    this.trackEvent('scroll_depth', {
      percentage,
      page_height: document.body.scrollHeight,
      viewport_height: window.innerHeight
    });
  }
}

export const conversionTracking = new ConversionTrackingService();
