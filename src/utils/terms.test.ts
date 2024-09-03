import { findTerms, getTermDescription, highlightTerms } from './terms';

describe('terms', () => {
  describe('find-terms', () => {
    it('finds both terms in a string', () => {
      const terms = findTerms('landmark compelling');
      expect(terms).toStrictEqual(expect.objectContaining({
        strength: ['compelling'],
        significance: ['landmark'],
      }));
    });

    it('finds one term in a string', () => {
      const terms = findTerms('this test is very useful');
      expect(terms).toStrictEqual(expect.objectContaining({
        significance: ['useful'],
      }));
    });

    it('finds both terms in a long paragraph', () => {
      // eslint-disable-next-line max-len
      const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, fundamental, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit solid, anim id est laborum.'
      const terms = findTerms(text);
      expect(terms).toStrictEqual(expect.objectContaining({
        significance: ['fundamental'],
        strength: ['solid'],
      }));
    })
  });

  describe('highlight-terms', () => {
    it('highlights a single term', () => {
      const highlighted = highlightTerms('foo useful foo');

      expect(highlighted).toStrictEqual('foo <strong class="highlighted-term">useful</strong> foo');
    });

    it('highlights multiple terms', () => {
      const highlighted = highlightTerms('foo useful compelling foo');

      expect(highlighted).toStrictEqual('foo <strong class="highlighted-term">useful</strong> <strong class="highlighted-term">compelling</strong> foo');
    });

    it('highlights extra strength terms if they exist', () => {
      const highlighted = highlightTerms('foo incomplete incompletely foo');

      expect(highlighted).toStrictEqual('foo <strong class="highlighted-term">incomplete</strong> <strong class="highlighted-term">incompletely</strong> foo');
    });
  });

  describe('get-term-description', () => {
    it('returns the description of a term', () => {
      const description = getTermDescription('compelling');

      expect(description).toStrictEqual('evidence that features methods, data and analyses more rigorous than the current state-of-the-art');
    });

    it('returns undefined if the term is not in the list', () => {
      const description = getTermDescription('foo');

      expect(description).toBeUndefined();
    });
  });
});
