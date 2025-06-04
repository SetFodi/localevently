import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';
import User from '@/models/User';

// POST /api/events/[id]/rsvp - RSVP to an event
export async function POST(
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

    // Check if user is already attending
    const isAlreadyAttending = event.attendees.includes(userId);
    
    if (isAlreadyAttending) {
      // Remove RSVP (toggle off)
      event.attendees = event.attendees.filter(
        (attendeeId: any) => attendeeId.toString() !== userId
      );
      await event.save();
      
      return NextResponse.json({
        message: 'RSVP removed successfully',
        isAttending: false,
        attendeeCount: event.attendees.length
      });
    } else {
      // Check if event has reached max capacity
      if (event.maxAttendees && event.attendees.length >= event.maxAttendees) {
        return NextResponse.json(
          { error: 'Event has reached maximum capacity' },
          { status: 400 }
        );
      }

      // Add RSVP
      event.attendees.push(userId);
      await event.save();
      
      return NextResponse.json({
        message: 'RSVP successful',
        isAttending: true,
        attendeeCount: event.attendees.length
      });
    }

  } catch (error: any) {
    console.error('RSVP error:', error);
    
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
      { error: 'Failed to process RSVP' },
      { status: 500 }
    );
  }
}

// GET /api/events/[id]/rsvp - Check RSVP status
export async function GET(
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
        { isAttending: false, attendeeCount: 0 }
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

    const isAttending = event.attendees.includes(userId);
    
    return NextResponse.json({
      isAttending,
      attendeeCount: event.attendees.length,
      maxAttendees: event.maxAttendees
    });

  } catch (error: any) {
    console.error('RSVP status check error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json(
        { isAttending: false, attendeeCount: 0 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to check RSVP status' },
      { status: 500 }
    );
  }
}
