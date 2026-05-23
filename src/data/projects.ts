export interface Project {
  id: string;
  name: string;
  description?: string;
  github?: string;
  demo?: string;
  docs?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    name: 'shaumin-dev',
    description: 'Personal site',
    github: 'https://github.com/shaumin/shaumin-dev',
    demo: 'https://shaumin.github.io/shaumin-dev/',
  },
  {
    id: '2',
    name: 'example-app',
    description: 'A demo application',
    github: 'https://github.com/shaumin/example-app',
    demo: 'https://example.com',
    docs: 'https://docs.example.com',
  },
  {
    id: '3',
    name: 'cli-tool',
    description: 'Command line utility',
    github: 'https://github.com/shaumin/cli-tool',
    docs: 'https://docs.example.com/cli',
  },
  {
    id: '4',
    name: 'data-viz',
    description: 'Data visualization library',
  },
  {
    id: '5',
    name: 'api-client',
    description: 'REST API client',
    github: 'https://github.com/shaumin/api-client',
    demo: 'https://demo.example.com',
  },
  {
    id: '6',
    name: 'ml-pipeline',
    description: 'Machine learning pipeline',
    github: 'https://github.com/shaumin/ml-pipeline',
  },
];
