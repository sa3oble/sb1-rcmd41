import React from 'react';
import { Link } from 'react-router-dom';
import { PressRelease } from '../types';
import { stripHtmlTags } from '../utils/htmlUtils';
import { formatRelativeDate } from '../utils/dateFormatter';

interface RelatedPressReleasesProps {
  currentId: string;
  source: string;
  pressReleases: PressRelease[];
}

export function RelatedPressReleases({ currentId, source, pressReleases }: RelatedPressReleasesProps) {
  const relatedReleases = pressReleases
    .filter(release => release.id !== currentId && release.source === source)
    .slice(0, 4);

  if (relatedReleases.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Press Releases</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedReleases.map((release) => (
          <Link
            key={release.id}
            to={`/release/${release.id}`}
            className="block bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {release.source}
              </span>
              <time
                className="text-sm text-gray-500"
                dateTime={release.publishDate.toISOString()}
              >
                {formatRelativeDate(release.publishDate)}
              </time>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {stripHtmlTags(release.title)}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {release.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}