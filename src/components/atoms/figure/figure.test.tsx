import { render, screen } from '@testing-library/react';
import { Figure } from './figure';
import { FigureContent } from '../../../types';

const content: FigureContent = {
  caption: 'this is a figure',
  content: 'some content',
  id: 'id',
  label: 'I am a label',
  type: 'Figure',
};

describe('Figure', () => {
  it('renders correctly', () => {
    render(<Figure content={content}/>);

    expect(screen.getByText('some content')).toBeInTheDocument();
  });

  it('renders the content', () => {
    const complexContent: FigureContent = {
      ...content,
      content: {
        type: 'Strong',
        content: 'Bold Text',
      },
    };

    render(<Figure content={complexContent}/>);

    expect(screen.getByText('Bold Text').tagName).toBe('STRONG');
  });

  it('renders the label', () => {
    render(<Figure content={content}/>);

    expect(screen.getByText('I am a label')).toBeInTheDocument();
  });

  it('renders the caption', () => {
    render(<Figure content={content}/>);

    expect(screen.getByText('this is a figure')).toBeInTheDocument();
  });

  it('renders a complex caption', () => {
    const complexContent: FigureContent = {
      ...content,
      caption: [
        {
          type: 'Heading',
          content: 'Heading 1',
          depth: 1,
          id: 'h1',
        },
        {
          type: 'Emphasis',
          content: 'Italic Text',
        },
        {
          type: 'Heading',
          content: 'Heading 4',
          depth: 4,
          id: 'h4',
        },
      ],
    };

    render(<Figure content={complexContent}/>);

    expect(screen.getByText('Heading 1').tagName).toBe('H3');
    expect(screen.getByText('Italic Text').tagName).toBe('EM');
    expect(screen.getByText('Heading 4').tagName).toBe('H4');
  });

  it('should not render caption if not defined', () => {
    const noCaption: FigureContent = {
      ...content,
      caption: undefined,
    };

    const { container } = render(<Figure content={noCaption}/>);

    expect(container.querySelector('figcaption')).not.toBeInTheDocument();
  });

  it('should not render label if not defined', () => {
    const noLabel: FigureContent = {
      ...content,
      label: undefined,
    };

    const { container } = render(<Figure content={noLabel}/>);

    expect(container.querySelector('label')).not.toBeInTheDocument();
  });
});
