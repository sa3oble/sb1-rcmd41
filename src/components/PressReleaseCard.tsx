import React from 'react';
import { Link } from 'react-router-dom';
import { formatRelativeDate } from '../utils/dateFormatter';
import { PressRelease } from '../types';
import { ExternalLink } from 'lucide-react';

interface PressReleaseCardProps {
  pressRelease: PressRelease;
}

export function PressReleaseCard({ pressRelease }: PressReleaseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-[1.02]">
      <div className="flex justify-between items-start mb-2">
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
          {pressRelease.source}
        </span>
        <time 
          className="text-sm text-gray-500" 
          dateTime={pressRelease.publishDate.toISOString()}
          title={pressRelease.publishDate.toLocaleDateString()}
        >
          {formatRelativeDate(pressRelease.publishDate)}
        </time>
      </div>
      <Link to={`/release/${pressRelease.id}`}>
        <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
          {pressRelease.title}
        </h2>
      </Link>
      <p className="text-gray-600 mb-4">{pressRelease.excerpt}</p>
      <div className="flex justify-end">
        <a
          href={pressRelease.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          Read original
          <ExternalLink className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  );
}