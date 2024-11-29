import React, { createContext, useContext, useState, useEffect } from 'react';
import { PressRelease } from '../types';
import { fetchRSSFeeds } from '../utils/rssParser';
import { rssFeedConfigs } from '../config/feeds';
import { savePressReleases, loadPressReleases } from '../utils/storage';

interface PressReleaseContextType {
  pressReleases: PressRelease[];
  loading: boolean;
  error: string | null;
  getPressReleaseById: (id: string) => PressRelease | undefined;
  refreshPressReleases: () => Promise<void>;
}

const PressReleaseContext = createContext<PressReleaseContextType | undefined>(undefined);

export function PressReleaseProvider({ children }: { children: React.ReactNode }) {
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load saved press releases on initial mount
  useEffect(() => {
    const savedReleases = loadPressReleases();
    if (savedReleases.length > 0) {
      setPressReleases(savedReleases);
      setLoading(false);
    }
  }, []);

  const refreshPressReleases = async () => {
    try {
      setError(null);
      const feeds = await fetchRSSFeeds(rssFeedConfigs);
      
      // Merge new feeds with existing ones, avoiding duplicates
      const existingIds = new Set(pressReleases.map(release => release.id));
      const newReleases = feeds.filter(release => !existingIds.has(release.id));
      
      if (newReleases.length > 0) {
        const updatedReleases = [...newReleases, ...pressReleases]
          .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
        
        setPressReleases(updatedReleases);
        savePressReleases(updatedReleases);
      }
    } catch (err) {
      setError('Failed to fetch press releases');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshPressReleases();
    const interval = setInterval(refreshPressReleases, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const getPressReleaseById = (id: string) => {
    return pressReleases.find(release => release.id === id);
  };

  return (
    <PressReleaseContext.Provider
      value={{
        pressReleases,
        loading,
        error,
        getPressReleaseById,
        refreshPressReleases
      }}
    >
      {children}
    </PressReleaseContext.Provider>
  );
}

export function usePressReleases() {
  const context = useContext(PressReleaseContext);
  if (context === undefined) {
    throw new Error('usePressReleases must be used within a PressReleaseProvider');
  }
  return context;
}