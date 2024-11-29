import React from 'react';
import { rssFeedConfigs } from '../config/feeds';

interface FilterBarProps {
  selectedSource: string;
  onSourceChange: (source: string) => void;
  onSortChange: (sort: 'newest' | 'oldest') => void;
}

export function FilterBar({ selectedSource, onSourceChange, onSortChange }: FilterBarProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6 flex flex-wrap gap-4">
      <select
        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedSource}
        onChange={(e) => onSourceChange(e.target.value)}
      >
        <option value="">All Sources</option>
        {rssFeedConfigs.map((feed) => (
          <option key={feed.name} value={feed.name}>
            {feed.name}
          </option>
        ))}
      </select>

      <select
        className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onSortChange(e.target.value as 'newest' | 'oldest')}
        defaultValue="newest"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
}