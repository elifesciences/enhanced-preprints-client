import { GetServerSidePropsContext, NextApiRequest } from 'next';
import { fetchTenantConfig } from './fetch-data';
import { TenantConfig } from '../../config';

export const fetchTenantConfigFromContext = async (context: GetServerSidePropsContext): Promise<TenantConfig | false> => {
  const tenantId = (context.query['x-epp-tenant-id'] || context.req.headers['x-epp-tenant-id']) as string | undefined;
  if (!tenantId) {
    console.log('no tenant id set'); // eslint-disable-line no-console
    return false;
  }
  const tenantConfig = await fetchTenantConfig(tenantId);
  if (!tenantConfig) {
    console.log('no tenant config found'); // eslint-disable-line no-console
    return false;
  }

  return tenantConfig;
};

export const fetchTenantConfigFromRequest = async (req: NextApiRequest): Promise<TenantConfig | false> => {
  const tenantId = (req.query['x-epp-tenant-id'] || req.headers['x-epp-tenant-id']) as string | undefined;
  if (!tenantId) {
    console.log('no tenant id set'); // eslint-disable-line no-console
    return false;
  }
  const tenantConfig = await fetchTenantConfig(tenantId);
  if (!tenantConfig) {
    console.log('no tenant config found'); // eslint-disable-line no-console
    return false;
  }

  return tenantConfig;
};
