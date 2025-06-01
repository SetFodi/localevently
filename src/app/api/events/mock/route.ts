import { NextRequest, NextResponse } from 'next/server';

// Mock events data for demonstration
const mockEvents = [
  {
    _id: "1",
    title: "Tech Meetup: AI & Machine Learning",
    description: "Join us for an exciting discussion about the latest trends in AI and machine learning. Network with fellow developers and learn from industry experts.",
    organizer: {
      _id: "org1",
      name: "Tech Community Tbilisi",
      email: "tech@community.ge"
    },
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    startTime: "18:00",
    endTime: "21:00",
    location: {
      address: "Tech Hub, 123 Innovation Street, Tbilisi, Georgia",
      coordinates: { lat: 41.7151, lng: 44.8271 }
    },
    tags: ["tech", "ai", "networking", "education"],
    maxAttendees: 50,
    attendees: ["user1", "user2", "user3"],
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "2",
    title: "Community Garden Workshop",
    description: "Learn sustainable gardening techniques and help build our community garden. All skill levels welcome!",
    organizer: {
      _id: "org2",
      name: "Green Tbilisi Initiative",
      email: "green@tbilisi.ge"
    },
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    startTime: "10:00",
    endTime: "14:00",
    location: {
      address: "Central Park, Rustaveli Avenue, Tbilisi, Georgia",
      coordinates: { lat: 41.7151, lng: 44.8271 }
    },
    tags: ["community", "outdoor", "education", "health"],
    maxAttendees: 30,
    attendees: ["user1", "user4"],
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "3",
    title: "Local Music Jam Session",
    description: "Bring your instruments and join our weekly music jam! All genres and skill levels welcome.",
    organizer: {
      _id: "org3",
      name: "Tbilisi Musicians Collective",
      email: "music@collective.ge"
    },
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    startTime: "19:00",
    endTime: "22:00",
    location: {
      address: "Music Cafe, Old Town, Tbilisi, Georgia",
      coordinates: { lat: 41.6934, lng: 44.8015 }
    },
    tags: ["music", "community", "art"],
    maxAttendees: 25,
    attendees: ["user2", "user3", "user5"],
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "4",
    title: "Startup Pitch Night",
    description: "Watch local entrepreneurs pitch their innovative ideas. Great networking opportunity for investors and founders.",
    organizer: {
      _id: "org4",
      name: "Startup Georgia",
      email: "events@startup.ge"
    },
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    startTime: "18:30",
    endTime: "21:30",
    location: {
      address: "Business Center, Chavchavadze Avenue, Tbilisi, Georgia",
      coordinates: { lat: 41.7086, lng: 44.7725 }
    },
    tags: ["business", "networking", "tech"],
    maxAttendees: 100,
    attendees: ["user1", "user2", "user3", "user4", "user5", "user6"],
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "5",
    title: "Photography Walk: Old Tbilisi",
    description: "Explore the historic streets of Old Tbilisi with fellow photography enthusiasts. Tips and tricks included!",
    organizer: {
      _id: "org5",
      name: "Tbilisi Photo Club",
      email: "photo@club.ge"
    },
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    startTime: "09:00",
    endTime: "12:00",
    location: {
      address: "Narikala Fortress, Old Tbilisi, Georgia",
      coordinates: { lat: 41.6868, lng: 44.8090 }
    },
    tags: ["art", "outdoor", "education"],
    maxAttendees: 15,
    attendees: ["user3", "user7"],
    imageUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "6",
    title: "Healthy Cooking Workshop",
    description: "Learn to prepare delicious and nutritious meals with local ingredients. Recipes and samples included!",
    organizer: {
      _id: "org6",
      name: "Healthy Living Tbilisi",
      email: "healthy@living.ge"
    },
    date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // 8 days from now
    startTime: "16:00",
    endTime: "19:00",
    location: {
      address: "Community Kitchen, Vake District, Tbilisi, Georgia",
      coordinates: { lat: 41.7225, lng: 44.7925 }
    },
    tags: ["food", "health", "education"],
    maxAttendees: 20,
    attendees: ["user1", "user4", "user8"],
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const tags = searchParams.get('tags')?.split(',');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sortBy = searchParams.get('sortBy') || 'date';

    // Filter events
    let filteredEvents = [...mockEvents];

    // Text search
    if (search) {
      const searchLower = search.toLowerCase();
      filteredEvents = filteredEvents.filter(event =>
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Tag filtering
    if (tags && tags.length > 0) {
      filteredEvents = filteredEvents.filter(event =>
        tags.some(tag => event.tags.includes(tag))
      );
    }

    // Sort events
    if (sortBy === 'date') {
      filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === 'popularity') {
      filteredEvents.sort((a, b) => b.attendees.length - a.attendees.length);
    }

    // Pagination
    const total = filteredEvents.length;
    const pages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

    return NextResponse.json({
      events: paginatedEvents,
      pagination: {
        page,
        limit,
        total,
        pages
      }
    });

  } catch (error: any) {
    console.error('Mock events error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
