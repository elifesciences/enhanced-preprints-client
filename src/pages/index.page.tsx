import { manuscripts } from '../manuscripts';

export const App = (): JSX.Element => (
  <div className="App">
    <ul>
      {Object.keys(manuscripts)
        .sort()
        .map((msid, index) => <li key={index}><a href={`/reviewed-preprints/${msid}`}>{msid}</a></li>)
      }
    </ul>
  </div>
);

export default App;
