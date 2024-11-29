import React, { useState } from 'react';
import { PressReleaseCard } from '../components/PressReleaseCard';
import { FilterBar } from '../components/FilterBar';
import { Pagination } from '../components/Pagination';
import { WelcomeBox } from '../components/WelcomeBox';
import { usePressReleases } from '../context/PressReleaseContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

const ITEMS_PER_PAGE = 9;

export function HomePage() {
  const { pressReleases, loading, error } = usePressReleases();
  const [selectedSource, setSelectedSource] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredReleases = pressReleases
    .filter(release => !selectedSource || release.source === selectedSource)
    .sort((a, b) => {
      const comparison = b.publishDate.getTime() - a.publishDate.getTime();
      return sortOrder === 'newest' ? comparison : -comparison;
    });

  const totalPages = Math.ceil(filteredReleases.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedReleases = filteredReleases.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSortChange = (sort: 'newest' | 'oldest') => {
    setSortOrder(sort);
    setCurrentPage(1);
  };

  const handleSourceChange = (source: string) => {
    setSelectedSource(source);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <WelcomeBox />
      <FilterBar
        selectedSource={selectedSource}
        onSourceChange={handleSourceChange}
        onSortChange={handleSortChange}
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedReleases.map((release) => (
          <PressReleaseCard key={release.id} pressRelease={release} />
        ))}
        {filteredReleases.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No press releases found
          </div>
        )}
      </div>

      {filteredReleases.length > ITEMS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}