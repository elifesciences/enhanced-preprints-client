/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
import { expect, test, describe, afterEach } from 'bun:test';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { authors } from '../../../utils/mocks';
import { Authors } from './authors';
import { createAuthorId } from '../../../utils/create-author-id';

describe('authors', () => {
  afterEach(cleanup);
  test('should render correctly a list of authors', () => {
    const { container } = render(<Authors authors={[authors[0]]}/>);

    expect(screen.getByText('Steve Rogers')).toBeTruthy();
    expect(container.querySelector('.authors-link')!.textContent).toStrictEqual('Steve Rogers');
  });

  test('should hide authors after the author limit', () => {
    const { container } = render(<Authors authors={authors}/>);

    expect(container.getElementsByClassName('authors--collapsible')).toHaveLength(1);
    expect(container.getElementsByClassName('authors-list--expanded')).toHaveLength(0);
  });

  test('shows a clickable expansion element when over the author limit', () => {
    render(<Authors authors={authors}/>);

    expect(screen.getByText('show', { exact: false })).toBeTruthy();
  });

  test('does not show a clickable expansion element when under the author limit', () => {
    render(<Authors authors={[authors[0]]}/>);
    const expansionElement = screen.queryByText('show', { exact: false });

    expect(expansionElement).toBeNull();
  });

  test('renders the name for an organization', () => {
    render(<Authors authors={authors}/>);

    expect(screen.getByText('the Brain Interfacing Laboratory')).toBeTruthy();
  });

  test.each(authors.map(createAuthorId))('should contain a link with the author id', (id) => {
    const { container } = render(<Authors authors={authors}/>);

    expect(container.querySelector(`[href="#${id}"]`)).toBeTruthy();
  });

  describe('expansion behaviour', () => {
    test('shows on click', () => {
      const { container } = render(<Authors authors={authors}/>);

      expect(container.getElementsByClassName('authors--collapsible')).toHaveLength(1);
      expect(container.getElementsByClassName('authors-list--expanded')).toHaveLength(0);

      const expansionElement = screen.getByText('show', { exact: false });
      fireEvent.click(expansionElement);

      expect(container.getElementsByClassName('authors-list--expanded')).toHaveLength(1);
    });

    test('hides on click', () => {
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
    test('show email icon for corresponding authors', () => {
      render(<Authors authors={authors}/>);

      expect(Array.from(screen.getByText('Kara Zor-el').classList)).toContain('authors-email__link');
      expect(Array.from(screen.getByText('Kal El').classList)).toContain('authors-email__link');
    });

    test('does not show email icon for non corresponding authors', () => {
      render(<Authors authors={authors}/>);

      expect(Array.from(screen.getByText('Steve Rogers').classList)).not.toContain('authors-email__link');
      expect(Array.from(screen.getByText('Antony Stark').classList)).not.toContain('authors-email__link');
    });

    test('shows accessibility span', () => {
      render(<Authors authors={authors}/>);

      const karaAccessibilityElement = screen.getByText('Kara Zor-el').firstElementChild;
      const kalAccessibilityElement = screen.getByText('Kal El').firstElementChild;
      expect(Array.from(karaAccessibilityElement?.classList || [])).toContain('visuallyhidden');
      expect(karaAccessibilityElement?.textContent).toContain('author has email address');
      expect(Array.from(kalAccessibilityElement?.classList || [])).toContain('visuallyhidden');
      expect(kalAccessibilityElement?.textContent).toContain('author has email address');
    });
  });
});
