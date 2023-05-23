import { contentToJsx } from './content-to-jsx';
import { Heading } from '../components/atoms/heading/heading';
import { Figure } from '../components/atoms/figure/figure';

describe('Content to JSX', () => {
  it('returns the string unchanged if passed a simple string', () => {
    const result = contentToJsx('foo');

    expect(result).toStrictEqual('foo');
    expect(typeof result).toBe('string');
  });

  it('returns an array of jsx components and strings if passed an array', () => {
    const result = contentToJsx(['one', 'two', { type: 'Strong', content: 'three' }]);

    // eslint-disable-next-line react/jsx-key
    expect(result).toStrictEqual(expect.arrayContaining(['one', 'two', <strong key={2}>three</strong>]));
  });

  it('generates the expected html when passed a Heading', () => {
    const result = contentToJsx({
      type: 'Heading', depth: 1, content: 'heading', id: 'h1',
    });

    expect(result).toStrictEqual(<Heading id={'h1'} content={'heading'} headingLevel={1}/>);
  });

  it('generates the expected html when passed a Cite (including using page fragment target)', () => {
    const result = contentToJsx({
      type: 'Cite',
      content: 'I am a citation',
      target: 'target',
    });

    expect(result).toStrictEqual(<>(<a href={'#target'}>I am a citation</a>)</>);
  });

  it('generates the expected html when passed a Link', () => {
    const result = contentToJsx({
      type: 'Link',
      content: 'I am a link',
      target: 'target',
    });

    expect(result).toStrictEqual(<a href={'target'}>I am a link</a>);
  });

  it('generates the expected html when passed a Paragraph', () => {
    const result = contentToJsx({
      type: 'Paragraph',
      content: 'I am a paragraph',
    });

    expect(result).toStrictEqual(<p>I am a paragraph</p>);
  });

  it('generates the expected html when passed a Emphasis', () => {
    const result = contentToJsx({
      type: 'Emphasis',
      content: 'I am emphasised',
    });

    expect(result).toStrictEqual(<em>I am emphasised</em>);
  });

  it('generates the expected html when passed a Strong', () => {
    const result = contentToJsx({
      type: 'Strong',
      content: 'I am strong',
    });

    expect(result).toStrictEqual(<strong>I am strong</strong>);
  });

  it('generates the expected html when passed a Superscript', () => {
    const result = contentToJsx({
      type: 'Superscript',
      content: 'I am super',
    });

    expect(result).toStrictEqual(<sup>I am super</sup>);
  });

  it('generates the expected html when passed a Subscript', () => {
    const result = contentToJsx({
      type: 'Subscript',
      content: 'I am a subscript',
    });

    expect(result).toStrictEqual(<sub>I am a subscript</sub>);
  });

  it('generates the expected html when passed a Date', () => {
    const result = contentToJsx({
      type: 'Date',
      content: '13/01/2001',
    });

    expect(result).toStrictEqual(<time>13/01/2001</time>);
  });

  it('generates the expected html when passed a Figure', () => {
    const result = contentToJsx({
      type: 'Figure',
      content: 'I am a figure',
      caption: 'I am a caption',
      label: 'I am a label',
      id: 'id',
    });

    expect(result).toStrictEqual(
      <Figure content={{
        type: 'Figure',
        content: 'I am a figure',
        caption: 'I am a caption',
        label: 'I am a label',
        id: 'id',
      }} />,
    );
  });

  it('generates the expected html when passed a ImageObject', () => {
    const result = contentToJsx({
      type: 'ImageObject',
      contentUrl: 'https://placekitten.com/500/300',
      content: [],
      meta: {
        inline: false,
      },
    });

    expect(result).toStrictEqual(<img loading="lazy" src="https://placekitten.com/500/300"></img>);
  });

  it('generates the expected html when passed a ImageObject with a class', () => {
    const result = contentToJsx({
      type: 'ImageObject',
      contentUrl: 'https://placekitten.com/500/300',
      content: [],
      meta: {
        inline: true,
      },
    });

    expect(result).toStrictEqual(<img loading="lazy" className="inline-image" src="https://placekitten.com/500/300"></img>);
  });

  it('allows an array of arrays to be generated', () => {
    const result = contentToJsx([
      [{
        type: 'Heading', depth: 1, content: 'heading', id: 'h1',
      }],
    ]);

    // eslint-disable-next-line react/jsx-key
    expect(result).toStrictEqual([[<Heading key={0} headingLevel={1} id="h1" content="heading" />]]);
  });

  it('generates the expected html when passed a ListItem', () => {
    const result = contentToJsx({
      type: 'ListItem',
      content: 'foo',
    });

    expect(result).toStrictEqual(<li>foo</li>);
  });

  it('generates the expected html when passed am unordered List', () => {
    const result = contentToJsx({
      type: 'List',
      order: 'Unordered',
      items: [
        {
          type: 'ListItem',
          content: 'foo',
        },
        {
          type: 'ListItem',
          content: 'bar',
        },
      ],
    });

    expect(result).toStrictEqual(<ul><li key={0}>foo</li><li key={1}>bar</li></ul>);
  });

  it('generates the expected html when passed am ordered List', () => {
    const result = contentToJsx({
      type: 'List',
      order: 'Ascending',
      items: [
        {
          type: 'ListItem',
          content: 'foo',
        },
        {
          type: 'ListItem',
          content: 'bar',
        },
      ],
    });

    expect(result).toStrictEqual(<ol><li key={0}>foo</li><li key={1}>bar</li></ol>);
  });
});
