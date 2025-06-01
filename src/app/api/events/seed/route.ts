import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';
import User from '@/models/User';

// Sample events data
const sampleEvents = [
  {
    title: "Tech Meetup: AI & Machine Learning",
    description: "Join us for an exciting discussion about the latest trends in AI and machine learning. Network with fellow developers and learn from industry experts.",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    startTime: "18:00",
    endTime: "21:00",
    location: {
      address: "Tech Hub, 123 Innovation Street, Tbilisi, Georgia",
      coordinates: { lat: 41.7151, lng: 44.8271 }
    },
    tags: ["tech", "ai", "networking", "education"],
    maxAttendees: 50,
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500"
  },
  {
    title: "Community Garden Workshop",
    description: "Learn sustainable gardening techniques and help build our community garden. All skill levels welcome!",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    startTime: "10:00",
    endTime: "14:00",
    location: {
      address: "Central Park, Rustaveli Avenue, Tbilisi, Georgia",
      coordinates: { lat: 41.7151, lng: 44.8271 }
    },
    tags: ["community", "outdoor", "education", "health"],
    maxAttendees: 30,
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500"
  },
  {
    title: "Local Music Jam Session",
    description: "Bring your instruments and join our weekly music jam! All genres and skill levels welcome.",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    startTime: "19:00",
    endTime: "22:00",
    location: {
      address: "Music Cafe, Old Town, Tbilisi, Georgia",
      coordinates: { lat: 41.6934, lng: 44.8015 }
    },
    tags: ["music", "community", "art"],
    maxAttendees: 25,
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500"
  },
  {
    title: "Startup Pitch Night",
    description: "Watch local entrepreneurs pitch their innovative ideas. Great networking opportunity for investors and founders.",
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    startTime: "18:30",
    endTime: "21:30",
    location: {
      address: "Business Center, Chavchavadze Avenue, Tbilisi, Georgia",
      coordinates: { lat: 41.7086, lng: 44.7725 }
    },
    tags: ["business", "networking", "tech"],
    maxAttendees: 100,
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500"
  },
  {
    title: "Photography Walk: Old Tbilisi",
    description: "Explore the historic streets of Old Tbilisi with fellow photography enthusiasts. Tips and tricks included!",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    startTime: "09:00",
    endTime: "12:00",
    location: {
      address: "Narikala Fortress, Old Tbilisi, Georgia",
      coordinates: { lat: 41.6868, lng: 44.8090 }
    },
    tags: ["art", "outdoor", "education"],
    maxAttendees: 15,
    imageUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500"
  },
  {
    title: "Healthy Cooking Workshop",
    description: "Learn to prepare delicious and nutritious meals with local ingredients. Recipes and samples included!",
    date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // 8 days from now
    startTime: "16:00",
    endTime: "19:00",
    location: {
      address: "Community Kitchen, Vake District, Tbilisi, Georgia",
      coordinates: { lat: 41.7225, lng: 44.7925 }
    },
    tags: ["food", "health", "education"],
    maxAttendees: 20,
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500"
  }
];

export async function POST() {
  try {
    await connectDB();

    // Create a sample organizer if none exists
    let organizer = await User.findOne({ email: 'organizer@localevently.com' });
    
    if (!organizer) {
      organizer = new User({
        name: 'LocalEvently Organizer',
        email: 'organizer@localevently.com',
        password: 'password123',
        role: 'organizer'
      });
      await organizer.save();
    }

    // Clear existing events (for demo purposes)
    await Event.deleteMany({});

    // Create sample events
    const eventsWithOrganizer = sampleEvents.map(event => ({
      ...event,
      organizer: organizer._id,
      attendees: [] // Start with no attendees
    }));

    const createdEvents = await Event.insertMany(eventsWithOrganizer);

    return NextResponse.json({
      message: `Successfully created ${createdEvents.length} sample events`,
      events: createdEvents.length
    });

  } catch (error: any) {
    console.error('Error seeding events:', error);
    return NextResponse.json(
      { error: 'Failed to seed events', details: error.message },
      { status: 500 }
    );
  }
}
