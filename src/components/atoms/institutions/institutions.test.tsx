/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Institutions } from './institutions';

const institutionList = [
  { name: 'Charles Xavier\'s School for Gifted Youngsters', address: { addressCountry: 'West Chester' } },
  { name: 'Star Labs', address: { addressCountry: 'Star City' } },
  { name: 'Avengers Tower', address: { addressCountry: 'New York' } },
  { name: 'Bat Cave', address: { addressCountry: 'Gotham' } },
  { name: 'Arrow Cave', address: { addressCountry: 'Central City' } },
];

describe('Institutions', () => {
  afterEach(cleanup);
  test('should render correctly a list of institutions', () => {
    render(<Institutions institutions={[institutionList[0]]}/>);
    const xMansion = screen.getByText('Charles Xavier\'s School for Gifted Youngsters');

    expect(xMansion).toBeTruthy();
  });

  test('should hide institutions after the institution limit', () => {
    render(<Institutions institutions={institutionList}/>);
    const starLabs = screen.getByText('Star Labs');

    expect(starLabs).toBeTruthy();
    expect(screen.queryByText('Bat Cave')).toBeNull();
  });

  test('shows a clickable expansion element when over the institution limit', () => {
    render(<Institutions institutions={institutionList}/>);
    const expansionElement = screen.getByText('show', { exact: false });

    expect(expansionElement).toBeTruthy();
  });

  test('does not show a clickable expansion element when under the institution limit', () => {
    render(<Institutions institutions={[institutionList[0]]}/>);
    const expansionElement = screen.queryByText('show', { exact: false });

    expect(expansionElement).toBeNull();
  });

  describe('expansion behaviour', () => {
    test('shows on click', () => {
      render(<Institutions institutions={institutionList}/>);
      expect(screen.queryByText('Bat Cave')).toBeNull();

      const expansionElement = screen.getByText('show', { exact: false });

      fireEvent.click(expansionElement);

      expect(screen.queryByText('Bat Cave')).toBeTruthy();
    });

    test('hides on click', () => {
      render(<Institutions institutions={institutionList}/>);
      expect(screen.queryByText('Bat Cave')).toBeNull();

      const expansionElement = screen.getByText('show', { exact: false });
      fireEvent.click(expansionElement);

      expect(screen.queryByText('Bat Cave')).toBeTruthy();

      const contractionElement = screen.getByText('show less');
      fireEvent.click(contractionElement);

      expect(screen.queryByText('Bat Cave')).toBeNull();
    });
  });
});
