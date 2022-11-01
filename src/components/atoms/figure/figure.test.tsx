import { render, screen } from '@testing-library/react';
import { Figure } from './figure';
import { FigureContent } from '../../../types/content';

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
      caption: {
        type: 'Emphasis',
        content: 'Italic Text',
      },
    };

    render(<Figure content={complexContent}/>);

    expect(screen.getByText('Italic Text').tagName).toBe('EM');
  });
});
