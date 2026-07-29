import { type VORVersionSummary, type VersionSummary, isExternalVersionSummary, isPreprintVersionSummary } from '../fetch-data/version-summary';

export const isVORVersionSummary = (version: VersionSummary): version is VORVersionSummary => !isPreprintVersionSummary(version) && !isExternalVersionSummary(version);
