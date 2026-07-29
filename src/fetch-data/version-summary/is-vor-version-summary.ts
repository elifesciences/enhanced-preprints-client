import { isExternalVersionSummary } from './is-external-version-summary';
import { isPreprintVersionSummary } from './is-preprint-version-summary';
import { type VersionSummary } from './version-summary';
import { type VORVersionSummary } from './vor-version-summary';

export const isVORVersionSummary = (version: VersionSummary): version is VORVersionSummary => !isPreprintVersionSummary(version) && !isExternalVersionSummary(version);
