import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { config } from '../config';
import { getManuscripts } from '../manuscripts';
import { fetchVersions } from '../utils/fetch-data';
import { ArticleSummary } from '../types/enhanced-article';
import { Heading } from '../components/atoms/heading/heading';

type PageProps = {
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
          .map((id, index) => <li key={index}><Link href={`/reviewed-preprints/${id}`}>{id}</Link></li>)
        }
        {articles && articles
          .map(({ id }, index) => <li key={index}><Link href={`/reviewed-preprints/${id}`}>{id}</Link></li>)
        }
      </ul>

      {previews && <>
        <Heading id="previews" headingLevel={2} content="Previews:" />
        <ul>
          {previews
            .map(({ id }, index) => <li key={index}><Link href={`/previews/${id}`}>{id}</Link></li>)
          }
        </ul>
      </>}
    </div>
  </main>
);

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  if (!config.automationFlag) {
    return {
      props: {
        ids: Object.keys(getManuscripts(config.manuscriptConfigFile)).sort(),
      },
    };
  }

  const versions = (await fetchVersions()).items.sort((a, b) => (a.id > b.id ? 1 : -1));
  const articles = versions.filter((version) => (version.date));
  const previews = versions.filter((version) => (!version.date));
  return {
    props: {
      articles,
      previews,
    },
  };
};

export default App;
