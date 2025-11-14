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
    it('should return true', () => {
      const articleVersionVor = {
        article: mock85111.article,
        versions: {
          '85111v1': {
            doi: '10.7554/eLife.85111.1',
            id: '85111v1',
            msid: '85111',
            preprintDoi: '10.1101/2022.11.08.515698',
            preprintUrl: 'https://www.biorxiv.org/content/10.1101/2022.11.08.515698v2',
            published: new Date('2023-01-25T14:00:00.000Z'),
            sentForReview: new Date('2022-11-29T14:20:30.000Z'),
            versionDoi: '10.7554/eLife.85111.1',
            umbrellaDoi: '10.7554/eLife.85111',
            versionIdentifier: '1',
          },
        },
      };
      expect(isVor(articleVersionVor)).toBe(true);
    });
  });
});
