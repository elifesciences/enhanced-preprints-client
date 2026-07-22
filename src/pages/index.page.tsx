import { type GetServerSideProps } from 'next';
import { config } from '../config';
import { type ArticleSummary } from '../types';
import { fetchVersions } from '../utils/data-fetch';

type PageProps = {
  siteName?: string,
  ids?: string[],
  articles?: ArticleSummary[]
  previews?: ArticleSummary[]
};

const App = ({ ids, articles, previews }: PageProps) => (
  <main className="primary-section">
    <div className="article-body-container">
      <h2 id="articles" className="heading-2">Articles:</h2>
      <ul>
        {ids && ids
          .map((id, index) => <li key={index}><a href={`/reviewed-preprints/${id}`}>{id}</a></li>)
        }
        {articles && articles
          .map(({ id }, index) => <li key={index}><a href={`/reviewed-preprints/${id}`}>{id}</a></li>)
        }
      </ul>

      {previews && <>
        <h2 id="previews" className="heading-2">Previews:</h2>
        <ul>
          {previews
            .map(({ id }, index) => <li key={index}><a href={`/previews/${id}`}>{id}</a></li>)
          }
        </ul>
      </>}
    </div>
  </main>
);

// ts-unused-exports:disable-next-line
export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const versions = (await fetchVersions()).items.sort((a, b) => (a.id > b.id ? 1 : -1));
  const articles = versions.filter((version) => (version.date));
  const previews = versions.filter((version) => (!version.date));
  return {
    props: {
      siteName: config.siteName,
      articles,
      previews,
    },
  };
};

// ts-unused-exports:disable-next-line
export default App;
