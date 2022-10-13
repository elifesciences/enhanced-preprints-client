import { manuscripts } from '../manuscripts';

console.log(manuscripts);

export const App = (): JSX.Element => (
  <div className="App">
    <ul>
      {Object.values(manuscripts)
        .map((manuscript) => manuscript.msid)
        .filter((v, i, a) => a.indexOf(v) === i)
        .map((msid, index) => <li key={index}><a href={`/reviewed-preprints/${msid}`}>{msid}</a></li>)
      }
    </ul>
  </div>
);

export default App;
