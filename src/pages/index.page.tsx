import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { config } from '../config';
import { getManuscripts } from '../manuscripts';
import { fetchVersions } from '../utils/fetch-data';

type PageProps = {
  ids: string[]
};
export const App = ({ ids }: PageProps) => (
  <div className="App">
    <ul>
      {ids
        .sort()
        .map((id, index) => <li key={index}><Link href={`/reviewed-preprints/${id}`}>{id}</Link></li>)
      }
    </ul>
  </div>
);

export const getServerSideProps: GetServerSideProps<PageProps> = async () => (!config.automationFlag ? ({
  props: {
    ids: Object.keys(getManuscripts(config.manuscriptConfigFile)).sort(),
  },
}) : ({
  props: {
    ids: await fetchVersions().then((versions) => versions.items.map((version) => version.id)),
  },
}));

export default App;
