import { render, screen } from '@testing-library/react';
import { SiteHeader } from './site-header';
import { BrandContext, defaultBrand } from '../../../brand';

describe('SiteHeader', () => {
  it('renders the logo image with alt text', () => {
    render(<SiteHeader />);

    expect(screen.getByAltText('Enhanced Preprints Platform logo', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Enhanced Preprints')).toBeInTheDocument();
  });

  it('renders the logo image with alt text from Branding', () => {
    render(<BrandContext.Provider value={{ ...defaultBrand, publisher: 'Test Publisher' }}><SiteHeader /></BrandContext.Provider>);

    expect(screen.getByAltText('Test Publisher logo', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Enhanced Preprints')).toBeInTheDocument();
  });
});
