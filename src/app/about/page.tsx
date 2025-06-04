'use client';

import { Calendar, MapPin, Users, Heart, Globe, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Calendar className="h-16 w-16 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About LocalEvently
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Connecting communities through hyperlocal event discovery. Find, create, and attend 
            events happening right in your neighborhood.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center leading-relaxed">
            LocalEvently was born from the belief that the best experiences happen when communities 
            come together. We're building a platform that makes it effortless to discover what's 
            happening around you and connect with like-minded people in your area.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <MapPin className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Hyperlocal Discovery
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Find events happening within walking distance or across your city with our 
              location-based search and interactive map.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <Users className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Community Building
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Connect with neighbors, make new friends, and build stronger communities 
              through shared experiences and interests.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <Zap className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Easy Event Creation
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Host your own events with our intuitive creation tools. From small gatherings 
              to large community events, we make organizing simple.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <Heart className="h-12 w-12 text-red-600 dark:text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              RSVP & Networking
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              RSVP to events you're interested in and see who else is attending. 
              Build your local network before you even arrive.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <Globe className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Diverse Categories
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              From tech meetups to art workshops, fitness classes to food festivals - 
              discover events across all interests and hobbies.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <Calendar className="h-12 w-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Smart Scheduling
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Never miss an event with our intelligent filtering and sorting options. 
              Find events that fit your schedule and interests perfectly.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
          <div className="max-w-3xl mx-auto text-lg leading-relaxed">
            <p className="mb-4">
              LocalEvently started as a simple idea: what if discovering local events was as easy 
              as checking the weather? Too often, amazing events happen right under our noses, 
              but we never hear about them until it's too late.
            </p>
            <p className="mb-4">
              We built LocalEvently to solve this problem by creating a centralized hub where 
              event organizers can reach their local audience and community members can easily 
              discover what's happening around them.
            </p>
            <p>
              Today, LocalEvently is helping thousands of people connect with their communities, 
              discover new experiences, and build lasting relationships through shared interests 
              and local events.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join our community and start discovering amazing events in your area today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/events"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse Events
            </a>
            <a
              href="/events/create"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Host an Event
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
