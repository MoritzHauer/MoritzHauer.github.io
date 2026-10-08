// Personal content: who you are and what the pages say. The site logic only reads this file.
// Images (`image`) are files in public/logos/.
export const PROFILE = {
  name: 'Moritz Hauer',
  location: 'Karlsruhe, Germany',
  github: 'https://github.com/MoritzHauer',
  linkedin: 'https://www.linkedin.com/in/moritz-hauer-82795a3a9/',
  description: 'Experienced software engineer: industrial simulation and test infrastructure, side projects, and AI workflows.',

  hero: {
    title: 'Experienced software engineer. Always a side project running.',
    intro: 'I have built control software for power-to-gas plants and simulation and test infrastructure for industrial machines.',
    highlight: 'Outside work I design, build and ship my own products, and AI is part of how I work every day: agent workflows, tooling, and a clear sense of where a model helps and where it needs checking.',
  },
  status: 'Open for new impactful projects',
  contact: 'Karlsruhe, Germany. Remote preferred, and open to selected freelance work.',

  blog: {
    description: 'Notes on engineering, the FabLab, and looking for mushrooms.',
    intro: 'Engineering notes, and the things I do when I am not at a keyboard.',
  },

  projects: [
    {
      name: 'BetterBeaver',
      url: 'https://betterbeaver.de',
      image: 'betterbeaver.png',
      imageAlt: 'BetterBeaver mascot, a beaver reading a wooden book',
      summary: 'A spaced-repetition learning platform, designed, built and shipped on my own.',
      points: [
        'Offline-capable progressive web app: once a book is downloaded it works without a connection.',
        'User accounts and data access on a PostgreSQL backend.',
        'Automated tests, CI/CD, and architecture decisions written down in the repository rather than kept in my head.',
      ],
      stack: ['TypeScript', 'React', 'PWA', 'PostgreSQL', 'Vitest', 'GitHub Actions'],
    },
  ],
};
