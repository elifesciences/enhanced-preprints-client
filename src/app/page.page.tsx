import Link from 'next/link';
import { config } from '../config';
import { getManuscripts } from '../manuscripts';

export const App = (): JSX.Element => {
  const manuscripts = getManuscripts(config.manuscriptConfigFile);

  return <div className="App">
    <ul>
      {Object.keys(manuscripts)
        .sort()
        .map((msid, index) => <li key={index}><Link href={`/reviewed-preprints/${msid}`}>{msid}</Link></li>)
      }
    </ul>
  </div>;
};

export default App;
