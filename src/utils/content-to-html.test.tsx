import { expect, test, describe } from 'bun:test';
import { contentToHtml } from './content-to-html';
import { Content } from '../types';

describe('Content to HTML', () => {
  test('returns the string unchanged if passed a simple string', () => {
    const result = contentToHtml('foo');

    expect(result).toStrictEqual('foo');
    expect(typeof result).toBe('string');
  });

  test('returns a concatenated string if passed an array', () => {
    const result = contentToHtml(['one', 'two', { type: 'Strong', content: 'three' }]);
    expect(result).toStrictEqual('onetwo<strong>three</strong>');
  });

  test.each([
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
