import { render } from '@testing-library/react';
import { TermsList } from './terms-list';

describe('TermsList', () => {
  it('renders the selected term and its description', () => {
    render(<TermsList terms={['solid', 'two', 'three']} selectedTerm={['solid']} />);

    expect(document.querySelector('.term-description b')).toHaveTextContent('solid');
    expect(document.querySelector('.term-description')).toHaveTextContent('solid: Methods, data and analyses broadly support the claims with only minor weaknesses');
  });

  it('renders a list of terms passed in', () => {
    render(<TermsList terms={['one', 'two', 'three']} selectedTerm={['one']} />);

    expect(document.querySelector('.term:first-child')).toHaveTextContent('one');
    expect(document.querySelector('.term:nth-child(2)')).toHaveTextContent('two');
    expect(document.querySelector('.term:nth-child(3)')).toHaveTextContent('three');
  });

  it('highlights the terms that are passed in', () => {
    render(<TermsList terms={['one', 'two', 'three']} selectedTerm={['one', 'two']} />);

    expect(document.querySelector('.term__highlighted:first-child')).toHaveTextContent('one');
    expect(document.querySelector('.term__highlighted:nth-child(2)')).toHaveTextContent('two');
  });
});
