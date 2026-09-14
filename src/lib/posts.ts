import { getCollection } from 'astro:content';

// Drafts are visible while running `astro dev`, and never appear in a production build.
// Posts default to draft: true, so an unfinished post cannot ship by accident.
export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// `happened` ('YYYY' or 'YYYY-MM') as a fractional year for the timeline, and a label like "June 2019" or "2019".
export function happenedAt(s) {
  const [y, m] = s.split('-').map(Number);
  const year = m ? y + (m - 1) / 12 : y;
  const label = m
    ? new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })
    : String(y);
  return { year, label };
}
