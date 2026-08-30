import { getCollection } from 'astro:content';

// Drafts are visible while running `astro dev`, and never appear in a production build.
// Posts default to draft: true, so an unfinished post cannot ship by accident.
export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
