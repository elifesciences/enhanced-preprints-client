import { z } from "zod";
import type { VersionSummary } from "./version-summary";
import { IsoDateStringSchema } from "../../types";

export const ExternalVersionSummarySchema = z.object({
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

export const isExternalVersionSummary = (version: VersionSummary): version is ExternalVersionSummary => Object.hasOwn(version, 'url');
