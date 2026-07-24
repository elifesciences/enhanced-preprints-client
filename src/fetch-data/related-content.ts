import * as z from 'zod/v4';

export const RelatedContentSchema = z.object({
    type: z.string(),
    title: z.string(),
    url: z.string(),
    content: z.string().optional(),
    imageUrl: z.string().optional(),
});


export type RelatedContent = z.infer<typeof RelatedContentSchema>;
