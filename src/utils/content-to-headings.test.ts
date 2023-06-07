import { contentToHeadings } from './content-to-headings';
import { content as mockContent } from './mocks';

describe('Content to Headings', () => {
  it('handles content without headings', () => {
    const result = contentToHeadings('foo');

    expect(result).toStrictEqual([]);
  });

  it('converts content to headings', () => {
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

  it('should convert complex example', () => {
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
        id: 's2a',
        text: [
          'A HaloTag-LC3B processing assay to quantify autophagic flux in mammalian cells\n' +
          '                ',
        ],
      },
      {
        id: 's2b',
        text: [
          'HaloTag-based reporters to monitor autophagic flux by fluorescence microscopy\n' +
          '                ',
        ],
      },
      {
        id: 's2c',
        text: [
          'The HaloTag-based processing assay can be adapted to monitor selective autophagy\n' +
          '                    pathways\n' +
          '                ',
        ],
      },
      {
        id: 's2d',
        text: [
          'Bulk nonselective autophagic flux can be detected with the HaloTag-based\n' +
          '                    processing assay\n' +
          '                ',
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
        id: 's4a',
        text: [
          'Cell lines and culture conditions',
        ],
      },
      {
        id: 's4b',
        text: [
          'Plasmids',
        ],
      },
      {
        id: 's4c',
        text: [
          'Stable expression in HeLa cells and MEFs by retrovirus infection',
        ],
      },
      {
        id: 's4d',
        text: [
          'Antibodies and reagents',
        ],
      },
      {
        id: 's4e',
        text: [
          'Protein extraction',
        ],
      },
      {
        id: 's4f',
        text: [
          'In-gel fluorescence imaging and immunoblotting',
        ],
      },
      {
        id: 's4g',
        text: [
          'Fluorescence imaging (live-cell)',
        ],
      },
      {
        id: 's4h',
        text: [
          'Flow cytometry',
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
