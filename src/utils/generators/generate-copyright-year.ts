import {
  VersionSummary,
} from '../../types';

export const generateCopyrightYear = (versions: VersionSummary[]): number => versions.reduce((copyrightYear, version) => {
  const year = version.published ? new Date(version.published).getFullYear() : 0;
  return copyrightYear === 0 || year < copyrightYear ? year : copyrightYear;
}, 0);
