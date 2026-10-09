// The site themes, in header order. A new theme also needs a token block in src/styles/global.css,
// a drawer in ./scenery.ts and a sprite in ./Sprites.astro.
export const THEMES = [
  { id: 'nature', label: 'Nature', icon: 'mountain' },
  { id: 'river', label: 'River', icon: 'waves' },
  { id: 'dev', label: '</dev>', icon: 'chip' },
];

// Shown before a visitor picks one, and wherever a theme id is unknown.
export const DEFAULT_THEME = 'river';
