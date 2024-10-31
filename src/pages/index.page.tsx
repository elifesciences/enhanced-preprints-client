import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { fetchVersions } from '../utils/data-fetch';
import { ArticleSummary } from '../types';
import { Heading } from '../components/atoms/heading/heading';
import { TenantConfiguredPageProps } from '../config';
import { fetchTenantConfig } from '../utils/data-fetch/fetch-data';

type PageProps = TenantConfiguredPageProps & {
  ids?: string[],
  articles?: ArticleSummary[]
  previews?: ArticleSummary[]
};
export const App = ({ ids, articles, previews }: PageProps) => (
  <main className="primary-section">
    <div className="article-body-container">
      <Heading id="articles" headingLevel={2} content="Articles:" />
      <ul>
        {ids && ids
          .map((id, index) => <li key={index}><a href={`/reviewed-preprints/${id}`}>{id}</a></li>)
        }
        {articles && articles
          .map(({ id }, index) => <li key={index}><a href={`/reviewed-preprints/${id}`}>{id}</a></li>)
        }
      </ul>

      {previews && <>
        <Heading id="previews" headingLevel={2} content="Previews:" />
        <ul>
          {previews
            .map(({ id }, index) => <li key={index}><a href={`/previews/${id}`}>{id}</a></li>)
          }
        </ul>
      </>}
    </div>
  </main>
);

export const getServerSideProps: GetServerSideProps<PageProps> = async (context: GetServerSidePropsContext) => {
  const tenantId = (context.query['x-epp-tenant-id'] || context.req.headers['x-epp-tenant-id']) as string | undefined;
  if (!tenantId) {
    console.log('no tenant id set'); // eslint-disable-line no-console
    return { notFound: true };
  }
  const tenantConfig = await fetchTenantConfig(tenantId);
  if (!tenantConfig) {
    console.log('no tenant config found'); // eslint-disable-line no-console
    return { notFound: true };
  }

  const versions = (await fetchVersions(tenantConfig.id)).items.sort((a, b) => (a.id > b.id ? 1 : -1));
  const articles = versions.filter((version) => (version.date));
  const previews = versions.filter((version) => (!version.date));
  return {
    props: {
      tenantConfig,
      articles,
      previews,
    },
  };
};

export default App;
