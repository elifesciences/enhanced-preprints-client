import * as z from 'zod/v4';

export const MetricsSchema = z.object({
    views: z.number(),
    downloads: z.number(),
    citations: z.number(),
});

export type Metrics = z.infer<typeof MetricsSchema>;
