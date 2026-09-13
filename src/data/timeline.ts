// Personal content for the career path. The site logic in src/components/Timeline.astro only reads this file.
//
// STEPS: oldest first. A leading ~ in `when` marks a date still to confirm. `logo` is a file in
// public/logos/; without a logo, set `icon` to an Icon.astro name (e.g. 'cert' for a certificate).
export const STEPS = [
  { date: 2015, when: '2012 – 2015', title: 'B.Sc.', org: 'University', note: 'Bachelor’s degree.', icon: 'code' },
  { date: 2017, when: '2015 – 2017', title: 'M.Sc.', org: 'University', note: 'Master’s degree.', icon: 'code' },
  { date: 2019, when: '2017 – 2020', title: 'Engineer', org: 'First company', note: 'What you worked on.', icon: 'code' },
  { date: 2022, when: '2020 – now', title: 'Senior Engineer', org: 'Second company', note: 'What you work on.', icon: 'code' },
];

// Label at the end of the path.
export const NEXT = 'Open for new projects';

// Side projects, shown next to published blog posts behind the legend switch.
export const SIDE = [
  { date: 2021, kind: 'Side project · since 2021', title: 'Example side project', desc: 'One sentence about it.', topic: 'coding', href: 'https://example.com', cta: 'Visit example.com' },
];

// Icon per topic. A blog post uses its first tag that appears here. `img` is a file in public/logos/
// (`photo: true` fills the circle), or `icon` is an Icon.astro name.
export const TOPICS = {
  ai: { color: '#6A57C8', icon: 'ai' },
  coding: { color: '#2E7D5B', icon: 'code' },
};
