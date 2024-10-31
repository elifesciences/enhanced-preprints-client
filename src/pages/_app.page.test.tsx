import { render, screen } from '@testing-library/react';
import MyApp from './_app.page';

describe('MyApp', () => {
  it('renders default layout (layoutName is undefined)', () => {
    render(<MyApp Component={() => <div>Test</div>} pageProps={{}} />);
    expect(screen.getByAltText('eLife logo')).toBeInTheDocument();
  });

  it('renders default layout (layoutName is unknown)', () => {
    render(<MyApp Component={() => <div>Test</div>} pageProps={{ tenantConfig: { layoutName: 'unknown' } }} />);
    expect(screen.getByAltText('eLife logo')).toBeInTheDocument();
  });

  it('renders alternative layout when layoutName property is recognised', () => {
    render(<MyApp Component={() => <div>Test</div>} pageProps={{ tenantConfig: { layoutName: 'biophysics-colab' } }} />);
    expect(screen.getByAltText('Biophysics Colab logo')).toBeInTheDocument();
  });
});
