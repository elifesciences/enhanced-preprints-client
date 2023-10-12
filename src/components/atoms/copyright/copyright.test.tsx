import { render, screen } from '@testing-library/react';
import { Copyright } from './copyright';
import { authors } from '../../../utils/mocks';

describe('Copyright Component', () => {
  it('renders correct text for Creative Commons License', () => {
    const license = 'https://creativecommons.org/licenses/by/4.0/';
    const publishedYear = 2023;

    render(<Copyright license={license} publishedYear={publishedYear} authors={authors} />);

    const licenseText = screen.getByText(/This article is distributed under the terms of the/);
    expect(licenseText).toBeInTheDocument();

    const yearText = screen.getByText(/© 2023/);
    expect(yearText).toBeInTheDocument();

    const authorName = `${authors[0]?.familyNames?.join(' ')} et al.`;
    const authorText = screen.getByText(new RegExp(authorName));
    expect(authorText).toBeInTheDocument();
  });

  it('renders correct text for Creative Commons CC0 public domain dedication', () => {
    const license = 'https://creativecommons.org/publicdomain/zero/1.0/';

    render(<Copyright license={license} />);

    const yearText = screen.queryByText(/© 2023/);
    expect(yearText).not.toBeInTheDocument();

    const cc0Text = screen.getByText(/This is an open-access article, free of all copyright/);
    expect(cc0Text).toBeInTheDocument();
  });

  it('renders no copyright notice', () => {
    const license = 'license';

    render(<Copyright license={license} />);

    const licenseText = screen.queryByText(/This article is distributed under the terms of the/);
    expect(licenseText).not.toBeInTheDocument();

    const yearText = screen.queryByText(/© 2023/);
    expect(yearText).not.toBeInTheDocument();

    const cc0Text = screen.queryByText(/This is an open-access article, free of all copyright/);
    expect(cc0Text).not.toBeInTheDocument();
  });
});
