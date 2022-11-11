import { render, screen, fireEvent } from '@testing-library/react';
import { Institutions } from './institutions';

const institutionList = [
  { name: 'Charles Xavier\'s School for Gifted Youngsters', address: { addressCountry: 'West Chester' } },
  { name: 'Star Labs', address: { addressCountry: 'Star City' } },
  { name: 'Avengers Tower', address: { addressCountry: 'New York' } },
  { name: 'Bat Cave', address: { addressCountry: 'Gotham' } },
  { name: 'Arrow Cave', address: { addressCountry: 'Central City' } },
];

describe('Institutions', () => {
  it('should render correctly a list of institutions', () => {
    render(<Institutions institutions={[institutionList[0]]}/>);
    const xMansion = screen.getByText('Charles Xavier\'s School for Gifted Youngsters');

    expect(xMansion).toBeInTheDocument();
  });

  it('should hide institutions after the institution limit', () => {
    render(<Institutions institutions={institutionList}/>);
    const starLabs = screen.getByText('Star Labs');

    expect(starLabs).toBeInTheDocument();
    expect(screen.queryByText('Bat Cave')).not.toBeInTheDocument();
  });

  it('shows a clickable expansion element when over the institution limit', () => {
    render(<Institutions institutions={institutionList}/>);
    const expansionElement = screen.getByText('show', { exact: false });

    expect(expansionElement).toBeInTheDocument();
  });

  it('does not show a clickable expansion element when under the institution limit', () => {
    render(<Institutions institutions={[institutionList[0]]}/>);
    const expansionElement = screen.queryByText('show', { exact: false });

    expect(expansionElement).not.toBeInTheDocument();
  });

  describe('expansion behaviour', () => {
    it('shows on click', () => {
      render(<Institutions institutions={institutionList}/>);
      expect(screen.queryByText('Bat Cave')).not.toBeInTheDocument();

      const expansionElement = screen.getByText('show', { exact: false });

      fireEvent.click(expansionElement);

      expect(screen.queryByText('Bat Cave')).toBeInTheDocument();
    });

    it('hides on click', () => {
      render(<Institutions institutions={institutionList}/>);
      expect(screen.queryByText('Bat Cave')).not.toBeInTheDocument();

      const expansionElement = screen.getByText('show', { exact: false });
      fireEvent.click(expansionElement);

      expect(screen.queryByText('Bat Cave')).toBeInTheDocument();

      const contractionElement = screen.getByText('show less');
      fireEvent.click(contractionElement);

      expect(screen.queryByText('Bat Cave')).not.toBeInTheDocument();
    });
  });
});
