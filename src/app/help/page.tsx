'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronDownIcon, ChevronUpIcon, HelpCircle, Mail, MessageSquare } from 'lucide-react';

const faqs = [
  {
    question: "How do I create an event on LocalEvently?",
    answer: "To create an event, you need to be logged in. Click on 'Host Event' in the navigation menu, fill out the event details including title, description, date, time, location, and category. Once submitted, your event will be visible to other users in your area."
  },
  {
    question: "How does the location-based search work?",
    answer: "LocalEvently uses your browser's geolocation (with your permission) to show events near you. You can also manually enter a location or use the map view to explore events in different areas. Events are sorted by distance from your selected location."
  },
  {
    question: "Can I RSVP to events?",
    answer: "Yes! When you're logged in, you can RSVP to any event by clicking the 'RSVP' button on the event card or event details page. You can also see how many other people are attending and cancel your RSVP if your plans change."
  },
  {
    question: "How do I edit or delete my events?",
    answer: "You can manage your events from your Dashboard. Only event organizers can edit or delete their own events. Go to Dashboard > My Events to see options for editing or deleting events you've created."
  },
  {
    question: "What types of events can I create?",
    answer: "LocalEvently supports all types of events including meetups, workshops, sports activities, cultural events, food & drink gatherings, networking events, and more. Choose the appropriate category when creating your event to help people find it."
  },
  {
    question: "Is LocalEvently free to use?",
    answer: "Yes, LocalEvently is completely free for both event organizers and attendees. You can create events, RSVP to events, and use all platform features at no cost."
  },
  {
    question: "How do I change my profile information?",
    answer: "Go to your Profile page by clicking on your name in the top navigation menu, then select 'Profile'. You can update your name, email, and other profile information there."
  },
  {
    question: "Can I see events on a map?",
    answer: "Yes! Click on 'Map' in the navigation menu to see all events displayed on an interactive map. This gives you a visual overview of what's happening in different areas around you."
  }
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { user, token } = useAuth();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers,
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <HelpCircle className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Help & Support
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Find answers to common questions or get in touch with our team
          </p>
        </div>

        {/* Tutorial Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Getting Started with LocalEvently
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                1. Create Your Account
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sign up with your email to start discovering and creating events. Your account 
                allows you to RSVP to events, create your own events, and manage your profile.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                2. Discover Events
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Browse events by category, date, or location. Use the map view to see events 
                visually or filter by your interests to find exactly what you're looking for.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                3. RSVP and Attend
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Found an interesting event? Click RSVP to let the organizer know you're coming 
                and see who else will be there. You can manage your RSVPs from your dashboard.
              </p>
            </div>
            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                4. Host Your Own Events
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ready to organize? Click "Host Event" to create your own gathering. Add all 
                the details, set the location, and watch your community come together.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center mb-6">
            <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Contact Us
            </h2>
          </div>
          
          {!user ? (
            <div className="text-center py-8">
              <Mail className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                Please log in to send us a message
              </p>
              <a
                href="/auth/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Log In
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="What can we help you with?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Please describe your question or issue in detail..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-300 px-4 py-3 rounded">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded">
                  Sorry, there was an error sending your message. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
