// Personal content for the Experience, Tech stack, CV and Certificates sections. The site logic only reads this file.

// Newest first. `logo` is an optional file in public/logos/.
export const EXPERIENCE = [
  {
    org: 'Second company', role: 'Senior Engineer', when: '2020 – now', place: 'City',
    points: ['What you built, and the result.', 'What you owned.'],
    stack: ['TypeScript', 'Python'],
  },
  {
    org: 'First company', role: 'Engineer', when: '2017 – 2020', place: 'City',
    points: ['What you built, and the result.'],
    stack: ['C++'],
  },
];

// `icon` is a simple-icons slug with a file in public/logos/tech/ (https://simpleicons.org, CC0).
// Without `icon` the item shows as text only.
export const STACK = [
  { group: 'Languages', items: [{ name: 'TypeScript' }, { name: 'Python' }, { name: 'C++' }] },
  { group: 'Tooling', items: [{ name: 'Git' }, { name: 'Docker' }, { name: 'Linux' }] },
];

// PDFs in public/cv/. A button only appears once its file exists, so a missing PDF never ships a dead link.
export const CV = [
  { label: 'English', lang: 'en', file: 'cv-en.pdf' },
  { label: 'Deutsch', lang: 'de', file: 'cv-de.pdf' },
];

// Certificates. They also appear as steps on the timeline, behind their own legend switch.
// `date` is a decimal year like in timeline.ts. `file` is a PDF in public/certificates/; without one the entry is not linked.
export const CERTS = [
  { date: 2018, when: '2018', title: 'Example certificate', org: 'Issuer', note: 'What it covers.' },
];
