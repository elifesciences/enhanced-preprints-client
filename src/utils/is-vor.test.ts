import { type EnhancedArticleWithVersions } from '../types';
import { isVor } from './is-vor';

describe('isVor', () => {
  describe('Given a version that is not a Version of Record', () => {
    const notVor = {
      article: {
        msid: '12345',
        versionIdentifier: '1',
      },
      versions: {
        // eslint-disable-next-line quote-props
        '1': {
          versionIdentifier: '1',
          preprintPosted: '2022-01-01',
        },
      },
    } as unknown as EnhancedArticleWithVersions;

    it('should return false', () => {
      expect(isVor(notVor)).toBe(false);
    });
  });
  describe('Given a version that is a Version of Record', () => {
    it.todo('should return true');
  });
});
