import { StaticImageData } from 'next/image';

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
