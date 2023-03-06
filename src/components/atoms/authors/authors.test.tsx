import { render, screen, fireEvent } from '@testing-library/react';
import { authors } from '../../../utils/mocks';
import { Authors } from './authors';

describe('authors', () => {
  it('should render correctly a list of authors', () => {
    render(<Authors authors={[authors[0]]}/>);
    const captainAmerica = screen.getByText('Steve Rogers');

    expect(captainAmerica).toBeInTheDocument();
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

      expect(screen.getByText('Kara Zor-el')).toHaveClass('authors-email');
      expect(screen.getByText('Kal El')).toHaveClass('authors-email');
    });

    it('does not show email icon for non corresponding authors', () => {
      render(<Authors authors={authors}/>);

      expect(screen.getByText('Steve Rogers')).not.toHaveClass('authors-email');
      expect(screen.getByText('Antony Stark')).not.toHaveClass('authors-email');
    });

    it('shows accessibility span', () => {
      render(<Authors authors={authors}/>);

      const karaAccessibilityElement = screen.getByText('Kara Zor-el').firstElementChild;
      const kalAccessibilityElement = screen.getByText('Kal El').firstElementChild;
      expect(karaAccessibilityElement).toHaveClass('visuallyhidden');
      expect(karaAccessibilityElement).toHaveTextContent('authors email address');
      expect(kalAccessibilityElement).toHaveClass('visuallyhidden');
      expect(kalAccessibilityElement).toHaveTextContent('authors email address');
    });
  });
});
