// Replace these examples with your own experience. Newest first.
export const EXPERIENCE = [
  {
    org: 'Example company', role: 'Software developer', when: '2023 – now', place: 'Your City', logo: '',
    points: ['Built and maintained useful tools with a small team.'],
    stack: ['TypeScript', 'Git'],
  },
];

// Icons are filenames without .svg in public/logos/tech/.
export const STACK = [
  { group: 'Languages', items: [{ name: 'TypeScript', icon: 'typescript' }] },
  { group: 'Tools', items: [{ name: 'Git', icon: 'git' }] },
];
export const TAG_ICONS = {};

// Optional file is a PDF in public/certificates/. Leave it empty for an unlinked entry.
export const CERTS = [
  { date: 2022, when: '2022', title: 'Example course', org: 'Example learning provider', note: 'Describe what you learned.', file: '' },
];

// Add PDFs to public/cv/ and list them here to show download links.
export const CV: { label: string; lang: string; file: string }[] = [];
