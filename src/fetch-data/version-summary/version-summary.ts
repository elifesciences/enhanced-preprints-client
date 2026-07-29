import { z } from 'zod';
import { type ExternalVersionSummary, ExternalVersionSummarySchema } from './external-version-summary';
import { type PreprintVersionSummary, PreprintVersionSummarySchema } from './preprint-version-summary';
import { type VORVersionSummary, VORVersionSummarySchema } from './vor-version-summary';

export const VersionSummarySchema = z.union([ExternalVersionSummarySchema, PreprintVersionSummarySchema, VORVersionSummarySchema]);

export type VersionSummary = VORVersionSummary | PreprintVersionSummary | ExternalVersionSummary;
