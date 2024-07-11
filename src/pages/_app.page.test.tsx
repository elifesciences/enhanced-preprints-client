import { render, screen } from '@testing-library/react';
import MyApp from './_app.page';

describe('MyApp', () => {
  it('renders default layout (siteName is undefined)', () => {
    render(<MyApp Component={() => <div>Test</div>} pageProps={{}} />);
    expect(screen.getByAltText('eLife logo')).toBeInTheDocument();
  });

  it('renders default layout (siteName is unknown)', () => {
    render(<MyApp Component={() => <div>Test</div>} pageProps={{ siteName: 'unknown' }} />);
    expect(screen.getByAltText('eLife logo')).toBeInTheDocument();
  });

  it('renders alternative layout when siteName property is recognised', () => {
    render(<MyApp Component={() => <div>Test</div>} pageProps={{ siteName: 'biophysics-colab' }} />);
    expect(screen.getByAltText('Biophysics Colab logo')).toBeInTheDocument();
  });
});
