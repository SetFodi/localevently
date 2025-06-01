import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  organizer: mongoose.Types.ObjectId;
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
  attendees: mongoose.Types.ObjectId[];
  imageUrl?: string;
  isActive: boolean;
}

const EventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: [true, 'Event date is required'],
    validate: {
      validator: function(value: Date) {
        return value > new Date();
      },
      message: 'Event date must be in the future'
    }
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time format (HH:MM)']
  },
  endTime: {
    type: String,
    required: [true, 'End time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time format (HH:MM)']
  },
  location: {
    address: {
      type: String,
      required: [true, 'Event address is required']
    },
    coordinates: {
      lat: {
        type: Number,
        required: true,
        min: [-90, 'Latitude must be between -90 and 90'],
        max: [90, 'Latitude must be between -90 and 90']
      },
      lng: {
        type: Number,
        required: true,
        min: [-180, 'Longitude must be between -180 and 180'],
        max: [180, 'Longitude must be between -180 and 180']
      }
    }
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  maxAttendees: {
    type: Number,
    min: [1, 'Maximum attendees must be at least 1']
  },
  attendees: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  imageUrl: {
    type: String,
    match: [/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i, 'Please enter a valid image URL']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for geospatial queries
EventSchema.index({ 'location.coordinates': '2dsphere' });

// Index for text search
EventSchema.index({ title: 'text', description: 'text', tags: 'text' });

export default mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
