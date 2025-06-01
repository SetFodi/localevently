export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'organizer' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  organizer: string | User;
  date: Date;
  startTime: string;
  endTime: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  tags: string[];
  maxAttendees?: number;
  attendees: string[] | User[];
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RSVP {
  _id: string;
  user: string | User;
  event: string | Event;
  status: 'attending' | 'not_attending' | 'maybe';
  createdAt: Date;
}

export interface EventFilters {
  search?: string;
  tags?: string[];
  date?: {
    from?: Date;
    to?: Date;
  };
  location?: {
    lat: number;
    lng: number;
    radius: number; // in kilometers
  };
  sortBy?: 'date' | 'distance' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

export interface CreateEventData {
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  tags: string[];
  maxAttendees?: number;
  imageUrl?: string;
}
