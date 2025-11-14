import { isVor } from './is-vor';
import { mock85111 as articleVersionNotVor, vorArticleVersion } from './mocks/enhanced-article-with-versions';

describe('isVor', () => {
  describe('Given a version that is not a Version of Record', () => {
    it('should return false', () => {
      expect(isVor(articleVersionNotVor)).toBe(false);
    });
  });
  describe('Given a version that is a Version of Record', () => {
    it('should return true', () => {
      expect(isVor(vorArticleVersion)).toBe(true);
    });
  });
});
