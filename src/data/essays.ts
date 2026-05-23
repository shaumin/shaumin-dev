export interface Essay {
  id: string;
  title: string;
  url: string;
  date: string;
}

export const essays: Essay[] = [
  { id: '1', title: 'On building personal websites', url: '#', date: '2025-05-01' },
  { id: '2', title: 'Why I switched to TanStack Router', url: '#', date: '2025-04-15' },
  { id: '3', title: 'The case for hash routing', url: '#', date: '2025-03-22' },
  { id: '4', title: 'Mantine vs Tailwind: a comparison', url: '#', date: '2025-02-10' },
  { id: '5', title: 'Static sites in 2025', url: '#', date: '2025-01-05' },
  { id: '6', title: 'Vite and the future of bundling', url: '#', date: '2024-12-18' },
];
