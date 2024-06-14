import { ExternalVersionSummary, PreprintVersionSummary, VersionSummary } from '../types';
import { DatesToStrings } from './type-converters';

export const isPreprintVersionSummary = (version: DatesToStrings<VersionSummary>): version is DatesToStrings<PreprintVersionSummary> => Object.hasOwn(version, 'preprintPosted');
export const isExternalVersionSummary = (version: DatesToStrings<VersionSummary>): version is DatesToStrings<ExternalVersionSummary> => Object.hasOwn(version, 'url');
