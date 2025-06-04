'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Event } from '@/types';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface EventMapProps {
  events: Event[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  onEventClick?: (event: Event) => void;
}

// Custom component to fit bounds when events change
function FitBounds({ events }: { events: Event[] }) {
  const map = useMap();

  useEffect(() => {
    if (events.length > 0) {
      const bounds = L.latLngBounds(
        events.map(event => [
          event.location.coordinates.lat,
          event.location.coordinates.lng
        ])
      );
      
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    }
  }, [events, map]);

  return null;
}

export default function EventMap({ 
  events, 
  center = [41.7151, 44.8271], // Default to Tbilisi
  zoom = 12,
  height = '400px',
  onEventClick 
}: EventMapProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
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

  return (
    <div style={{ height }} className="rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {events.length > 0 && <FitBounds events={events} />}
        
        {events.map((event) => (
          <Marker
            key={event._id}
            position={[
              event.location.coordinates.lat,
              event.location.coordinates.lng
            ]}
            eventHandlers={{
              click: () => onEventClick?.(event)
            }}
          >
            <Popup>
              <div className="p-2 min-w-[250px]">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                  {event.title}
                </h3>
                
                <div className="space-y-1 text-xs text-gray-600 mb-3">
                  <div>
                    📅 {formatDate(event.date)} at {formatTime(event.startTime)}
                  </div>
                  <div>
                    📍 {event.location.address}
                  </div>
                  <div>
                    👥 {Array.isArray(event.attendees) ? event.attendees.length : 0} attending
                  </div>
                  {event.tags && event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {event.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <a
                    href={`/events/${event._id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs text-center transition-colors"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
