import { VersionSummary } from '../../types';
import { generateTimeline } from './generate-timeline';

const versionSummary1: VersionSummary = {
  id: '1v1',
  versionIdentifier: '1',

  doi: '10.00001/1',
  msid: '1',

  preprintDoi: 'doi-123',
  preprintUrl: 'https://doi.org/doi-123',
  preprintPosted: new Date('2023-01-02'),
  published: new Date('2023-01-03'),
};

const versionSummary2: VersionSummary = {
  id: '1v2',
  versionIdentifier: '2',

  doi: '10.00001/1',
  msid: '1',

  preprintDoi: 'doi-123v2',
  preprintUrl: 'https://doi.org/doi-123v2',
  preprintPosted: new Date('2023-01-05'),
  published: new Date('2023-01-09'),
};

const versionSummary3: VersionSummary = {
  id: '1v3',
  versionIdentifier: '3',

  doi: '10.00001/1',
  msid: '1',

  published: new Date('2023-02-09'),
};

const externalVersionSummary3: VersionSummary = {
  doi: 'doi-123v3',
  versionIdentifier: '3',
  published: new Date('2023-02-09'),
  url: 'https://doi.org/doi-123v3',
};

describe('generateTimeline', () => {
  it('should generate the correct timeline with two article versions', () => {
    const timeline = generateTimeline([
      versionSummary1,
      versionSummary2,
    ]);

    expect(timeline).toEqual([
      {
        name: 'timeline_version_title',
        url: '/reviewed-preprints/1v2',
        version: 2,
        date: 'Mon Jan 09 2023',
        versionIndicator: 'v2',
      },
      {
        name: 'timeline_version_title_first_version',
        url: '/reviewed-preprints/1v1',
        version: 1,
        date: 'Tue Jan 03 2023',
        versionIndicator: 'v1',
      },
    ]);
  });

  it('should generate the correct timeline with an external version summary', () => {
    const timeline = generateTimeline([
      versionSummary1,
      versionSummary2,
      externalVersionSummary3,
    ]);

    expect(timeline).toEqual([
      {
        name: 'external_timeline_version_title',
        url: 'https://doi.org/doi-123v3',
        version: 3,
        date: 'Thu Feb 09 2023',
      },
      {
        name: 'timeline_version_title',
        url: '/reviewed-preprints/1v2',
        version: 2,
        date: 'Mon Jan 09 2023',
        versionIndicator: 'v2',
      },
      {
        name: 'timeline_version_title_first_version',
        url: '/reviewed-preprints/1v1',
        version: 1,
        date: 'Tue Jan 03 2023',
        versionIndicator: 'v1',
      },
    ]);
  });

  it('should generate the correct timeline with VOR corrections', () => {
    const timeline = generateTimeline([
      versionSummary1,
      versionSummary2,
      {
        ...externalVersionSummary3,
        corrections: [
          {
            date: new Date('2023-02-10'),
            url: 'https://doi.org/doi-123v3',
          },
        ],
      },
    ]);

    expect(timeline).toEqual([
      {
        name: 'external_timeline_version_title',
        url: 'https://doi.org/doi-123v3',
        version: 3,
        date: 'Fri Feb 10 2023',
        datePrefix: 'external_timeline_version_correction_date_prefix',
      },
      {
        name: 'external_timeline_version_title',
        url: 'https://doi.org/doi-123v3',
        version: 3,
        date: 'Thu Feb 09 2023',
      },
      {
        name: 'timeline_version_title',
        url: '/reviewed-preprints/1v2',
        version: 2,
        date: 'Mon Jan 09 2023',
        versionIndicator: 'v2',
      },
      {
        name: 'timeline_version_title_first_version',
        url: '/reviewed-preprints/1v1',
        version: 1,
        date: 'Tue Jan 03 2023',
        versionIndicator: 'v1',
      },
    ]);
  });

  it('should generate the correct timeline with a Version of Record --deprecated', () => {
    const timeline = generateTimeline([
      versionSummary1,
      versionSummary2,
      versionSummary3,
    ]);

    expect(timeline).toEqual([
      {
        name: 'vor_timeline_version_title',
        url: '/reviewed-preprints/1v3',
        version: 3,
        date: 'Thu Feb 09 2023',
      },
      {
        name: 'timeline_version_title',
        url: '/reviewed-preprints/1v2',
        version: 2,
        date: 'Mon Jan 09 2023',
        versionIndicator: 'v2',
      },
      {
        name: 'timeline_version_title_first_version',
        url: '/reviewed-preprints/1v1',
        version: 1,
        date: 'Tue Jan 03 2023',
        versionIndicator: 'v1',
      },
    ]);
  });

  it.failing('should generate the correct timeline with a Version of Record', () => {
    const timeline = generateTimeline([
      versionSummary1,
      versionSummary2,
      versionSummary3,
    ]);

    expect(timeline).toEqual([
      {
        name: 'vor_timeline_version_title',
        url: '/reviewed-preprints/1v3',
        version: 3,
        date: 'Thu Feb 09 2023',
        versionOfRecord: true,
      },
      {
        name: 'timeline_version_title',
        url: '/reviewed-preprints/1v2',
        version: 2,
        date: 'Mon Jan 09 2023',
        versionIndicator: 'v2',
      },
      {
        name: 'timeline_version_title_first_version',
        url: '/reviewed-preprints/1v1',
        version: 1,
        date: 'Tue Jan 03 2023',
        versionIndicator: 'v1',
      },
    ]);
  });
});
