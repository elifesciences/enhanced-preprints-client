import { render, screen, fireEvent } from '@testing-library/react';
import { Authors } from './authors';

const authorList = [
  { givenNames: ['Steve'], familyNames: ['Rogers'] },
  { givenNames: ['Antony'], familyNames: ['Stark'] },
  { givenNames: ['Natasha'], familyNames: ['Romanov'] },
  { givenNames: ['Bruce'], familyNames: ['Banner'] },
  { givenNames: ['Wanda'], familyNames: ['Maximof'] },
  { givenNames: ['Bucky'], familyNames: ['Barnes'] },
  { givenNames: ['Barry'], familyNames: ['Allen'] },
  { givenNames: ['Jesse'], familyNames: ['Quick'] },
  { givenNames: ['Kara'], familyNames: ['Zor-el'] },
  { givenNames: ['Arthur'], familyNames: ['Curry'] },
  { givenNames: ['Kal'], familyNames: ['El'] },
  { givenNames: ['Oliver'], familyNames: ['Queen'] },
];

describe('authors', () => {
  it('should render correctly a list of authors', () => {
    render(<Authors authors={[authorList[0]]}/>);
    const captainAmerica = screen.getByText('Steve Rogers');

    expect(captainAmerica).toBeInTheDocument();
  });

  it('should hide authors after the author limit', () => {
    const { container } = render(<Authors authors={authorList}/>);

    expect(container.getElementsByClassName('authors--collapsible')).toHaveLength(1);
    expect(container.getElementsByClassName('authors-list--expanded')).toHaveLength(0);
  });

  it('shows a clickable expansion element when over the author limit', () => {
    render(<Authors authors={authorList}/>);
    const expansionElement = screen.getByText('show', { exact: false });

    expect(expansionElement).toBeInTheDocument();
  });

  it('does not show a clickable expansion element when under the author limit', () => {
    render(<Authors authors={[authorList[0]]}/>);
    const expansionElement = screen.queryByText('show', { exact: false });

    expect(expansionElement).not.toBeInTheDocument();
  });

  describe('expansion behaviour', () => {
    it('shows on click', () => {
      const { container } = render(<Authors authors={authorList}/>);

      expect(container.getElementsByClassName('authors--collapsible')).toHaveLength(1);
      expect(container.getElementsByClassName('authors-list--expanded')).toHaveLength(0);

      const expansionElement = screen.getByText('show', { exact: false });
      fireEvent.click(expansionElement);

      expect(container.getElementsByClassName('authors-list--expanded')).toHaveLength(1);
    });

    it('hides on click', () => {
      const { container } = render(<Authors authors={authorList}/>);

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
});
