import Link from 'next/link';
import { manuscripts } from '../manuscripts';

export const App = (): JSX.Element => (
  <div className="App">
    <ul>
      {Object.keys(manuscripts)
        .sort()
        .map((msid, index) => <li key={index}><Link href={`/reviewed-preprints/${msid}`}>{msid}</Link></li>)
      }
    </ul>
  </div>
);

export default App;
