import { render, screen, fireEvent } from '@testing-library/react';
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
    const { container } = render(<Figure content={content}/>);

    expect(screen.getByText('some content')).toBeInTheDocument();
    expect(container.querySelector('#id')).toBeInTheDocument();
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
          depth: 4,
          id: 'h4',
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

    expect(screen.getByText('Heading 1').tagName).toBe('H4');
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

  it('should not set id if not defined', () => {
    const noId: FigureContent = {
      ...content,
      id: undefined,
    };

    const { container } = render(<Figure content={noId}/>);

    expect(container.querySelector('#id')).not.toBeInTheDocument();
  });

  describe('caption with long text', () => {
    const longCaption = 'This is a long caption that would overflow the container.';

    beforeEach(() => {
      const testContentWithLongCaption = {
        ...content,
        caption: longCaption,
      };

      Object.defineProperty(HTMLElement.prototype, 'scrollHeight', { configurable: true, value: 300 });
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 200 });

      render(<Figure content={testContentWithLongCaption} />);
    });

    it('should not have the figure__caption--expanded class on the first render', () => {
      expect(screen.getByText(longCaption, { exact: false })).not.toHaveClass('figure__caption--expanded');
    });

    it('should not have the expanded class on the first render', () => {
      expect(screen.getByText('Show more')).not.toHaveClass('expanded');
    });

    it('should have the figure__caption--expanded class on Show more button click', () => {
      fireEvent.click(screen.getByText('Show more'));

      expect(screen.getByText(longCaption, { exact: false })).toHaveClass('figure__caption--expanded');
    });

    it('should have the expanded class on Show more button click', () => {
      fireEvent.click(screen.getByText('Show more'));

      expect(screen.getByText('Show less')).toHaveClass('expanded');
    });

    it('should not have the figure__caption--expanded class on Show less button click', () => {
      fireEvent.click(screen.getByText('Show more'));
      fireEvent.click(screen.getByText('Show less'));

      expect(screen.getByText(longCaption, { exact: false })).not.toHaveClass('figure__caption--expanded');
    });

    it('should not have the expanded class on Show less button click', () => {
      fireEvent.click(screen.getByText('Show more'));
      fireEvent.click(screen.getByText('Show less'));

      expect(screen.getByText('Show more')).not.toHaveClass('expanded');
    });

    it('has a Show more button for long captions', () => {
      expect(screen.queryByText('Show more')).not.toBeNull();
    });

    it('has a Show less button for expanded long captions', () => {
      fireEvent.click(screen.getByText('Show more'));

      expect(screen.queryByText('Show more')).toBeNull();
      expect(screen.queryByText('Show less')).not.toBeNull();
    });

    it('expands the caption when show more button clicked', () => {
      expect(screen.queryByText(longCaption, { exact: false })).not.toBeNull();
    });

    it('collapses the caption when Show less button clicked', () => {
      fireEvent.click(screen.getByText('Show more'));
      fireEvent.click(screen.getByText('Show less'));

      expect(screen.queryByText('Show more')).not.toBeNull();
      expect(screen.queryByText('Show less')).toBeNull();
    });
  });

  describe('caption with short text', () => {
    it('does not display the show more button for short captions', () => {
      const shortCaption = 'Short Caption';
      const testContentWithShortCaption = {
        ...content,
        caption: shortCaption,
      };

      Object.defineProperty(HTMLElement.prototype, 'scrollHeight', { configurable: true, value: 200 });
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 300 });

      render(<Figure content={testContentWithShortCaption} />);

      expect(screen.queryByText('Show more')).toBeNull();
      expect(screen.queryByText('Show less')).toBeNull();
    });
  });
});
