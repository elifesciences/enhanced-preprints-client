import { contentToHtml } from './content-to-html';
import { Content } from '../types';

describe('Content to HTML', () => {
  it('returns the string unchanged if passed a simple string', () => {
    const result = contentToHtml('foo');

    expect(result).toStrictEqual('foo');
    expect(typeof result).toBe('string');
  });

  it('returns a concatenated string if passed an array', () => {
    const result = contentToHtml(['one', 'two', { type: 'Strong', content: 'three' }]);
    expect(result).toStrictEqual('onetwo<strong>three</strong>');
  });

  it.each([
    [
      ['one', 'two', { type: 'Strong', content: { type: 'NontextualAnnotation', content: 'three' } }],
      'onetwo<strong><u>three</u></strong>',
    ],
    [
      ['one', 'two', { type: 'Paragraph', content: ['three', { type: 'Subscript', content: 'four' }, 'five'] }],
      'onetwo<p>three<sub>four</sub>five</p>',
    ],
  ])('returns HTML when given content (%#)', (content, expected: string) => {
    const result = contentToHtml(content as Content);
    expect(result).toStrictEqual(expected);
  });
});
