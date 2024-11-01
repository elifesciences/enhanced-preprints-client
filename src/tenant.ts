import { createContext } from 'react';
import { StaticImageData } from 'next/image';
import EPPLogo from '../images/epp-logo.png';

export type TenantData = {
  id: string,
  layout: string,
  i18nNamespace: string,
  logo: string | StaticImageData,
  colors: {
    primary: string,
    primaryDark: string,
  }
};

export type HasTenant = {
  tenant: TenantData
};

export const TenantContext = createContext<TenantData>({
  id: 'default',
  layout: 'default',
  logo: EPPLogo,
  colors: { primary: '#087acc', primaryDark: '#0769b0' },
  i18nNamespace: 'default',
});
