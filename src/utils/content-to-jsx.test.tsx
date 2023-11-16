import { render } from '@testing-library/react';
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

    expect(result).toStrictEqual(<Heading id={'h1'} content={'heading'} headingLevel={1} maxLevel={undefined}/>);
  });

  it('generates the expected html when passed a Cite (including using page fragment target)', () => {
    const result = contentToJsx({
      type: 'Cite',
      content: 'I am a citation',
      target: 'target',
    });

    expect(result).toStrictEqual(<><a href={'#target'}>I am a citation</a></>);
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

  it('generates the expected html when passed a NontextualAnnotation', () => {
    const result = contentToJsx({
      type: 'NontextualAnnotation',
      content: 'I am underlined',
    });

    expect(result).toStrictEqual(<u>I am underlined</u>);
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

    // eslint-disable-next-line @next/next/no-img-element
    expect(result).toStrictEqual(
      <picture>
        <source srcSet="https://placekitten.com/500/300" />
        <img loading="lazy" src="https://placekitten.com/500/300" alt="" />
      </picture>,
    );
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

    // eslint-disable-next-line @next/next/no-img-element
    expect(result).toStrictEqual(
      <picture>
        <source srcSet="https://placekitten.com/500/300" />
        <img className="inline-image" loading="lazy" src="https://placekitten.com/500/300" alt="" />
      </picture>,
    );
  });

  it('allows an array of arrays to be generated', () => {
    const result = contentToJsx([
      [{
        type: 'Heading', depth: 1, content: 'heading', id: 'h1',
      }],
    ]);

    // eslint-disable-next-line react/jsx-key
    expect(result).toStrictEqual([[<Heading key={0} headingLevel={1} maxLevel={undefined} id="h1" content="heading" />]]);
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

  it('generates sections from thematic breaks', () => {
    render((<>{contentToJsx([
      {
        type: 'Heading', id: 'heading1', depth: 1, content: 'Heading 1',
      },
      { type: 'Paragraph', content: 'paragraph content under heading 1' },
      { type: 'ThematicBreak' },
      {
        type: 'Heading', id: 'heading2', depth: 1, content: 'Heading 2',
      },
      { type: 'Paragraph', content: 'paragraph content under heading 2' },
    ])}</>));

    const firstSectionElement = document.querySelector('section:nth-child(1)');
    const secondSectionElement = document.querySelector('section:nth-child(2)');

    expect(firstSectionElement).toBeInTheDocument();
    expect(firstSectionElement?.querySelector('h1')?.textContent).toEqual('Heading 1');
    expect(firstSectionElement?.querySelector('p')?.textContent).toEqual('paragraph content under heading 1');
    expect(secondSectionElement).toBeInTheDocument();
    expect(secondSectionElement?.querySelector('h1')?.textContent).toEqual('Heading 2');
    expect(secondSectionElement?.querySelector('p')?.textContent).toEqual('paragraph content under heading 2');
  });

  it('generates sections from two thematic breaks', () => {
    render((<>{contentToJsx([
      {
        type: 'Heading', id: 'heading1', depth: 1, content: 'Heading 1',
      },
      { type: 'Paragraph', content: 'paragraph content under heading 1' },
      { type: 'ThematicBreak' },
      {
        type: 'Heading', id: 'heading2', depth: 1, content: 'Heading 2',
      },
      { type: 'Paragraph', content: 'paragraph content under heading 2' },
      { type: 'ThematicBreak' },
      {
        type: 'Heading', id: 'heading3', depth: 1, content: 'Heading 3',
      },
      { type: 'Paragraph', content: 'paragraph content under heading 3' },
    ])}</>));

    const firstSectionElement = document.querySelector('section:nth-child(1)');
    const secondSectionElement = document.querySelector('section:nth-child(2)');
    const thirdSectionElement = document.querySelector('section:nth-child(3)');

    expect(firstSectionElement).toBeInTheDocument();
    expect(firstSectionElement?.querySelector('h1')?.textContent).toEqual('Heading 1');
    expect(firstSectionElement?.querySelector('p')?.textContent).toEqual('paragraph content under heading 1');
    expect(secondSectionElement).toBeInTheDocument();
    expect(secondSectionElement?.querySelector('h1')?.textContent).toEqual('Heading 2');
    expect(secondSectionElement?.querySelector('p')?.textContent).toEqual('paragraph content under heading 2');
    expect(thirdSectionElement).toBeInTheDocument();
    expect(thirdSectionElement?.querySelector('h1')?.textContent).toEqual('Heading 3');
    expect(thirdSectionElement?.querySelector('p')?.textContent).toEqual('paragraph content under heading 3');
  })
  it.only('generates sections with thematic break as 1st element, last element and 2 thematic breaks in a row', () => {
    render((<>{contentToJsx([
      { type: 'ThematicBreak' },
      {
        type: 'Heading', id: 'heading1', depth: 1, content: 'Heading 1',
      },
      { type: 'Paragraph', content: 'paragraph content under heading 1' },
      { type: 'ThematicBreak' },
      {
        type: 'Heading', id: 'heading2', depth: 1, content: 'Heading 2',
      },
      { type: 'Paragraph', content: 'paragraph content under heading 2' },
      { type: 'ThematicBreak' },
      {
        type: 'Heading', id: 'heading3', depth: 1, content: 'Heading 3',
      },
      { type: 'Paragraph', content: 'paragraph content under heading 3' },
      { type: 'Paragraph', content: 'paragraph content under heading 3' },
      { type: 'Paragraph', content: 'paragraph content under heading 3' },
      { type: 'ThematicBreak' },
      {
        type: 'Heading', id: 'heading2', depth: 1, content: 'Heading 2',
      },
      { type: 'Paragraph', content: 'paragraph content under heading 2' },
      { type: 'ThematicBreak' },
      { type: 'ThematicBreak' },
    ])}</>));
    
    const firstSectionElement = document.querySelector('section:nth-child(1)');
    const secondSectionElement = document.querySelector('section:nth-child(2)');
    const thirdSectionElement = document.querySelector('section:nth-child(3)');

    expect(firstSectionElement).toBeInTheDocument();
    expect(firstSectionElement?.querySelector('h1')?.textContent).toEqual('Heading 1');
    expect(firstSectionElement?.querySelector('p')?.textContent).toEqual('paragraph content under heading 1');
    expect(secondSectionElement).toBeInTheDocument();
    expect(secondSectionElement?.querySelector('h1')?.textContent).toEqual('Heading 2');
    expect(secondSectionElement?.querySelector('p')?.textContent).toEqual('paragraph content under heading 2');
    expect(thirdSectionElement).toBeInTheDocument();
    expect(thirdSectionElement?.querySelector('h1')?.textContent).toEqual('Heading 3');
    expect(thirdSectionElement?.querySelector('p')?.textContent).toEqual('paragraph content under heading 3');
  })
});
