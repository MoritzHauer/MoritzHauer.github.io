import { defineConfig } from 'astro/config';

// GitHub Pages, project page: https://<user>.github.io/personal-site
// For a user page instead (repo named <user>.github.io), drop `base` and set
// site to 'https://<user>.github.io'.
export default defineConfig({
  site: 'https://EXAMPLE.github.io',
  base: '/personal-site',
});
