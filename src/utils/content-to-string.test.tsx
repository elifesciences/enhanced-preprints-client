import { contentToString, ContentType } from './content-to-string';
import { Content } from '../types';

describe('Content to String', () => {
  it('returns the string unchanged if passed a simple string', () => {
    const result = contentToString('foo');

    expect(result).toStrictEqual('foo');
    expect(typeof result).toBe('string');
  });

  it('returns an concatenated string if passed an array', () => {
    const result = contentToString(['one', 'two', { type: 'Strong', content: 'three' }]);
    expect(result).toStrictEqual('onetwothree');
  });

  it('generates nothing when unsupported content types are passed', () => {
    const result = contentToString([
      {
        type: 'Heading',
        depth: 1,
        content: 'heading',
        id: 'h1',
      },
      {
        type: 'Cite',
        content: 'I am a citation',
        target: 'target',
      },
      {
        type: 'Figure',
        content: 'I am a figure',
        caption: 'I am a caption',
        label: 'I am a label',
        id: 'id',
      },
      {
        type: 'ImageObject',
        contentUrl: 'https://placekitten.com/500/300',
        content: [],
        meta: {
          inline: false,
        },
      },
      {
        type: 'Date',
        content: '13/01/2001',
      },
    ]);
    expect(result).toStrictEqual('');
  });

  it('generates the text when passed a Paragraph', () => {
    const result = contentToString({
      type: 'Paragraph',
      content: 'I am a paragraph',
    });

    expect(result).toStrictEqual('I am a paragraph');
  });

  it('generates the expected html when passed a Emphasis', () => {
    const result = contentToString({
      type: 'Emphasis',
      content: 'I am emphasised',
    });

    expect(result).toStrictEqual('I am emphasised');
  });

  it('generates the expected html when passed a Strong', () => {
    const result = contentToString({
      type: 'Strong',
      content: 'I am strong',
    });

    expect(result).toStrictEqual('I am strong');
  });

  it('generates the expected html when passed a Superscript', () => {
    const result = contentToString({
      type: 'Superscript',
      content: 'I am super',
    });

    expect(result).toStrictEqual('I am super');
  });

  it('generates the expected html when passed a Subscript', () => {
    const result = contentToString({
      type: 'Subscript',
      content: 'I am a subscript',
    });

    expect(result).toStrictEqual('I am a subscript');
  });

  it('allows an array of arrays to be generated', () => {
    const result = contentToString([
      [{
        type: 'Heading', depth: 1, content: 'heading', id: 'h1',
      }],
    ]);

    // eslint-disable-next-line react/jsx-key
    expect(result).toStrictEqual('');
  });

  it.each([
    [
      ['one', 'two', { type: 'Strong', content: 'three' }],
      [{ id: ContentType.strong, tag: 'b' }],
      'onetwo<b>three</b>',
    ],
    [
      ['one', 'two', { type: 'Strong', content: 'three' }],
      [{ id: ContentType.strong, tag: 'strong' }],
      'onetwo<strong>three</strong>',
    ],
    [
      ['one', 'two', { type: 'Paragraph', content: ['three', { type: 'Subscript', content: 'four' }, 'five'] }],
      [{ id: ContentType.strong, tag: 'b' }, { id: ContentType.subscript, tag: 'sub' }],
      'onetwothree<sub>four</sub>five',
    ],
    [
      ['one', 'two', { type: 'Paragraph', content: ['three', { type: 'Subscript', content: 'four' }, 'five'] }],
      [{ id: ContentType.paragraph, tag: 'p' }, { id: ContentType.subscript, tag: 'sub' }],
      'onetwo<p>three<sub>four</sub>five</p>',
    ],
  ])('optionally wraps content in tags (%#)', (content, tags, expected: string) => {
    const result = contentToString(content as Content, tags);
    expect(result).toStrictEqual(expected);
  });
});
