import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

// GET /api/events - Fetch events with optional filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const tags = searchParams.get('tags')?.split(',');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const radius = searchParams.get('radius') || '10'; // Default 10km radius
    const sortBy = searchParams.get('sortBy') || 'date';
    const sortOrder = searchParams.get('sortOrder') || 'asc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Build query
    let query: any = { isActive: true, date: { $gte: new Date() } };

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Tag filtering
    if (tags && tags.length > 0) {
      query.tags = { $in: tags };
    }

    // Geolocation filtering
    if (lat && lng) {
      query['location.coordinates'] = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseFloat(radius) * 1000 // Convert km to meters
        }
      };
    }

    // Build sort object
    let sort: any = {};
    if (sortBy === 'date') {
      sort.date = sortOrder === 'desc' ? -1 : 1;
    } else if (sortBy === 'popularity') {
      sort.attendees = sortOrder === 'desc' ? -1 : 1;
    }

    // Execute query with pagination
    const events = await Event.find(query)
      .populate('organizer', 'name email')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await Event.countDocuments(query);

    return NextResponse.json({
      events,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error: any) {
    console.error('Events fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST /api/events - Create new event (requires authentication)
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    // Get token from header or cookie
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const userId = decoded.userId;

    // Get event data from request
    const eventData = await request.json();

    // Create new event
    const event = new Event({
      ...eventData,
      organizer: userId
    });

    await event.save();

    // Populate organizer info for response
    await event.populate('organizer', 'name email');

    return NextResponse.json(
      { message: 'Event created successfully', event },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Event creation error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation error', details: errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
