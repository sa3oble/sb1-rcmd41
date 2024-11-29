import { PressRelease, RSSFeedConfig } from '../types';
import { stripHtmlTags, sanitizeHtml } from './htmlUtils';

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

function parseXMLContent(xmlText: string): Document {
  const parser = new DOMParser();
  return parser.parseFromString(xmlText, 'text/xml');
}

function extractTextContent(element: Element | null): string {
  return element?.textContent?.trim() || '';
}

function generateUniqueId(item: Element, source: string): string {
  const guid = extractTextContent(item.querySelector('guid'));
  const link = extractTextContent(item.querySelector('link'));
  const title = extractTextContent(item.querySelector('title'));
  const pubDate = extractTextContent(item.querySelector('pubDate'));
  
  // Create a unique string combining multiple fields
  const uniqueString = [
    guid,
    link,
    title,
    pubDate,
    source,
    Math.random().toString(36).substring(2, 15) // Add random component for guaranteed uniqueness
  ].filter(Boolean).join('-');
  
  // Create a hash of the unique string
  let hash = 0;
  for (let i = 0; i < uniqueString.length; i++) {
    const char = uniqueString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Convert to base36 and ensure positive number
  return Math.abs(hash).toString(36);
}

function parseRSSItem(item: Element, source: string): PressRelease {
  const title = stripHtmlTags(extractTextContent(item.querySelector('title')));
  const rawContent = extractTextContent(item.querySelector('description')) || 
                    extractTextContent(item.querySelector('content:encoded'));
  const sanitizedContent = sanitizeHtml(rawContent);
  const strippedContent = stripHtmlTags(rawContent);
  const link = extractTextContent(item.querySelector('link'));
  const pubDate = extractTextContent(item.querySelector('pubDate'));

  return {
    id: generateUniqueId(item, source),
    title: title || 'Untitled',
    content: sanitizedContent,
    excerpt: strippedContent.slice(0, 150) + (strippedContent.length > 150 ? '...' : ''),
    publishDate: new Date(pubDate || Date.now()),
    source,
    link: link || ''
  };
}

export async function fetchRSSFeeds(feeds: RSSFeedConfig[]): Promise<PressRelease[]> {
  try {
    const feedPromises = feeds.map(async (feed) => {
      try {
        const response = await fetch(CORS_PROXY + encodeURIComponent(feed.url));
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const xmlText = await response.text();
        const xmlDoc = parseXMLContent(xmlText);
        
        if (xmlDoc.querySelector('parsererror')) {
          throw new Error('Invalid XML content');
        }
        
        const items = Array.from(xmlDoc.querySelectorAll('item'));
        return items.map(item => parseRSSItem(item, feed.name));
      } catch (error) {
        console.error(`Error fetching ${feed.name}:`, error);
        return [];
      }
    });

    const results = await Promise.all(feedPromises);
    return results.flat().sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
  } catch (error) {
    console.error('Error fetching RSS feeds:', error);
    return [];
  }
}