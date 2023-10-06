/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach, beforeEach } from 'bun:test';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
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
  afterEach(cleanup);
  test('renders correctly', () => {
    const { container } = render(<Figure content={content}/>);

    expect(screen.getByText('some content')).toBeTruthy();
    expect(container.querySelector('#id')).toBeTruthy();
  });

  test('renders the content', () => {
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

  test('renders the label', () => {
    render(<Figure content={content}/>);

    expect(screen.getByText('I am a label')).toBeTruthy();
  });

  test('renders the caption', () => {
    render(<Figure content={content}/>);

    expect(screen.getByText('this is a figure')).toBeTruthy();
  });

  test('renders a complex caption', () => {
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

  test('should not render caption if not defined', () => {
    const noCaption: FigureContent = {
      ...content,
      caption: undefined,
    };

    const { container } = render(<Figure content={noCaption}/>);

    expect(container.querySelector('figcaption')).toBeNull();
  });

  test('should not render label if not defined', () => {
    const noLabel: FigureContent = {
      ...content,
      label: undefined,
    };

    const { container } = render(<Figure content={noLabel}/>);

    expect(container.querySelector('label')).toBeNull();
  });

  test('should not set id if not defined', () => {
    const noId: FigureContent = {
      ...content,
      id: undefined,
    };

    const { container } = render(<Figure content={noId}/>);

    expect(container.querySelector('#id')).toBeNull();
  });

  describe('caption with long text', () => {
    const longCaption = 'This is a long caption that would overflow the container.';

    beforeEach(() => {
      const testContentWithLongCaption = {
        ...content,
        caption: longCaption,
      };

      // Object.defineProperty(HTMLElement.prototype, 'scrollHeight', { configurable: true, value: 300 });
      // Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 200 });

      render(<Figure content={testContentWithLongCaption} />);
    });

    test('should not have the figure__caption--expanded class on the first render', () => {
      expect(Array.from(screen.getByText(longCaption, { exact: false }).classList)).not.toContain('figure__caption--expanded');
    });

    test('should not have the expanded class on the first render', () => {
      expect(Array.from(screen.getByText('Show more').classList)).not.toContain('expanded');
    });

    test('should have the figure__caption--expanded class on Show more button click', () => {
      fireEvent.click(screen.getByText('Show more'));

      expect(Array.from(screen.getByText(longCaption, { exact: false }).classList)).toContain('figure__caption--expanded');
    });

    test('should have the expanded class on Show more button click', () => {
      fireEvent.click(screen.getByText('Show more'));

      expect(Array.from(screen.getByText('Show less').classList)).toContain('expanded');
    });

    test('should not have the figure__caption--expanded class on Show less button click', () => {
      fireEvent.click(screen.getByText('Show more'));
      fireEvent.click(screen.getByText('Show less'));

      expect(Array.from(screen.getByText(longCaption, { exact: false }).classList)).not.toContain('figure__caption--expanded');
    });

    test('should not have the expanded class on Show less button click', () => {
      fireEvent.click(screen.getByText('Show more'));
      fireEvent.click(screen.getByText('Show less'));

      expect(Array.from(screen.getByText('Show more').classList)).not.toContain('expanded');
    });

    test('has a Show more button for long captions', () => {
      expect(screen.queryByText('Show more')).not.toBeNull();
    });

    test('has a Show less button for expanded long captions', () => {
      fireEvent.click(screen.getByText('Show more'));

      expect(screen.queryByText('Show more')).toBeNull();
      expect(screen.queryByText('Show less')).not.toBeNull();
    });

    test('expands the caption when show more button clicked', () => {
      expect(screen.queryByText(longCaption, { exact: false })).not.toBeNull();
    });

    test('collapses the caption when Show less button clicked', () => {
      fireEvent.click(screen.getByText('Show more'));
      fireEvent.click(screen.getByText('Show less'));

      expect(screen.queryByText('Show more')).not.toBeNull();
      expect(screen.queryByText('Show less')).toBeNull();
    });
  });

  describe('caption with short text', () => {
    test('does not display the show more button for short captions', () => {
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
