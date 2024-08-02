import { render, screen } from '@testing-library/react';
import { SiteHeaderBiophysicsColab } from './site-header-biophysics-colab';

describe('SiteHeader', () => {
  it('renders the logo image with alt text', () => {
    render(<SiteHeaderBiophysicsColab />);

    expect(screen.getByAltText('Biophysics Colab logo', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Enhanced Preprints')).toBeInTheDocument();
  });
});
