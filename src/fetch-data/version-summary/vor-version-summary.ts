import { z } from "zod";
import { IsoDateStringSchema } from "../../types";

export const VORVersionSummarySchema = z.object({
    id: z.string(),
    msid: z.string(),
    doi: z.string(),
    versionIdentifier: z.string(),
    umbrellaDoi: z.string().optional(),
    versionDoi: z.string().optional(),
    sentForReview: IsoDateStringSchema.optional(),
    published: z.union([IsoDateStringSchema, z.null()]),
    withEvaluationSummary: z.boolean().optional(),
});

export type VORVersionSummary = z.infer<typeof VORVersionSummarySchema>;
