import { contentToText } from './content-to-text';

describe('Content to Text', () => {
  it('returns the string unchanged if passed a simple string', () => {
    const result = contentToText('foo');

    expect(result).toStrictEqual('foo');
    expect(typeof result).toBe('string');
  });

  it('returns an concatenated string if passed an array', () => {
    const result = contentToText(['one', 'two', { type: 'Strong', content: { type: 'NontextualAnnotation', content: 'three' } }]);
    expect(result).toStrictEqual('onetwothree');
  });

  it('can support empty strings', () => {
    const result = contentToText(['', 'one', 'two', '', { type: 'Strong', content: 'three' }, '']);
    expect(result).toStrictEqual('onetwothree');
  });

  it('generates nothing when unsupported content types are passed', () => {
    const result = contentToText([
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
    const result = contentToText({
      type: 'Paragraph',
      content: 'I am a paragraph',
    });

    expect(result).toStrictEqual('I am a paragraph');
  });

  it('generates the expected text when passed a Emphasis', () => {
    const result = contentToText({
      type: 'Emphasis',
      content: 'I am emphasised',
    });

    expect(result).toStrictEqual('I am emphasised');
  });

  it('generates the expected text when passed a Strong', () => {
    const result = contentToText({
      type: 'Strong',
      content: 'I am strong',
    });

    expect(result).toStrictEqual('I am strong');
  });

  it('generates the expected text when passed a Superscript', () => {
    const result = contentToText({
      type: 'Superscript',
      content: 'I am super',
    });

    expect(result).toStrictEqual('I am super');
  });

  it('generates the expected text when passed a Subscript', () => {
    const result = contentToText({
      type: 'Subscript',
      content: 'I am a subscript',
    });

    expect(result).toStrictEqual('I am a subscript');
  });

  it('generates the expected text when passed a Heading', () => {
    const result = contentToText({
      type: 'Heading',
      depth: 1,
      content: 'heading',
      id: 'h1',
    });

    expect(result).toStrictEqual('heading');
  });

  it('allows an array of arrays to be generated', () => {
    const result = contentToText([
      [{
        type: 'Figure',
        content: 'I am a figure',
        caption: 'I am a caption',
        label: 'I am a label',
        id: 'id',
      }],
    ]);

    // eslint-disable-next-line react/jsx-key
    expect(result).toStrictEqual('');
  });
});
