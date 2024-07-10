import { render, screen } from '@testing-library/react';
import MyApp from './_app.page';

describe('MyApp', () => {
  it.each([
    {
      name: 'siteName is null',
      siteName: null,
    },
    {
      name: 'siteName is unknown',
      siteName: 'unknown',
    },
  ])('renders default layout ($name)', ({ siteName }) => {
    render(<MyApp Component={() => <div>Test</div>} pageProps={{ siteName }} />);
    expect(screen.getByAltText('eLife logo')).toBeInTheDocument();
  });

  it('renders alternative layout when siteName property is set', () => {
    render(<MyApp Component={() => <div>Test</div>} pageProps={{ siteName: 'biophysics-colab' }} />);
    expect(screen.getByAltText('Biophysics Colab logo')).toBeInTheDocument();
  });
});
