import { render, screen } from '@testing-library/react';
import { SiteHeader } from './site-header';

describe('SiteHeader', () => {
  it('renders the logo image with alt text', () => {
    render(<SiteHeader />);

    expect(screen.getByAltText('eLife logo', { exact: false })).toBeInTheDocument();
  });
});
