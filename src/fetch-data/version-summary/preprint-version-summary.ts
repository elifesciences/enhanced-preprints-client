import z from 'zod';
import { IsoDateStringSchema } from '../../types';

export const PreprintVersionSummarySchema = z.object({
  id: z.string(),
  msid: z.string(),
  doi: z.string(),
  versionIdentifier: z.string(),
  umbrellaDoi: z.string().optional(),
  versionDoi: z.string().optional(),
  sentForReview: IsoDateStringSchema.optional(),
  published: z.union([IsoDateStringSchema, z.null()]),
  withEvaluationSummary: z.boolean().optional(),
  preprintDoi: z.string(),
  preprintUrl: z.string(),
  preprintPosted: IsoDateStringSchema,
});

export type PreprintVersionSummary = z.infer<typeof PreprintVersionSummarySchema>;
