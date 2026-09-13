// Personal content: who you are and what the pages say. The site logic only reads this file.
// Images (`image`) are files in public/logos/.
export const PROFILE = {
  name: 'Your Name',
  location: 'City, Country',
  github: 'https://github.com/your-handle',
  linkedin: 'https://www.linkedin.com/in/your-handle/',
  description: 'One sentence about you, used as the default meta description.',

  hero: {
    title: 'A short headline about what you do.',
    intro: 'One or two sentences on the work you have done.',
    highlight: 'The sentence you most want a visitor to remember.',
  },
  status: 'Open for new projects',
  contact: 'City, Country. How and where you like to work.',

  blog: {
    description: 'What the blog is about, used as its meta description.',
    intro: 'One line introducing the blog.',
  },

  projects: [
    {
      name: 'Example project',
      url: 'https://example.com',
      summary: 'What it is, in one sentence.',
      points: ['A thing it does.', 'How it is built.'],
      stack: ['TypeScript', 'PostgreSQL'],
    },
  ],
};
