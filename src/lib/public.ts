import { existsSync } from 'node:fs';

// Site root without a trailing slash; prefix every internal link with it, so a project-page base path would still work.
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');

// URL of a file under public/, or undefined while the file is not there, so a missing PDF never ships a dead link.
// ponytail: path is relative to the project root, which is where astro dev/build run.
export const publicFile = (path?: string) =>
  path && existsSync(`public/${path}`) ? `${base}/${path}` : undefined;
