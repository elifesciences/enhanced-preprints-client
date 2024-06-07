import { render, screen, fireEvent } from '@testing-library/react';
import { Figure } from './figure';
import { contentToJsx } from '../../../utils/content';

const content = {
  caption: 'this is a figure',
  content: 'some content',
  id: 'id',
  label: 'I am a label',
};

describe('Figure', () => {
  it('renders correctly', () => {
    const { container } = render(<Figure id={content.id} caption={contentToJsx(content.caption)} label={content.label} content={contentToJsx(content.content)} />);

    expect(screen.getByText('some content')).toBeInTheDocument();
    expect(container.querySelector('#id')).toBeInTheDocument();
  });

  it('renders the label', () => {
    render(<Figure content={contentToJsx(content.content)} label={content.label}/>);

    expect(screen.getByText('I am a label')).toBeInTheDocument();
  });

  it('renders the caption', () => {
    render(<Figure content={contentToJsx(content.content)} caption={content.caption}/>);

    expect(screen.getByText('this is a figure')).toBeInTheDocument();
  });

  it('should not render caption, label, or ID if not defined', () => {
    const { container } = render(<Figure content={<p>hello world!</p>}/>);

    expect(container.querySelector('figcaption')).not.toBeInTheDocument();
    expect(container.querySelector('label')).not.toBeInTheDocument();
    expect(container.querySelector('#id')).not.toBeInTheDocument();
  });

  describe('caption with long text', () => {
    const longCaption = 'This is a long caption that would overflow the container.';

    beforeEach(() => {
      Object.defineProperty(HTMLElement.prototype, 'scrollHeight', { configurable: true, value: 300 });
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 200 });

      render(<Figure content={contentToJsx(content.content)} caption={longCaption} />);
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
      Object.defineProperty(HTMLElement.prototype, 'scrollHeight', { configurable: true, value: 200 });
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 300 });

      render(<Figure content={contentToJsx(content.content)} caption={shortCaption} />);

      expect(screen.queryByText('Show more')).toBeNull();
      expect(screen.queryByText('Show less')).toBeNull();
    });
  });
});
