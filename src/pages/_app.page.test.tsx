import { render, screen } from '@testing-library/react';
import MyApp from './_app.page';
import { TenantConfig } from '../config';
import EPPLogo from '../images/epp-logo.png';

const tenantConfig: Omit<TenantConfig, 'layout'> = {
  id: 'default',
  logo: EPPLogo,
  i18nNamespace: 'default',
  colors: {
    primary: '#087acc',
    primaryDark: '#0769b0',
  },
};
describe('MyApp', () => {
  it('renders default layout (tenantConfig is undefined)', () => {
    render(<MyApp Component={() => <div>Test</div>} pageProps={{ tenantConfig: { ...tenantConfig, layout: 'unknown' } }} />);
    expect(screen.getByAltText('eLife logo')).toBeInTheDocument();
  });

  it('renders default layout (tenantConfig.layout is unknown)', () => {
    render(<MyApp Component={() => <div>Test</div>} pageProps={{}} />);
    expect(screen.getByAltText('eLife logo')).toBeInTheDocument();
  });

  it('renders alternative layout when layoutName property is recognised', () => {
    render(<MyApp Component={() => <div>Test</div>} pageProps={{ tenantConfig: { ...tenantConfig, layout: 'biophysics-colab' } }} />);
    expect(screen.getByAltText('Biophysics Colab logo')).toBeInTheDocument();
  });
});
