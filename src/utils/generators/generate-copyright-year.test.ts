import { type VersionSummary } from '../../types';
import { generateCopyrightYear } from './generate-copyright-year';

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
  published: new Date('2024-01-09'),
};

const versionSummary3: VersionSummary = {
  id: '1v3',
  versionIdentifier: '3',

  doi: '10.00001/1',
  msid: '1',

  published: new Date('2025-02-09'),
};

describe('generateCopyrightYear', () => {
  it('should generate the copyright year', () => {
    const copyrightYear = generateCopyrightYear([
      versionSummary1,
    ]);

    expect(copyrightYear).toBe(2023);
  });

  it('should generate the copyright year with multiple versions', () => {
    const copyrightYear = generateCopyrightYear([
      versionSummary1,
      versionSummary2,
      versionSummary3,
    ]);

    expect(copyrightYear).toBe(2023);
  });

  it('should generate the copyright year with multiple versions, not in date order', () => {
    const copyrightYear = generateCopyrightYear([
      versionSummary3,
      versionSummary2,
      versionSummary1,
    ]);

    expect(copyrightYear).toBe(2023);
  });

  it('should generate the copyright year with multiple versions, some without published date', () => {
    const copyrightYear = generateCopyrightYear([
      {
        ...versionSummary1,
        published: null,
      },
      versionSummary2,
      versionSummary3,
    ]);

    expect(copyrightYear).toBe(2024);
  });
});
