'use client';

import { useState } from 'react';
import { Search, Filter, Calendar, MapPin, Tag, SlidersHorizontal } from 'lucide-react';
import { EventFilters } from '@/types';

interface EventFiltersProps {
  filters: EventFilters;
  onFiltersChange: (filters: EventFilters) => void;
  onLocationRequest?: () => void;
  isLoadingLocation?: boolean;
}

const POPULAR_TAGS = [
  'music', 'tech', 'art', 'food', 'sports', 'networking', 
  'education', 'health', 'business', 'community', 'outdoor', 'family'
];

const SORT_OPTIONS = [
  { value: 'date', label: 'Date' },
  { value: 'distance', label: 'Distance' },
  { value: 'popularity', label: 'Popularity' }
];

export default function EventFilters({ 
  filters, 
  onFiltersChange, 
  onLocationRequest,
  isLoadingLocation = false 
}: EventFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(filters.tags || []);

  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newTags);
    onFiltersChange({ ...filters, tags: newTags });
  };

  const handleSortChange = (sortBy: string) => {
    onFiltersChange({ ...filters, sortBy: sortBy as 'date' | 'distance' | 'popularity' });
  };

  const handleDateRangeChange = (field: 'from' | 'to', value: string) => {
    const newDate = value ? new Date(value) : undefined;
    onFiltersChange({
      ...filters,
      date: {
        ...filters.date,
        [field]: newDate
      }
    });
  };

  const clearFilters = () => {
    setSelectedTags([]);
    onFiltersChange({
      sortBy: 'date',
      sortOrder: 'asc'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search events..."
          value={filters.search || ''}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      {/* Quick Filters Row */}
      <div className="flex flex-wrap gap-4 items-center mb-4">
        {/* Sort */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-gray-500" />
          <select
            value={filters.sortBy || 'date'}
            onChange={(e) => handleSortChange(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                Sort by {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        {onLocationRequest && (
          <button
            onClick={onLocationRequest}
            disabled={isLoadingLocation}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
          >
            <MapPin className="h-4 w-4" />
            {isLoadingLocation ? 'Getting location...' : 'Use my location'}
          </button>
        )}

        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors text-sm"
        >
          <Filter className="h-4 w-4" />
          Advanced Filters
        </button>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
        >
          Clear all
        </button>
      </div>

      {/* Popular Tags */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Tag className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Popular Tags</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {POPULAR_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Date Range
              </label>
              <div className="space-y-2">
                <input
                  type="date"
                  value={filters.date?.from ? filters.date.from.toISOString().split('T')[0] : ''}
                  onChange={(e) => handleDateRangeChange('from', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  placeholder="From date"
                />
                <input
                  type="date"
                  value={filters.date?.to ? filters.date.to.toISOString().split('T')[0] : ''}
                  onChange={(e) => handleDateRangeChange('to', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  placeholder="To date"
                />
              </div>
            </div>

            {/* Distance */}
            {filters.location && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Distance (km)
                </label>
                <select
                  value={filters.location.radius || 10}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    location: {
                      ...filters.location!,
                      radius: parseInt(e.target.value)
                    }
                  })}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  <option value={5}>Within 5 km</option>
                  <option value={10}>Within 10 km</option>
                  <option value={25}>Within 25 km</option>
                  <option value={50}>Within 50 km</option>
                  <option value={100}>Within 100 km</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
