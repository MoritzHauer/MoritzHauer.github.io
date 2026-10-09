// Personal content for the career path. The site logic in src/components/Timeline.astro only reads this file.
//
// STEPS: oldest first. A leading ~ in `when` marks a date still to confirm. `logo` is a file in
// public/logos/; without a logo, set `icon` to an Icon.astro name (e.g. 'cert' for a certificate).
export const STEPS = [
  { date: 2015, when: '~2015', title: 'B.Sc.', org: 'Hochschule Offenburg', note: 'Bachelor’s degree.', logo: 'hs-offenburg.png' },
  { date: 2018.7, when: '~2018 – 2021', title: 'M.Sc. Computer Science', org: 'KIT', note: 'Machine learning, robotics and embedded systems. Thesis on indoor sound source localization with multilateration.', logo: 'kit.jpg' },
  { date: 2019, when: '2019 – 2020', title: 'Research Assistant', org: 'KIT', note: 'Side-channel and fault-injection experiments on FPGA platforms, with measurement pipelines and analysis tooling.', logo: 'kit.jpg' },
  { date: 2021, when: '2021 – 2022', title: 'Software Engineer, Automation', org: 'INERATEC', note: 'Control software and monitoring for power-to-gas plants, including a digital twin of a regenerative energy production site.', logo: 'ineratec.png' },
  { date: 2022.5, when: '2022 – now', title: 'Software Engineer', org: 'ARBURG', note: 'Simulation and hardware-in-the-loop test infrastructure for industrial machine controllers.', logo: 'arburg.png' },
];

// Label at the end of the path.
export const NEXT = 'Open for new impactful projects';

// Side projects, shown next to published blog posts behind the legend switch.
export const SIDE = [
  { date: 2022, kind: 'Side project · since 2022', title: 'Member of FabLab Karlsruhe', desc: 'Evenings at the laser cutter, and the people at the next bench.', topic: 'fablab', href: 'https://fablab-karlsruhe.de/', cta: 'Visit fablab-karlsruhe.de' },
  { date: 2024.5, kind: 'Side project · ~2024', title: 'BetterBeaver launched', desc: 'Spaced-repetition learning platform, designed, built and shipped solo.', topic: 'betterbeaver', href: 'https://betterbeaver.de', cta: 'Visit betterbeaver.de' },
];

// Icon per topic. A blog post uses its first tag that appears here. `img` is a file in public/logos/
// (`photo: true` fills the circle), or `icon` is an Icon.astro name.
export const TOPICS = {
  fablab: { color: '#3E8FB0', img: 'fablab.png' },
  betterbeaver: { color: '#EE8A2F', img: 'betterbeaver.png', photo: true },
  foraging: { color: '#8A5A3C', icon: 'mushroom' },
  ai: { color: '#6A57C8', icon: 'ai' },
  coding: { color: '#2E7D5B', icon: 'code' },
  electronics: { color: '#D9A02B', icon: 'chip' },
};
