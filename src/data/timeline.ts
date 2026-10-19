import { PROFILE } from './profile';

// Oldest first. Optional logo filenames refer to public/logos/.
export const STEPS = [
  { date: 2020, when: '2020', title: 'Started learning', org: 'Example school', note: 'Discovered an interest in building software.', icon: 'code' },
  { date: 2023, when: '2023 – now', title: 'Software developer', org: 'Example company', note: 'Building useful tools with a team.', icon: 'code' },
];
export const NEXT = PROFILE.status;
export const SIDE = [
  { date: 2024, kind: 'Side project · 2024', title: 'Example project', desc: 'An experiment that became a useful tool.', topic: 'coding', href: 'https://example.com', cta: 'View example project' },
];

// A post uses the first tag matching a topic key. Use an Icon.astro name or a logo filename.
export const TOPICS = {
  coding: { color: '#2E7D5B', icon: 'code' },
};
