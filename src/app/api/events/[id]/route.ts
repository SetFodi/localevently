import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';

// GET /api/events/[id] - Get single event
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const eventId = params.id;

    const event = await Event.findById(eventId)
      .populate('organizer', 'name email')
      .populate('attendees', 'name email')
      .lean();

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ event });

  } catch (error: any) {
    console.error('Get event error:', error);
    
    if (error.name === 'CastError') {
      return NextResponse.json(
        { error: 'Invalid event ID' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

// PUT /api/events/[id] - Update event (organizer only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const eventId = params.id;

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Check if user is the organizer
    if (event.organizer.toString() !== userId) {
      return NextResponse.json(
        { error: 'Only the event organizer can update this event' },
        { status: 403 }
      );
    }

    // Get update data from request
    const updateData = await request.json();
    
    // Remove fields that shouldn't be updated
    delete updateData.organizer;
    delete updateData.attendees;
    delete updateData._id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    // Update the event
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      updateData,
      { new: true, runValidators: true }
    ).populate('organizer', 'name email');

    return NextResponse.json({
      message: 'Event updated successfully',
      event: updatedEvent
    });

  } catch (error: any) {
    console.error('Update event error:', error);
    
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

    if (error.name === 'CastError') {
      return NextResponse.json(
        { error: 'Invalid event ID' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[id] - Delete event (organizer only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const eventId = params.id;

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Check if user is the organizer
    if (event.organizer.toString() !== userId) {
      return NextResponse.json(
        { error: 'Only the event organizer can delete this event' },
        { status: 403 }
      );
    }

    // Delete the event
    await Event.findByIdAndDelete(eventId);

    return NextResponse.json({
      message: 'Event deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete event error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    if (error.name === 'CastError') {
      return NextResponse.json(
        { error: 'Invalid event ID' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}
