import { z } from "zod";
import { type ExternalVersionSummary, ExternalVersionSummarySchema } from "./external-version-summary";
import { type PreprintVersionSummary, PreprintVersionSummarySchema } from "./preprint-version-summary";
import { IsoDateStringSchema } from "../../types";

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

