import { render, screen, fireEvent } from '@testing-library/react';
import { authors } from '../../../utils/mocks';
import { Authors } from './authors';
import { generateAuthorId } from '../../../utils/generators';

describe('authors', () => {
  it('should render correctly a list of authors', () => {
    const { container } = render(<Authors authors={[authors[0]]}/>);

    expect(screen.getByText('Steve Rogers')).toBeInTheDocument();
    expect(container.querySelector('.authors-link')!.textContent).toStrictEqual('Steve Rogers');
  });

  it('should hide authors after the author limit', () => {
    const { container } = render(<Authors authors={authors}/>);

    expect(container.getElementsByClassName('authors--collapsible')).toHaveLength(1);
    expect(container.getElementsByClassName('authors-list--expanded')).toHaveLength(0);
  });

  it('shows a clickable expansion element when over the author limit', () => {
    render(<Authors authors={authors}/>);
    const expansionElement = screen.getByText('show', { exact: false });

    expect(expansionElement).toBeInTheDocument();
  });

  it('does not show a clickable expansion element when under the author limit', () => {
    render(<Authors authors={[authors[0]]}/>);
    const expansionElement = screen.queryByText('show', { exact: false });

    expect(expansionElement).not.toBeInTheDocument();
  });

  it('renders the name for an organization', () => {
    render(<Authors authors={authors}/>);

    expect(screen.getByText('the Brain Interfacing Laboratory')).toBeInTheDocument();
  });

  it.each(authors.map(generateAuthorId))('should contain a link with the author id', (id) => {
    const { container } = render(<Authors authors={authors}/>);

    expect(container.querySelector(`[href="#${id}"]`)).toBeInTheDocument();
  });

  describe('expansion behaviour', () => {
    it('shows on click', () => {
      const { container } = render(<Authors authors={authors}/>);

      expect(container.getElementsByClassName('authors--collapsible')).toHaveLength(1);
      expect(container.getElementsByClassName('authors-list--expanded')).toHaveLength(0);

      const expansionElement = screen.getByText('show', { exact: false });
      fireEvent.click(expansionElement);

      expect(container.getElementsByClassName('authors-list--expanded')).toHaveLength(1);
    });

    it('hides on click', () => {
      const { container } = render(<Authors authors={authors}/>);

      expect(container.getElementsByClassName('authors--collapsible')).toHaveLength(1);
      expect(container.getElementsByClassName('authors-list--expanded')).toHaveLength(0);

      const expansionElement = screen.getByText('show', { exact: false });
      fireEvent.click(expansionElement);

      expect(container.getElementsByClassName('authors-list--expanded')).toHaveLength(1);

      const contractionElement = screen.getByText('show less');
      fireEvent.click(contractionElement);

      expect(container.getElementsByClassName('authors-list--expanded')).toHaveLength(0);
    });
  });

  describe('corresponding author', () => {
    it('show email icon for corresponding authors', () => {
      render(<Authors authors={authors}/>);

      expect(screen.getByText('Kara Zor-el')).toHaveClass('authors-email__link');
      expect(screen.getByText('Kal El')).toHaveClass('authors-email__link');
    });

    it('does not show email icon for non corresponding authors', () => {
      render(<Authors authors={authors}/>);

      expect(screen.getByText('Steve Rogers')).not.toHaveClass('authors-email__link');
      expect(screen.getByText('Antony Stark')).not.toHaveClass('authors-email__link');
    });

    it('shows accessibility span', () => {
      render(<Authors authors={authors}/>);

      const karaAccessibilityElement = screen.getByText('Kara Zor-el').firstElementChild;
      const kalAccessibilityElement = screen.getByText('Kal El').firstElementChild;
      expect(karaAccessibilityElement).toHaveClass('visuallyhidden');
      expect(karaAccessibilityElement).toHaveTextContent('author has email address');
      expect(kalAccessibilityElement).toHaveClass('visuallyhidden');
      expect(kalAccessibilityElement).toHaveTextContent('author has email address');
    });
  });
});
