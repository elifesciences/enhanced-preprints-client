import {type ExternalVersionSummary} from './external-version-summary';
import {type VersionSummary} from './version-summary';

export const isExternalVersionSummary = (version: VersionSummary): version is ExternalVersionSummary => Object.hasOwn(version, 'url');
