import {type VORVersionSummary, type PreprintVersionSummary, type VersionSummary, isExternalVersionSummary} from '../fetch-data/version-summary';


export const isPreprintVersionSummary = (version: VersionSummary): version is PreprintVersionSummary => Object.hasOwn(version, 'preprintPosted');
export const isVORVersionSummary = (version: VersionSummary): version is VORVersionSummary => !isPreprintVersionSummary(version) && !isExternalVersionSummary(version);
