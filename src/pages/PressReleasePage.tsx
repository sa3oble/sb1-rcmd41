import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { usePressReleases } from '../context/PressReleaseContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { stripHtmlTags } from '../utils/htmlUtils';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RelatedPressReleases } from '../components/RelatedPressReleases';

export function PressReleasePage() {
  const { id } = useParams();
  const { getPressReleaseById, pressReleases, loading } = usePressReleases();
  
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <LoadingSpinner />
      </div>
    );
  }

  const pressRelease = id ? getPressReleaseById(id) : null;

  if (!pressRelease) {
    return <Navigate to="/" replace />;
  }

  // Create a clean title for the document
  document.title = `${stripHtmlTags(pressRelease.title)} | PressFlow`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs />
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to all press releases
      </Link>
      <article className="bg-white rounded-lg shadow-md p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {stripHtmlTags(pressRelease.title)}
          </h1>
          <div className="flex items-center justify-between text-gray-600">
            <div className="flex items-center space-x-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {pressRelease.source}
              </span>
              <time className="text-sm" dateTime={pressRelease.publishDate.toISOString()}>
                {format(pressRelease.publishDate, 'MMMM d, yyyy')}
              </time>
            </div>
            <a
              href={pressRelease.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              View Original
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>
        </header>
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: pressRelease.content }}
        />
      </article>

      <RelatedPressReleases
        currentId={pressRelease.id}
        source={pressRelease.source}
        pressReleases={pressReleases}
      />
    </div>
  );
}