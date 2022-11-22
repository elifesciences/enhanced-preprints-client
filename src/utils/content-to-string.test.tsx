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

  it('optionally wraps content in tags', () => {
    [
      {
        content: ['one', 'two', { type: 'Strong', content: 'three' }],
        contentTypeTags: [ { id: ContentType.strong, tag: 'b' } ],
        expected: 'onetwo<b>three</b>',
      },
      {
        content: ['one', 'two', { type: 'Strong', content: 'three' }],
        contentTypeTags: [ { id: ContentType.strong, tag: 'strong' } ],
        expected: 'onetwo<strong>three</strong>',
      },
      {
        content: ['one', 'two', { type: 'Paragraph', content: ['three', { type: 'Subscript', content: 'four' }, 'five'] }],
        contentTypeTags: [ { id: ContentType.strong, tag: 'b' }, { id: ContentType.subscript, tag: 'sub' } ],
        expected: 'onetwothree<sub>four</sub>five',
      },
      {
        content: ['one', 'two', { type: 'Paragraph', content: ['three', { type: 'Subscript', content: 'four' }, 'five'] }],
        contentTypeTags: [ { id: ContentType.paragraph, tag: 'p' }, { id: ContentType.subscript, tag: 'sub' } ],
        expected: 'onetwo<p>three<sub>four</sub>five</p>',
      },
    ].forEach((c) => {
      const result = contentToString(c.content as Content, c.contentTypeTags);
      expect(result).toStrictEqual(c.expected);
    });
  });
});
