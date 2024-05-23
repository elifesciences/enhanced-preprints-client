import { EnhancedArticleWithVersions } from '../types';
import { getLatestVersion } from './get-latest-version';
import { mock85111 } from './mocks/enhanced-article-with-versions';

describe('getLatestVersion', () => {
  it('single version', () => {
    const input: EnhancedArticleWithVersions = {
      article: mock85111.article,
      versions: {
        '85111v1': mock85111.versions['85111v1'],
      },
    };

    const result = getLatestVersion(input);

    expect(result.versionIdentifier).toStrictEqual(mock85111.article.versionIdentifier);
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

    const result = getLatestVersion(input);

    expect(result.versionIdentifier).toStrictEqual('2');
  });

  it('two versions, current is not latest', () => {
    const input: EnhancedArticleWithVersions = {
      article: mock85111.article,
      versions: {
        '85111v1': mock85111.versions['85111v1'],
        '85111v2': mock85111.versions['85111v2'],
      },
    };

    const result = getLatestVersion(input);

    expect(result.versionIdentifier).toStrictEqual('2');
  });

  it('3 versions,current is not latest, latest is vor', () => {
    const result = getLatestVersion(mock85111);

    expect(result.versionIdentifier).toStrictEqual('3');
  });
});
