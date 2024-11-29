import React from 'react';
import { Newspaper } from 'lucide-react';

export function WelcomeBox() {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
      <div className="flex items-center gap-4 mb-4">
        <Newspaper className="h-10 w-10 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-900">Press Release Hub</h1>
      </div>
      <p className="text-gray-600 text-lg leading-relaxed mb-4">
        Welcome to PressFlow, your real-time aggregator for the latest press releases from trusted sources. 
        Stay informed with instant updates from Pressat and PR Newswire APAC, all in one convenient location.
      </p>
      <div className="text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString()} • Refreshes automatically every 5 minutes
      </div>
    </div>
  );
}