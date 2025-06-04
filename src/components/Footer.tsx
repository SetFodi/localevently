import Link from 'next/link';
import { Calendar, Instagram, Facebook, Github, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">LocalEvently</span>
            </div>
            <p className="text-gray-300 mb-4">
              Connecting communities through hyperlocal event discovery. Find, create, and attend 
              events happening right in your neighborhood.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/fartenadzeluka"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/luka.fartenadze.1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://github.com/SetFodi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-200 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://lukapartenadze.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
                aria-label="Portfolio"
              >
                <ExternalLink className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/events" className="text-gray-300 hover:text-white transition-colors">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link href="/events/create" className="text-gray-300 hover:text-white transition-colors">
                  Host Event
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-gray-300 hover:text-white transition-colors">
                  Map View
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white transition-colors">
                  Help & FAQ
                </Link>
              </li>
              <li>
                <Link href="/help#contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="mailto:lukafartenadze2004@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Email Support
                </a>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/auth/login" className="text-gray-300 hover:text-white transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-gray-300 hover:text-white transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-300 hover:text-white transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <p>© 2024 LocalEvently. All rights reserved.</p>
              <p className="mt-1">
                Built with ❤️ by{' '}
                <a
                  href="https://lukapartenadze.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Luka Partenadze
                </a>
              </p>
            </div>
            <div className="text-gray-400 text-sm">
              <p>
                Licensed under{' '}
                <a
                  href="https://opensource.org/licenses/MIT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  MIT License
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
