import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import { User, Event } from '@/models';

export async function DELETE(request: NextRequest) {
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

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Delete all events created by this user
    await Event.deleteMany({ organizer: userId });

    // Remove user from attendees list of all events
    await Event.updateMany(
      { attendees: userId },
      { $pull: { attendees: userId } }
    );

    // Delete the user account
    await User.findByIdAndDelete(userId);

    // Create response and clear the HTTP-only cookie
    const response = NextResponse.json(
      { message: 'Account deleted successfully' },
      { status: 200 }
    );

    // Clear the HTTP-only cookie
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0 // Expire immediately
    });

    return response;

  } catch (error: any) {
    console.error('Delete account error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
