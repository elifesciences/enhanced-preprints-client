import { z } from "zod";
import { IsoDateStringSchema } from "../../types";

const ExternalVersionSummarySchema = z.object({
    doi: z.string(),
    versionIdentifier: z.string(),
    published: z.union([IsoDateStringSchema, z.null()]),
    url: z.string(),
    corrections: z.array(z.object({
        date: IsoDateStringSchema,
        url: z.string()
    })).optional(),
});

export type ExternalVersionSummary = z.infer<typeof ExternalVersionSummarySchema>;

const PreprintVersionSummarySchema = z.object({
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

const VORVersionSummarySchema = z.object({
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

export const VersionSummarySchema = z.union([ExternalVersionSummarySchema, PreprintVersionSummarySchema, VORVersionSummarySchema]);

export type VersionSummary = VORVersionSummary | PreprintVersionSummary | ExternalVersionSummary;

