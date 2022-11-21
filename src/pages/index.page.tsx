import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { config } from '../config';
import { getManuscripts, Manuscripts } from '../manuscripts';

type PageProps = {
  manuscripts: Manuscripts
};
export const App = ({ manuscripts }: PageProps): JSX.Element => (
  <div className="App">
    <ul>
      {Object.keys(manuscripts)
        .sort()
        .map((msid, index) => <li key={index}><Link href={`/reviewed-preprints/${msid}`}>{msid}</Link></li>)
      }
    </ul>
  </div>
);

export const getServerSideProps: GetServerSideProps<PageProps> = async () => ({
  props: {
    manuscripts: getManuscripts(config.manuscriptConfigFile),
  },
});

export default App;
