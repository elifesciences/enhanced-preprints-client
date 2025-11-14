import { isVor } from './is-vor';
import { mock85111 } from './mocks/enhanced-article-with-versions';

describe('isVor', () => {
  describe('Given a version that is not a Version of Record', () => {
    it('should return false', () => {
      const articleVersionNotVor = mock85111;
      expect(isVor(articleVersionNotVor)).toBe(false);
    });
  });
  describe('Given a version that is a Version of Record', () => {
    it.todo('should return true');
  });
});
