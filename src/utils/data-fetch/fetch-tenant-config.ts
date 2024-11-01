import { GetServerSidePropsContext, NextApiRequest } from 'next';
import { fetchTenant } from './fetch-data';
import { TenantData } from '../../tenant';

export const fetchTenantUsingContext = async (context: GetServerSidePropsContext): Promise<TenantData> => {
  const tenantId = (context.query['x-epp-tenant-id'] || context.req.headers['x-epp-tenant-id']) as string | undefined;
  if (!tenantId) {
    throw new Error('no tenant id set');
  }
  const tenant = await fetchTenant(tenantId);
  if (!tenant) {
    throw new Error('no tenant config found'); // eslint-disable-line no-console
  }

  return tenant;
};

export const fetchTenantUsingRequest = async (req: NextApiRequest): Promise<TenantData> => {
  const tenantId = (req.query['x-epp-tenant-id'] || req.headers['x-epp-tenant-id']) as string | undefined;
  if (!tenantId) {
    throw new Error('no tenant id set'); // eslint-disable-line no-console
  }
  const tenant = await fetchTenant(tenantId);
  if (!tenant) {
    throw new Error('no tenant config found'); // eslint-disable-line no-console
  }

  return tenant;
};
