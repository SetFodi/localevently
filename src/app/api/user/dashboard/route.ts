import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import { Event, User } from '@/models';

// GET /api/user/dashboard - Get user dashboard data
export async function GET(request: NextRequest) {
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

    // Get user info
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get events organized by user
    const organizedEvents = await Event.find({ organizer: userId })
      .populate('organizer', 'name email')
      .sort({ date: 1 })
      .lean();

    // Get events user is attending
    const attendingEvents = await Event.find({ 
      attendees: userId,
      organizer: { $ne: userId } // Exclude events they're organizing
    })
      .populate('organizer', 'name email')
      .sort({ date: 1 })
      .lean();

    // Calculate statistics
    const stats = {
      totalOrganized: organizedEvents.length,
      totalAttending: attendingEvents.length,
      upcomingOrganized: organizedEvents.filter(event => new Date(event.date) > new Date()).length,
      upcomingAttending: attendingEvents.filter(event => new Date(event.date) > new Date()).length,
      totalAttendees: organizedEvents.reduce((sum, event) => sum + event.attendees.length, 0)
    };

    return NextResponse.json({
      user,
      organizedEvents,
      attendingEvents,
      stats
    });

  } catch (error: any) {
    console.error('Dashboard error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
