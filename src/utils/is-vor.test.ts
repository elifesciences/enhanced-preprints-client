import { isVor } from './is-vor';
import { mock85111 } from './mocks/enhanced-article-with-versions';

describe('isVor', () => {
  describe('Given a version that is not a Version of Record', () => {
    it('should return false', () => {
      expect(isVor(mock85111)).toBe(false);
    });
  });
  describe('Given a version that is a Version of Record', () => {
    it.todo('should return true');
  });
});
