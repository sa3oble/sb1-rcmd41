import { PressRelease } from '../types';

const STORAGE_KEY = 'pressflow_releases';

// Save press releases to localStorage
export function savePressReleases(releases: PressRelease[]) {
  try {
    const data = JSON.stringify(releases);
    localStorage.setItem(STORAGE_KEY, data);
    return true;
  } catch (error) {
    console.error('Error saving press releases:', error);
    return false;
  }
}

// Load press releases from localStorage
export function loadPressReleases(): PressRelease[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return [];
    }
    const releases = JSON.parse(data);
    // Convert string dates back to Date objects
    return releases.map((release: any) => ({
      ...release,
      publishDate: new Date(release.publishDate)
    }));
  } catch (error) {
    console.error('Error loading press releases:', error);
    return [];
  }
}