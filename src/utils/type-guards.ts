import { type VersionSummary, type ExternalVersionSummary, type PreprintVersionSummary, type VORVersionSummary } from '../fetch-data/version-summary';

export const isPreprintVersionSummary = (version: VersionSummary): version is PreprintVersionSummary => Object.hasOwn(version, 'preprintPosted');
export const isExternalVersionSummary = (version: VersionSummary): version is ExternalVersionSummary => Object.hasOwn(version, 'url');
export const isVORVersionSummary = (version: VersionSummary): version is VORVersionSummary => !isPreprintVersionSummary(version) && !isExternalVersionSummary(version);
