'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, Clock, MapPin, Users, Tag, ArrowLeft, Share2, Heart, Edit, Trash2 } from 'lucide-react';
import { Event } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;
  const { user, token } = useAuth();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRSVPed, setIsRSVPed] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(0);
  const [rsvpLoading, setRsvpLoading] = useState(false);

  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  useEffect(() => {
    if (user && token && event) {
      checkRSVPStatus();
    }
  }, [user, token, event]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/events/${eventId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch event');
      }

      const data = await response.json();
      setEvent(data.event);
      setAttendeeCount(data.event.attendees?.length || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching event:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkRSVPStatus = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}/rsvp`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIsRSVPed(data.isAttending);
        setAttendeeCount(data.attendeeCount);
      }
    } catch (error) {
      console.error('Error checking RSVP status:', error);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleRSVP = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    setRsvpLoading(true);
    try {
      const response = await fetch(`/api/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIsRSVPed(data.isAttending);
        setAttendeeCount(data.attendeeCount);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to RSVP');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setRsvpLoading(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to delete event');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: event?.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Event link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {error || 'Event not found'}
          </h1>
          <a 
            href="/events"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to events
          </a>
        </div>
      </div>
    );
  }

  const organizerName = typeof event.organizer === 'string'
    ? 'Unknown Organizer'
    : event.organizer.name;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative">
        {event.imageUrl && (
          <div className="h-64 md:h-96 bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <img 
              src={event.imageUrl} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
        )}
        
        {/* Back button */}
        <div className="absolute top-4 left-4">
          <a 
            href="/events"
            className="flex items-center px-3 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </a>
        </div>

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          {user && event && typeof event.organizer === 'object' && event.organizer._id === user._id && (
            <>
              <Link
                href={`/events/${eventId}/edit`}
                className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Edit className="h-5 w-5" />
              </Link>
              <button
                onClick={handleDeleteEvent}
                className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-red-600"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </>
          )}
          <button
            onClick={handleShare}
            className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Share2 className="h-5 w-5" />
          </button>
          <button className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {event.title}
              </h1>
              
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                <span>Organized by </span>
                <span className="font-medium text-blue-600 dark:text-blue-400 ml-1">
                  {organizerName}
                </span>
              </div>

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div className="flex items-center flex-wrap gap-2 mb-6">
                  <Tag className="h-4 w-4 text-gray-500" />
                  {event.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Location Map Placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Location
              </h2>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {event.location.address}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Coordinates: {event.location.coordinates.lat}, {event.location.coordinates.lng}
                  </p>
                </div>
              </div>
              
              {/* Map placeholder */}
              <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Interactive map coming soon
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Event Details Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Event Details
              </h2>
              
              <div className="space-y-4">
                {/* Date */}
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatDate(event.date)}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatTime(event.startTime)} - {formatTime(event.endTime)}
                    </p>
                  </div>
                </div>

                {/* Attendees */}
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {attendeeCount} attending
                    </p>
                    {event.maxAttendees && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {event.maxAttendees} max capacity
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* RSVP Button */}
              {user ? (
                <button
                  onClick={handleRSVP}
                  disabled={rsvpLoading}
                  className={`w-full mt-6 px-4 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    isRSVPed
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {rsvpLoading ? 'Loading...' : (isRSVPed ? 'Going ✓' : 'RSVP to Event')}
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  className="w-full mt-6 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors text-center block"
                >
                  Login to RSVP
                </Link>
              )}
              
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                Free event • No payment required
              </p>
            </div>

            {/* Organizer Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Organizer
              </h2>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {organizerName.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {organizerName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Event Organizer
                  </p>
                </div>
              </div>
              
              <button className="w-full mt-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Contact Organizer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
