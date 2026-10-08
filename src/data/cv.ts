// Personal content for the Experience, Tech stack and CV sections. The site logic only reads this file.
// Source of truth is the LaTeX CV (~/git/Lebenslauf); copy facts from there, not the other way round.

// Newest first. `logo` is a file in public/logos/.
export const EXPERIENCE = [
  {
    org: 'ARBURG', role: 'Software Developer, Digital Twin', when: 'Oct 2022 – now', place: 'Karlsruhe', logo: 'arburg.png',
    points: [
      'Designed the architecture of DTSim, a digital twin that simulates every physical input of an injection moulding machine (axes, drives, sensors, I/O), so the unmodified control software runs on a virtual machine and produces real cycle times and signals.',
      'Built it as a plugin framework with multiple fidelity levels, letting domain teams contribute simulation components through defined interfaces; two-person core team, used daily by ~50 developers.',
      'Lets control software be developed and tested before the physical machine exists, with nightly automated tests on all branches; now rolling out to sales and customers, who program their processes on a virtual machine before delivery.',
      'Member of the software architecture team since Jul 2026.',
    ],
    stack: ['C++', 'Python', 'React'],
  },
  {
    org: 'INERATEC', role: 'Software Engineer, Automation', when: 'Oct 2021 – Sep 2022', place: 'Karlsruhe', logo: 'ineratec.png',
    points: [
      'Developed a digital twin of a regenerative energy production site for simulation, testing and remote monitoring before deployment.',
      'Implemented data processing and monitoring tools.',
    ],
    stack: ['Python', 'FastAPI', 'pandas', 'Node.js', 'PostgreSQL', 'React'],
  },
  {
    org: 'KIT, Dependable Nano Computing', role: 'Research Assistant', when: 'Dec 2019 – Jul 2020', place: 'Karlsruhe', logo: 'kit.jpg',
    points: [
      'Reproduced and extended side-channel and fault-injection attacks on FPGA platforms.',
      'Improved experimental setups and Python analysis tooling for reliability and security studies.',
    ],
    stack: ['VHDL', 'Python'],
  },
  {
    org: 'ARBURG', role: 'Test Automation (part-time, B.Sc. thesis)', when: 'Sep 2016 – Feb 2018', place: 'Loßburg', logo: 'arburg.png',
    points: ['Developed automated test systems for industrial machine controllers, including test case design.'],
    stack: ['C#', 'C++'],
  },
];

// `icon` is a file in public/logos/tech/: a simple-icons slug (https://simpleicons.org, CC0) or a hand-drawn line icon.
// Without `icon` the item shows as text only.
export const STACK = [
  { group: 'Languages', items: [
    { name: 'C++', icon: 'cplusplus' }, { name: 'C', icon: 'c' }, { name: 'Python', icon: 'python' },
    { name: 'TypeScript', icon: 'typescript' }, { name: 'C#', icon: 'csharp' },
  ] },
  { group: 'Web and data', items: [
    { name: 'React', icon: 'react' }, { name: 'Node.js', icon: 'nodedotjs' },
    { name: 'PostgreSQL', icon: 'postgresql' }, { name: 'PWA', icon: 'pwa' },
  ] },
  { group: 'Testing and delivery', items: [
    { name: 'GitHub Actions', icon: 'githubactions' },
    { name: 'Docker', icon: 'docker' }, { name: 'Linux', icon: 'linux' }, { name: 'Git', icon: 'git' },
  ] },
  { group: 'AI-assisted development', items: [
    { name: 'Claude Code', icon: 'claude' }, { name: 'GitHub Copilot', icon: 'githubcopilot' },
  ] },
  { group: 'Focus', items: [
    { name: 'Digital twins', icon: 'digitaltwin' }, { name: 'Simulation', icon: 'simulation' },
    { name: 'Hardware-in-the-loop', icon: 'hil' }, { name: 'Software architecture', icon: 'architecture' },
  ] },
];

// Icons for Experience and Projects tags that are not in STACK; tags in STACK reuse its icon.
export const TAG_ICONS = { FastAPI: 'fastapi', pandas: 'pandas', VHDL: 'vhdl', Vitest: 'vitest' };

// Certificates. They also appear as steps on the timeline, behind their own legend switch.
// `date` is a decimal year like in timeline.ts. `file` is a PDF in public/certificates/; without one the entry is not linked.
export const CERTS = [
  { date: 2016.05, when: 'Jan 2016', title: 'Mentor, MINT-College', org: 'Hochschule Offenburg', note: 'Mentored a group of first-semester students through winter semester 2015/16, after a mentor training in project management basics.', file: 'mint-college-mentor.pdf' },
  { date: 2016.33, when: 'Apr 2016', title: 'ISTQB Certified Tester', org: 'Foundation Level', note: 'Software testing fundamentals: test techniques, test management and testing across the life cycle.', file: 'istqb-certified-tester-foundation.pdf' },
  { date: 2022.85, when: 'Nov 2022', title: 'Digital Twin Implementation', org: 'University4Industry · IDTA', note: 'Three-week training on the digital twin and the Asset Administration Shell in practice.', file: 'idta-digital-twin-implementation.pdf' },
  { date: 2026.3, when: 'Spring 2026', title: 'AI Safety Collab', org: 'ENAIS', note: 'Structured course on AI alignment and safety.' },
];

// PDFs in public/cv/. A button only appears once its file exists, so a missing PDF never ships a dead link.
export const CV = [
  { label: 'English', lang: 'en', file: 'moritz-hauer-cv-en.pdf' },
  { label: 'Deutsch', lang: 'de', file: 'moritz-hauer-lebenslauf-de.pdf' },
];
