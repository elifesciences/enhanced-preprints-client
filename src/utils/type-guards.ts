import {
  ExternalVersionSummary,
  PreprintVersionSummary,
  VORVersionSummary,
  VersionSummary,
} from '../types';

export const isPreprintVersionSummary = (version: VersionSummary): version is PreprintVersionSummary => Object.hasOwn(version, 'preprintPosted');
export const isExternalVersionSummary = (version: VersionSummary): version is ExternalVersionSummary => Object.hasOwn(version, 'url');
export const isVORVersionSummary = (version: VersionSummary): version is VORVersionSummary => !isPreprintVersionSummary(version) && !isExternalVersionSummary(version);
