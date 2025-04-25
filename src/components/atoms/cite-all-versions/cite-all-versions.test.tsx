import { render, screen } from '@testing-library/react';
import { CiteAllVersions } from './cite-all-versions';

describe('Cite all versions', () => {
  it('should render the cite all versions part', () => {
    render(<CiteAllVersions doi="some.doi.12345"/>);

    expect(screen.getByText('Cite all versions')).toBeInTheDocument();
  });
});
