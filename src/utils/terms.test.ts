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

    it('finds one term in a string (case insensitive)', () => {
      const terms = findTerms('this test is very Useful');
      expect(terms).toStrictEqual(expect.objectContaining({
        significance: ['useful'],
      }));
    });

    it('finds one tern in a string and does not preserve duplicates', () => {
      const terms = findTerms('this test is very useful useful');
      expect(terms).toStrictEqual(expect.objectContaining({
        significance: ['useful'],
      }));
    });

    it('finds multiple term in a string and preserves the order from content', () => {
      const terms = findTerms('this test is very useful useful and important');
      expect(terms).toStrictEqual(expect.objectContaining({
        significance: ['useful', 'important'],
      }));
    });

    it('finds both terms in a long paragraph', () => {
      // eslint-disable-next-line max-len
      const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, fundamental, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit solid, anim id est laborum.';
      const terms = findTerms(text);
      expect(terms).toStrictEqual(expect.objectContaining({
        significance: ['fundamental'],
        strength: ['solid'],
      }));
    });

    it('should handle no matches', () => {
      const terms = findTerms('no terms here');
      expect(terms).toStrictEqual({
        significance: undefined,
        strength: undefined,
      });
    });

    it('should only find a match on a complete word', () => {
      const terms = findTerms('this test is very usefully');
      expect(terms).toStrictEqual({
        significance: undefined,
        strength: undefined,
      });
    });
  });

  describe('highlight-terms', () => {
    it('highlights a single term', () => {
      const highlighted = highlightTerms('foo useful foo');

      expect(highlighted).toStrictEqual('foo <strong class="highlighted-term" aria-label="Highlighted">useful</strong> foo');
    });

    it('highlights multiple terms', () => {
      const highlighted = highlightTerms('foo useful compelling foo');

      expect(highlighted).toStrictEqual('foo <strong class="highlighted-term" aria-label="Highlighted">useful</strong> <strong class="highlighted-term" aria-label="Highlighted">compelling</strong> foo');
    });

    it('highlights extra strength terms if they exist', () => {
      const highlighted = highlightTerms('foo incomplete incompletely foo');

      expect(highlighted).toStrictEqual('foo <strong class="highlighted-term" aria-label="Highlighted">incomplete</strong> <strong class="highlighted-term" aria-label="Highlighted">incompletely</strong> foo');
    });
  });

  describe('get-term-description', () => {
    it('returns the description of a term', () => {
      const description = getTermDescription('compelling');

      expect(description).toStrictEqual('Evidence that features methods, data and analyses more rigorous than the current state-of-the-art');
    });

    it('returns undefined if the term is not in the list', () => {
      const description = getTermDescription('foo');

      expect(description).toBeUndefined();
    });
  });
});
