import { render, screen } from '@testing-library/react';
import MyApp from './_app.page';
import EPPLogo from '../images/epp-logo.png';
import { TenantData } from '../tenant';

const tenant: Omit<TenantData, 'layout'> = {
  id: 'default',
  logo: EPPLogo,
  i18nNamespace: 'default',
  colors: {
    primary: '#087acc',
    primaryDark: '#0769b0',
  },
};
describe('MyApp', () => {
  it('renders default layout (tenant is undefined)', () => {
    render(<MyApp Component={() => <div>Test</div>} pageProps={{ tenant: { ...tenant, layout: undefined as unknown as string } }} />);
    expect(screen.getByAltText('eLife logo')).toBeInTheDocument();
  });

  it('renders default layout (tenant.layout is unknown)', () => {
    render(<MyApp Component={() => <div>Test</div>} pageProps={{ tenant: { ...tenant, layout: 'unknown' } }} />);
    expect(screen.getByAltText('eLife logo')).toBeInTheDocument();
  });

  it('renders alternative layout when layoutName property is recognised', () => {
    render(<MyApp Component={() => <div>Test</div>} pageProps={{ tenant: { ...tenant, layout: 'biophysics-colab' } }} />);
    expect(screen.getByAltText('Biophysics Colab logo')).toBeInTheDocument();
  });
});
