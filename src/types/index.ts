export interface PressRelease {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  publishDate: Date;
  source: string;
  link: string;
}

export interface RSSFeedConfig {
  name: string;
  url: string;
}