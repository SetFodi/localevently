import { NextResponse } from 'next/server';

// Demo events data that doesn't require database
const demoEvents = [
  {
    _id: "demo1",
    title: "🤖 Tech Meetup: AI & Machine Learning",
    description: "Join us for an exciting discussion about the latest trends in AI and machine learning. Network with fellow developers and learn from industry experts. We'll cover neural networks, deep learning, and practical AI applications in business.",
    organizer: {
      _id: "org1",
      name: "Tech Community Tbilisi",
      email: "tech@community.ge"
    },
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    startTime: "18:00",
    endTime: "21:00",
    location: {
      address: "Tech Hub Tbilisi, Pekini Avenue 45, Tbilisi, Georgia",
      coordinates: { lat: 41.7151, lng: 44.8271 }
    },
    tags: ["tech", "ai", "networking", "education"],
    maxAttendees: 50,
    attendees: [],
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "demo2",
    title: "🎨 Local Art Exhibition Opening",
    description: "Discover amazing works by local Georgian artists. This exhibition features contemporary paintings, sculptures, and digital art. Free wine and traditional Georgian snacks will be provided.",
    organizer: {
      _id: "org2",
      name: "Gallery Modern",
      email: "info@gallerymodern.ge"
    },
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    startTime: "19:00",
    endTime: "22:00",
    location: {
      address: "Gallery Modern, Rustaveli Avenue 45, Tbilisi, Georgia",
      coordinates: { lat: 41.7077, lng: 44.7905 }
    },
    tags: ["art", "culture", "community", "networking"],
    maxAttendees: 80,
    attendees: [],
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "demo3",
    title: "🌱 Community Garden Workshop",
    description: "Learn sustainable gardening techniques and help build our community garden. We'll cover composting, organic growing methods, and seasonal planting. All skill levels welcome!",
    organizer: {
      _id: "org3",
      name: "Green Tbilisi Initiative",
      email: "green@tbilisi.org"
    },
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    startTime: "10:00",
    endTime: "14:00",
    location: {
      address: "Vake Park Community Garden, Tbilisi, Georgia",
      coordinates: { lat: 41.7225, lng: 44.7925 }
    },
    tags: ["outdoor", "community", "education", "health"],
    maxAttendees: 25,
    attendees: [],
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "demo4",
    title: "🚀 Startup Pitch Night",
    description: "Local entrepreneurs present their innovative ideas to investors and the community. Great networking opportunity for founders, investors, and anyone interested in the startup ecosystem.",
    organizer: {
      _id: "org4",
      name: "Impact Hub Tbilisi",
      email: "events@impacthub.ge"
    },
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    startTime: "18:30",
    endTime: "21:30",
    location: {
      address: "Impact Hub Tbilisi, Aghmashenebeli Avenue 156, Tbilisi, Georgia",
      coordinates: { lat: 41.7193, lng: 44.7808 }
    },
    tags: ["business", "networking", "tech", "education"],
    maxAttendees: 60,
    attendees: [],
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "demo5",
    title: "🧘 Sunrise Yoga in Mtatsminda Park",
    description: "Start your weekend with a peaceful yoga session overlooking beautiful Tbilisi. We'll practice gentle flows and meditation as the sun rises. Bring your own mat!",
    organizer: {
      _id: "org5",
      name: "Yoga Tbilisi",
      email: "namaste@yogatbilisi.com"
    },
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
    startTime: "07:00",
    endTime: "08:30",
    location: {
      address: "Mtatsminda Park Viewpoint, Tbilisi, Georgia",
      coordinates: { lat: 41.6953, lng: 44.7864 }
    },
    tags: ["health", "outdoor", "community", "sports"],
    maxAttendees: 30,
    attendees: [],
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "demo6",
    title: "🎷 Live Jazz & Wine Evening",
    description: "Enjoy an intimate evening of live jazz music featuring talented local and international artists. Curated wine selection from Georgian vineyards.",
    organizer: {
      _id: "org6",
      name: "Jazz Club Tbilisi",
      email: "info@jazzclub.ge"
    },
    date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // 8 days from now
    startTime: "20:00",
    endTime: "23:30",
    location: {
      address: "Jazz Club Tbilisi, Shardeni Street 8, Old Town, Tbilisi, Georgia",
      coordinates: { lat: 41.6927, lng: 44.8066 }
    },
    tags: ["music", "culture", "art", "community"],
    maxAttendees: 70,
    attendees: [],
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export async function GET() {
  try {
    return NextResponse.json({
      events: demoEvents,
      total: demoEvents.length,
      page: 1,
      totalPages: 1
    });
  } catch (error) {
    console.error('Demo events error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch demo events' },
      { status: 500 }
    );
  }
}
