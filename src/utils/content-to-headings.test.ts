import { expect, test, describe } from 'bun:test';
import { contentToHeadings } from './content-to-headings';
import { content as mockContent } from './mocks';

describe('Content to Headings', () => {
  test('handles content without headings', () => {
    const result = contentToHeadings('foo');

    expect(result).toStrictEqual([]);
  });

  test('converts content to headings', () => {
    const result = contentToHeadings([
      {
        type: 'Heading',
        depth: 1,
        content: 'heading 1',
        id: 'h1',
      },
      {
        type: 'Cite',
        content: 'I am a citation',
        target: 'target',
      },
      {
        type: 'Heading',
        depth: 1,
        content: 'heading 2',
        id: 'h2',
      },
      {
        type: 'Figure',
        content: 'I am a figure',
        caption: 'I am a caption',
        label: 'I am a label',
        id: 'id',
      },
      {
        type: 'Heading',
        depth: 1,
        content: 'heading 3',
        id: 'h3',
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

    expect(result).toStrictEqual([
      {
        id: 'h1',
        text: 'heading 1',
      },
      {
        id: 'h2',
        text: 'heading 2',
      },
      {
        id: 'h3',
        text: 'heading 3',
      },
    ]);
  });

  test('should convert complex example', () => {
    const result = contentToHeadings(mockContent);

    expect(result).toStrictEqual([
      {
        id: 's1',
        text: [
          'Introduction',
        ],
      },
      {
        id: 's2',
        text: [
          'Results',
        ],
      },
      {
        id: 's3',
        text: [
          'Discussion',
        ],
      },
      {
        id: 's4',
        text: [
          'Materials and methods',
        ],
      },
      {
        id: 's5',
        text: [
          'Data and material availability',
        ],
      },
    ]);
  });
});
