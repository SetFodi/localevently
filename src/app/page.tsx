export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            LocalEvently
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover and host amazing local events in your city. Connect with your community through free events, meetups, and gatherings.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Browse Events
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-3 rounded-lg font-semibold transition-colors">
              Host an Event
            </button>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              🎯 Hyperlocal Discovery
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Find events happening right in your neighborhood with geolocation-based filtering.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              🆓 Always Free
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              All events on LocalEvently are completely free to attend and host.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              🤝 Community Driven
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Built by the community, for the community. No corporate events, just genuine local connections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
