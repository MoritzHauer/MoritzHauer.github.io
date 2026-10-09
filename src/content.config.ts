import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    // Defaults to true: a post ships only when you explicitly set draft: false.
    draft: z.boolean().default(true),
    // Engineering posts are the default feed; personal posts are hidden behind a switch.
    kind: z.enum(['engineering', 'personal']),
    // Which humor and honesty rules apply (docs/blog-style.md, Tone).
    tone: z.enum(['plain', 'playful']).default('plain'),
    // When the subject took place, if not the publish date: 'YYYY' or 'YYYY-MM'. Places the post on the timeline.
    happened: z.preprocess((v) => (typeof v === 'number' ? String(v) : v), z.string().regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/)).optional(),
  }),
});

export const collections = { blog };
