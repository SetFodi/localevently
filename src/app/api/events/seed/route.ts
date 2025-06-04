import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Event, User } from '@/models';

// Sample events data for Tbilisi, Georgia
const sampleEvents = [
  {
    title: "🤖 Tech Meetup: AI & Machine Learning",
    description: "Join us for an exciting discussion about the latest trends in AI and machine learning. Network with fellow developers and learn from industry experts. We'll cover neural networks, deep learning, and practical AI applications in business.",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    startTime: "18:00",
    endTime: "21:00",
    location: {
      address: "Tech Hub Tbilisi, Pekini Avenue 45, Tbilisi, Georgia",
      coordinates: { lat: 41.7151, lng: 44.8271 }
    },
    tags: ["tech", "ai", "networking", "education"],
    maxAttendees: 50,
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    isActive: true
  },
  {
    title: "🎨 Local Art Exhibition Opening",
    description: "Discover amazing works by local Georgian artists. This exhibition features contemporary paintings, sculptures, and digital art. Free wine and traditional Georgian snacks will be provided.",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    startTime: "19:00",
    endTime: "22:00",
    location: {
      address: "Gallery Modern, Rustaveli Avenue 45, Tbilisi, Georgia",
      coordinates: { lat: 41.7077, lng: 44.7905 }
    },
    tags: ["art", "culture", "community", "networking"],
    maxAttendees: 80,
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
    isActive: true
  },
  {
    title: "🌱 Community Garden Workshop",
    description: "Learn sustainable gardening techniques and help build our community garden. We'll cover composting, organic growing methods, and seasonal planting. All skill levels welcome!",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    startTime: "10:00",
    endTime: "14:00",
    location: {
      address: "Vake Park Community Garden, Tbilisi, Georgia",
      coordinates: { lat: 41.7225, lng: 44.7925 }
    },
    tags: ["outdoor", "community", "education", "health"],
    maxAttendees: 25,
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
    isActive: true
  },
  {
    title: "🚀 Startup Pitch Night",
    description: "Local entrepreneurs present their innovative ideas to investors and the community. Great networking opportunity for founders, investors, and anyone interested in the startup ecosystem.",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    startTime: "18:30",
    endTime: "21:30",
    location: {
      address: "Impact Hub Tbilisi, Aghmashenebeli Avenue 156, Tbilisi, Georgia",
      coordinates: { lat: 41.7193, lng: 44.7808 }
    },
    tags: ["business", "networking", "tech", "education"],
    maxAttendees: 60,
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
    isActive: true
  },
  {
    title: "🍽️ Traditional Georgian Cooking Class",
    description: "Learn to make authentic Georgian dishes like khachapuri, khinkali, and churchkhela from experienced local chefs. All ingredients provided!",
    date: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000), // 9 days from now
    startTime: "16:00",
    endTime: "19:00",
    location: {
      address: "Culinary Studio Supra, Old Town, Tbilisi, Georgia",
      coordinates: { lat: 41.6934, lng: 44.8015 }
    },
    tags: ["food", "culture", "education", "community"],
    maxAttendees: 15,
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
    isActive: true
  },
  {
    title: "🧘 Sunrise Yoga in Mtatsminda Park",
    description: "Start your weekend with a peaceful yoga session overlooking beautiful Tbilisi. We'll practice gentle flows and meditation as the sun rises. Bring your own mat!",
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
    startTime: "07:00",
    endTime: "08:30",
    location: {
      address: "Mtatsminda Park Viewpoint, Tbilisi, Georgia",
      coordinates: { lat: 41.6953, lng: 44.7864 }
    },
    tags: ["health", "outdoor", "community", "sports"],
    maxAttendees: 30,
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    isActive: true
  },
  {
    title: "📸 Photography Walk: Hidden Tbilisi",
    description: "Explore the lesser-known corners of Tbilisi with fellow photography enthusiasts. We'll visit hidden courtyards, street art, and architectural gems.",
    date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days from now
    startTime: "14:00",
    endTime: "17:00",
    location: {
      address: "Narikala Fortress Meeting Point, Old Tbilisi, Georgia",
      coordinates: { lat: 41.6868, lng: 44.8092 }
    },
    tags: ["art", "outdoor", "community", "culture"],
    maxAttendees: 20,
    imageUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800",
    isActive: true
  },
  {
    title: "🎲 International Board Game Night",
    description: "Join us for a fun evening of board games from around the world! We have strategy games, party games, and cooperative games. Snacks and drinks provided.",
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    startTime: "19:00",
    endTime: "23:00",
    location: {
      address: "Cafe Leila, Marjanishvili Street 12, Tbilisi, Georgia",
      coordinates: { lat: 41.7167, lng: 44.7736 }
    },
    tags: ["community", "indoor", "family", "networking"],
    maxAttendees: 40,
    imageUrl: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800",
    isActive: true
  },
  {
    title: "🎷 Live Jazz & Wine Evening",
    description: "Enjoy an intimate evening of live jazz music featuring talented local and international artists. Curated wine selection from Georgian vineyards.",
    date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // 8 days from now
    startTime: "20:00",
    endTime: "23:30",
    location: {
      address: "Jazz Club Tbilisi, Shardeni Street 8, Old Town, Tbilisi, Georgia",
      coordinates: { lat: 41.6927, lng: 44.8066 }
    },
    tags: ["music", "culture", "art", "community"],
    maxAttendees: 70,
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    isActive: true
  },
  {
    title: "💼 Digital Marketing Masterclass",
    description: "Comprehensive workshop covering social media marketing, SEO, content creation, and analytics. Perfect for small business owners and freelancers.",
    date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // 12 days from now
    startTime: "10:00",
    endTime: "16:00",
    location: {
      address: "Business Center Axis, Chavchavadze Avenue 79, Tbilisi, Georgia",
      coordinates: { lat: 41.7086, lng: 44.7916 }
    },
    tags: ["business", "education", "tech", "networking"],
    maxAttendees: 35,
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    isActive: true
  },
  {
    title: "🥾 Hiking Adventure: Turtle Lake",
    description: "Join us for a scenic hike to Turtle Lake! We'll explore forest trails, enjoy beautiful views of Tbilisi, and have a picnic by the lake. Moderate difficulty level.",
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    startTime: "09:00",
    endTime: "15:00",
    location: {
      address: "Turtle Lake Trailhead, Vake District, Tbilisi, Georgia",
      coordinates: { lat: 41.7342, lng: 44.7654 }
    },
    tags: ["outdoor", "sports", "health", "community"],
    maxAttendees: 25,
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    isActive: true
  },
  {
    title: "🍷 Wine Tasting: Georgian Varieties",
    description: "Discover the rich tradition of Georgian winemaking! Taste unique Georgian grape varieties like Saperavi and Rkatsiteli. Learn about the ancient qvevri method.",
    date: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000), // 11 days from now
    startTime: "18:00",
    endTime: "21:00",
    location: {
      address: "Wine House Tbilisi, Erekle II Street 15, Tbilisi, Georgia",
      coordinates: { lat: 41.6977, lng: 44.8014 }
    },
    tags: ["food", "culture", "education", "networking"],
    maxAttendees: 30,
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800",
    isActive: true
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
