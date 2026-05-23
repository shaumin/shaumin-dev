export interface RSSItem {
  id: string;
  title: string;
  url: string;
  source: string;
  date: string;
  pinned?: boolean;
}

export const rssItems: RSSItem[] = [
  { id: '1', title: 'The future of web frameworks', url: '#', source: 'Hacker News', date: '2025-05-20', pinned: true },
  { id: '2', title: 'React 19 is here', url: '#', source: 'React Blog', date: '2025-05-18' },
  { id: '3', title: 'TypeScript 5.5 released', url: '#', source: 'TypeScript Blog', date: '2025-05-15', pinned: true },
  { id: '4', title: 'Bun vs Node performance', url: '#', source: 'The Pragmatic Engineer', date: '2025-05-12' },
  { id: '5', title: 'CSS container queries in practice', url: '#', source: 'CSS Tricks', date: '2025-05-10' },
  { id: '6', title: 'AI code assistants review', url: '#', source: 'Dev.to', date: '2025-05-08' },
  { id: '7', title: 'Rust for web developers', url: '#', source: 'Hacker News', date: '2025-05-05' },
];
