import { contentToHtml } from './content-to-html';
import { Content } from '../types';

describe('Content to String', () => {
  it('returns the string unchanged if passed a simple string', () => {
    const result = contentToHtml('foo');

    expect(result).toStrictEqual('foo');
    expect(typeof result).toBe('string');
  });

  it('returns an concatenated string if passed an array', () => {
    const result = contentToHtml(['one', 'two', { type: 'Strong', content: 'three' }]);
    expect(result).toStrictEqual('onetwo<strong>three</strong>');
  });

  it('returns HTML when given content', () => {
    [
      {
        content: ['one', 'two', { type: 'Strong', content: 'three' }],
        expected: 'onetwo<strong>three</strong>',
      },
      {
        content: ['one', 'two', { type: 'Paragraph', content: ['three', { type: 'Subscript', content: 'four' }, 'five'] }],
        expected: 'onetwo<p>three<sub>four</sub>five</p>',
      },
    ].forEach((c) => {
      const result = contentToHtml(c.content as Content);
      expect(result).toStrictEqual(c.expected);
    });
  });
});
