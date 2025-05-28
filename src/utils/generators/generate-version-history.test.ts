import { VersionSummary } from '../../types';
import { generateVersionHistory } from './generate-version-history';

const versionSummary1: VersionSummary = {
  id: '1v1',
  versionIdentifier: '1',

  doi: '10.00001/1',
  msid: '1',

  preprintDoi: 'doi-123',
  preprintUrl: 'https://doi.org/doi-123',
  sentForReview: new Date('2023-01-01'),
  preprintPosted: new Date('2023-01-02'),
  published: new Date('2023-01-03'),
};

const vorVersionSummary: VersionSummary = {
  id: '1v3',
  versionIdentifier: '3',

  doi: '10.00001/1',
  msid: '1',

  published: new Date('2024-01-09'),
};

const versionSummary2: VersionSummary = {
  id: '1v2',
  versionIdentifier: '2',

  doi: '10.00001/1',
  msid: '1',

  preprintDoi: 'doi-123v2',
  preprintUrl: 'https://doi.org/doi-123v2',
  preprintPosted: new Date('2023-01-05'),
  sentForReview: new Date('2023-01-06'),
  published: new Date('2023-01-09'),
};

const externalVersionSummary3: VersionSummary = {
  doi: 'doi-123v3',
  versionIdentifier: '3',
  published: new Date('2023-02-09'),
  url: 'https://doi.org/doi-123v3',
};

const externalVersionSummary3WithCorrections: VersionSummary = {
  doi: 'doi-123v3',
  versionIdentifier: '3',
  published: new Date('2023-02-09'),
  url: 'https://doi.org/doi-123v3',
  corrections: [
    {
      date: new Date('2023-02-10'),
      url: 'https://elifesciences.org/articles/1v1',
    },
    {
      date: new Date('2023-02-11'),
      url: 'https://elifesciences.org/articles/1v2',
    },
  ],
};

describe('generateVersionHistory', () => {
  it('should generate the correct version history with two reviewed preprints', () => {
    const history = generateVersionHistory([
      versionSummary1,
      versionSummary2,
    ]);

    expect(history).toEqual([
      {
        date: 'Sun Jan 01 2023',
        label: 'Sent for peer review',
      },
      {
        date: 'Mon Jan 02 2023',
        label: 'Preprint posted',
        url: 'https://doi.org/doi-123',
      },
      {
        label: 'history_version_title_first_version',
        url: '/reviewed-preprints/1v1',
        date: 'Tue Jan 03 2023',
        version: 1,
      },
      {
        label: 'history_version_title',
        url: '/reviewed-preprints/1v2',
        date: 'Mon Jan 09 2023',
        version: 2,
      },
    ]);
  });

  it.failing('should generate the correct version history with two reviewed preprints and a version of record', () => {
    const history = generateVersionHistory([
      versionSummary1,
      versionSummary2,
      vorVersionSummary,
    ]);

    expect(history).toEqual([
      {
        date: 'Sun Jan 01 2023',
        label: 'Sent for peer review',
      },
      {
        date: 'Mon Jan 02 2023',
        label: 'Preprint posted',
        url: 'https://doi.org/doi-123',
      },
      {
        label: 'history_version_title_first_version',
        url: '/reviewed-preprints/1v1',
        date: 'Tue Jan 03 2023',
        version: 1,
      },
      {
        label: 'history_version_title',
        url: '/reviewed-preprints/1v2',
        date: 'Mon Jan 09 2023',
        version: 2,
      },
      {
        label: 'history_version_of_record_title',
        url: '/reviewed-preprints/1v3',
        date: 'Tue Jan 09 2024',
        version: 3,
      },
    ]);
  });

  it('should generate the correct version history with an external version summary', () => {
    const history = generateVersionHistory([
      versionSummary1,
      versionSummary2,
      externalVersionSummary3,
    ]);

    expect(history).toEqual([
      {
        date: 'Sun Jan 01 2023',
        label: 'Sent for peer review',
      },
      {
        date: 'Mon Jan 02 2023',
        label: 'Preprint posted',
        url: 'https://doi.org/doi-123',
      },
      {
        label: 'history_version_title_first_version',
        url: '/reviewed-preprints/1v1',
        date: 'Tue Jan 03 2023',
        version: 1,
      },
      {
        label: 'history_version_title',
        url: '/reviewed-preprints/1v2',
        date: 'Mon Jan 09 2023',
        version: 2,
      },
      {
        label: 'external_history_version_title',
        url: 'https://doi.org/doi-123v3',
        date: 'Thu Feb 09 2023',
        version: 3,
      },
    ]);
  });

  it('should generate the correct version history with an external version summary with corrections', () => {
    const history = generateVersionHistory([
      versionSummary1,
      versionSummary2,
      externalVersionSummary3WithCorrections,
    ]);

    expect(history).toEqual([
      {
        date: 'Sun Jan 01 2023',
        label: 'Sent for peer review',
      },
      {
        date: 'Mon Jan 02 2023',
        label: 'Preprint posted',
        url: 'https://doi.org/doi-123',
      },
      {
        label: 'history_version_title_first_version',
        url: '/reviewed-preprints/1v1',
        date: 'Tue Jan 03 2023',
        version: 1,
      },
      {
        label: 'history_version_title',
        url: '/reviewed-preprints/1v2',
        date: 'Mon Jan 09 2023',
        version: 2,
      },
      {
        label: 'external_history_version_title',
        url: 'https://doi.org/doi-123v3',
        date: 'Thu Feb 09 2023',
        version: 3,
      },
      {
        label: 'external_history_version_title_updated',
        url: 'https://elifesciences.org/articles/1v1',
        date: 'Fri Feb 10 2023',
        version: 3,
      },
      {
        label: 'external_history_version_title_updated',
        url: 'https://elifesciences.org/articles/1v2',
        date: 'Sat Feb 11 2023',
        version: 3,
      },
    ]);
  });
});
