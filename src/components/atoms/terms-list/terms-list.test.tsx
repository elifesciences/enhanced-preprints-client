import { render, screen } from '@testing-library/react';
import { TermsList } from './terms-list';

describe('TermsList', () => {
  it('renders the selected term and its description', () => {
    render(<TermsList title="test-list" terms={['solid', 'two', 'three']} selectedTerm={['solid']} />);

    expect(screen.getByText('test-list')).toBeInTheDocument();
    expect(document.querySelector('.term-description b')).toHaveTextContent('solid');
    expect(document.querySelector('.term-description')).toHaveTextContent('solid: Methods, data and analyses broadly support the claims with only minor weaknesses');
  });

  it('renders a list of terms passed in', () => {
    render(<TermsList title="test-list" terms={['one', 'two', 'three']} selectedTerm={['one']} />);

    expect(document.querySelector('.term:first-child')).toHaveTextContent('one');
    expect(document.querySelector('.term:nth-child(2)')).toHaveTextContent('two');
    expect(document.querySelector('.term:nth-child(3)')).toHaveTextContent('three');
  });

  it('highlights the terms that are passed in', () => {
    render(<TermsList title="test-list" terms={['one', 'two', 'three']} selectedTerm={['one', 'two']} />);

    expect(document.querySelector('.term__highlighted:first-child')).toHaveTextContent('one');
    expect(document.querySelector('.term__highlighted:nth-child(2)')).toHaveTextContent('two');
  });

  it('should have the highlighted aria label only on the selected terms', () => {
    render(<TermsList title="test-list" terms={['one', 'two', 'three']} selectedTerm={['one', 'two']} />);

    expect(document.querySelector('.term__highlighted:first-child')).toHaveAttribute('aria-label', 'This term is reflected in the article');
    expect(document.querySelector('.term__highlighted:nth-child(2)')).toHaveAttribute('aria-label', 'This term is reflected in the article');
    expect(document.querySelector('.term:nth-child(3)')).not.toHaveAttribute('aria-label');
  });
});
