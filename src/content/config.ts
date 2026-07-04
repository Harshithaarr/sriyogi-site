import { defineCollection, z } from 'astro:content';

// News / Darshan updates — managed via the CMS at /admin.
const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    photo: z.string().optional(),
    url: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { news };
