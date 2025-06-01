'use client';

import { Calendar, Clock, MapPin, Users, Tag } from 'lucide-react';
import { Event } from '@/types';

interface EventCardProps {
  event: Event;
  onRSVP?: (eventId: string) => void;
  isRSVPed?: boolean;
}

export default function EventCard({ event, onRSVP, isRSVPed = false }: EventCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getAttendeeCount = () => {
    if (Array.isArray(event.attendees)) {
      return event.attendees.length;
    }
    return 0;
  };

  const organizerName = typeof event.organizer === 'string' 
    ? 'Unknown Organizer' 
    : event.organizer.name;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Event Image */}
      {event.imageUrl && (
        <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <img 
            src={event.imageUrl} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Event Content */}
      <div className="p-6">
        {/* Title and Organizer */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {event.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Organized by {organizerName}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          {/* Date and Time */}
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-2 text-blue-600" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-2 text-blue-600" />
            <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-2 text-blue-600" />
            <span className="line-clamp-1">{event.location.address}</span>
          </div>

          {/* Attendees */}
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Users className="h-4 w-4 mr-2 text-blue-600" />
            <span>
              {getAttendeeCount()} attending
              {event.maxAttendees && ` • ${event.maxAttendees} max`}
            </span>
          </div>
        </div>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex items-center flex-wrap gap-2 mb-4">
            <Tag className="h-4 w-4 text-gray-500" />
            {event.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {event.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{event.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <a 
            href={`/events/${event._id}`}
            className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center"
          >
            View Details
          </a>
          
          {onRSVP && (
            <button
              onClick={() => onRSVP(event._id)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isRSVPed
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isRSVPed ? 'Going ✓' : 'RSVP'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
