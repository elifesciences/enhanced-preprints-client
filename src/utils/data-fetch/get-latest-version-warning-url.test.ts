import { EnhancedArticleWithVersions } from '../../types';
import { getLatestVersionWarningUrl } from './get-latest-version-warning-url';
import { mock85111 } from '../mocks/enhanced-article-with-versions';

describe('getLatestVersion', () => {
  it('single version', () => {
    const input: EnhancedArticleWithVersions = {
      article: mock85111.article,
      versions: {
        '85111v1': mock85111.versions['85111v1'],
      },
    };

    const result = getLatestVersionWarningUrl(input);

    expect(result).toBeNull();
  });

  it('single version preview', () => {
    const input: EnhancedArticleWithVersions = {
      article: {
        ...mock85111.article,
        published: null,
      },
      versions: {
        '85111v1': {
          ...mock85111.versions['85111v1'],
          published: null,
        },
      },
    };

    const result = getLatestVersionWarningUrl(input);
    expect(result).toBeNull();
  });

  it('two versions, current is the latest', () => {
    const input: EnhancedArticleWithVersions = {
      article: {
        ...mock85111.article,
        versionIdentifier: '2',
      },
      versions: {
        '85111v1': mock85111.versions['85111v1'],
        '85111v2': mock85111.versions['85111v2'],
      },
    };

    const result = getLatestVersionWarningUrl(input);

    expect(result).toBeNull();
  });

  it('two versions, current is not published', () => {
    const input: EnhancedArticleWithVersions = {
      article: {
        ...mock85111.article,
        published: null,
        versionIdentifier: '2',
      },
      versions: {
        '85111v1': mock85111.versions['85111v1'],
        '85111v2': {
          ...mock85111.versions['85111v2'],
          published: null,
        },
      },
    };

    const result = getLatestVersionWarningUrl(input);

    expect(result).toStrictEqual('/reviewed-preprints/85111');
  });

  it('two versions, current is not latest', () => {
    const input: EnhancedArticleWithVersions = {
      article: mock85111.article,
      versions: {
        '85111v1': mock85111.versions['85111v1'],
        '85111v2': mock85111.versions['85111v2'],
      },
    };

    const result = getLatestVersionWarningUrl(input);

    expect(result).toStrictEqual('/reviewed-preprints/85111');
  });

  it('two versions, current is only published', () => {
    const input: EnhancedArticleWithVersions = {
      article: mock85111.article,
      versions: {
        '85111v1': mock85111.versions['85111v1'],
        '85111v2': {
          ...mock85111.versions['85111v2'],
          published: null,
        },
      },
    };

    const result = getLatestVersionWarningUrl(input);

    expect(result).toBeNull();
  });

  it('3 versions, current is not latest, latest is vor', () => {
    const result = getLatestVersionWarningUrl(mock85111);

    expect(result).toStrictEqual('https://doi.org/10.7554/eLife.85111.3');
  });

  it('3 versions, current is not latest, latest is vor, vor published date in future', () => {
    const input: EnhancedArticleWithVersions = {
      article: mock85111.article,
      versions: {
        '85111v1': mock85111.versions['85111v1'],
        '85111v2': mock85111.versions['85111v2'],
        '85111v3': {
          ...mock85111.versions['85111v3'],
          // Tomorrow, tomorrow, I love ya, tomorrow
          published: new Date(new Date().setDate(new Date().getDate() + 1)),
        },
      },
    };

    const result = getLatestVersionWarningUrl(input);

    expect(result).toStrictEqual('/reviewed-preprints/85111');
  });
});
