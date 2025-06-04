'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import EventCard from '@/components/EventCard';
import EventFilters from '@/components/EventFilters';
import Pagination from '@/components/Pagination';
import { Event, EventFilters as EventFiltersType } from '@/types';

interface EventsResponse {
  events: Event[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  });
  
  const [filters, setFilters] = useState<EventFiltersType>({
    sortBy: 'date',
    sortOrder: 'asc'
  });
  
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Fetch events function
  const fetchEvents = async (currentFilters: EventFiltersType, page: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        sortBy: currentFilters.sortBy || 'date',
        sortOrder: currentFilters.sortOrder || 'asc'
      });

      if (currentFilters.search) {
        params.append('search', currentFilters.search);
      }

      if (currentFilters.tags && currentFilters.tags.length > 0) {
        params.append('tags', currentFilters.tags.join(','));
      }

      if (currentFilters.location) {
        params.append('lat', currentFilters.location.lat.toString());
        params.append('lng', currentFilters.location.lng.toString());
        params.append('radius', currentFilters.location.radius.toString());
      }

      const response = await fetch(`/api/events?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data: EventsResponse = await response.json();
      setEvents(data.events);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchEvents(filters);
  }, []);

  // Handle filter changes
  const handleFiltersChange = (newFilters: EventFiltersType) => {
    setFilters(newFilters);
    fetchEvents(newFilters, 1);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    fetchEvents(filters, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle location request
  const handleLocationRequest = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsLoadingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newFilters = {
          ...filters,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            radius: 10 // Default 10km radius
          }
        };
        setFilters(newFilters);
        fetchEvents(newFilters, 1);
        setIsLoadingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please try again.');
        setIsLoadingLocation(false);
      }
    );
  };

  // Handle RSVP refresh (when user RSVPs from EventCard)
  const handleRSVP = (eventId: string) => {
    // Refresh events to get updated attendee counts
    fetchEvents(filters, pagination.page);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Local Events
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
            Find amazing events happening in your community. From concerts and meetups to workshops and festivals.
          </p>
        </div>

        {/* Filters */}
        <EventFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onLocationRequest={handleLocationRequest}
          isLoadingLocation={isLoadingLocation}
        />

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-800 dark:text-red-300">
              Error loading events: {error}
            </p>
            <button 
              onClick={() => fetchEvents(filters, pagination.page)}
              className="mt-2 text-red-600 dark:text-red-400 hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && (
          <>
            {events.length > 0 ? (
              <>
                {/* Results summary */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-600 dark:text-gray-300">
                    {pagination.total} events found
                  </p>
                  {filters.location && (
                    <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                      <MapPin className="h-4 w-4 mr-1" />
                      Showing events near you
                    </div>
                  )}
                </div>

                {/* Events grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {events.map((event) => (
                    <EventCard
                      key={event._id}
                      event={event}
                      onRSVP={handleRSVP}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.pages}
                  onPageChange={handlePageChange}
                  totalItems={pagination.total}
                  itemsPerPage={pagination.limit}
                />
              </>
            ) : (
              /* Empty state */
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No events found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Try adjusting your filters or check back later for new events.
                </p>
                <a 
                  href="/events/create"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Host the first event
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
