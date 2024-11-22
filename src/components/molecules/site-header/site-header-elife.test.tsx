import { render, screen } from '@testing-library/react';
import { SiteHeaderELife } from './site-header-elife';

describe('SiteHeader', () => {
  it('renders the logo image with alt text', () => {
    render(<SiteHeaderELife />);

    expect(screen.getByAltText('eLife logo', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Enhanced Preprints')).toBeInTheDocument();
  });
});
