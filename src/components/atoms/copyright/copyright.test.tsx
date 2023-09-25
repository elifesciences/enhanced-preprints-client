import { render } from '@testing-library/react';
import { Copyright } from './copyright';
import { authors } from '../../../utils/mocks';

describe('Copyright Component', () => {
  it('renders correct text for Creative Commons Attribution License', () => {
    const license = 'https://creativecommons.org/licenses/by/4.0/';
    const publishedYear = 2023;

    const { getByText } = render(<Copyright license={license} publishedYear={publishedYear} author={authors[0]} />);

    const attributionText = getByText(/This article is distributed under the terms of the/);
    expect(attributionText).toBeInTheDocument();

    const yearText = getByText(/© 2023/);
    expect(yearText).toBeInTheDocument();

    const authorName = `${authors[0]?.givenNames?.join(' ')} ${authors[0]?.familyNames?.join(' ')}`;
    const authorText = getByText(new RegExp(authorName));
    expect(authorText).toBeInTheDocument();

    const authorEtAlText = getByText(/et al./);
    expect(authorEtAlText).toBeInTheDocument();
  });

  it('renders correct text for Creative Commons CC0 public domain dedication', () => {
    const license = 'https://creativecommons.org/publicdomain/zero/1.0/';

    const { getByText } = render(<Copyright license={license} />);

    const cc0Text = getByText(/This is an open-access article, free of all copyright/);
    expect(cc0Text).toBeInTheDocument();
  });
});
