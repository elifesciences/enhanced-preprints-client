import './terms-list.scss';
import { getTermDescription } from '../../../utils/terms';

export const TermsList = ({ terms, selectedTerm }:{ terms: string[], selectedTerm: string[] }) => (
  <div className='terms-container'>
    {selectedTerm.map((term, index) => (
      <p className='term-description' key={index}>
        <b>{ term }</b>: { getTermDescription(term) }
      </p>
    ))}
    <ul className="terms-list" aria-label="A list showing important assesment terms">
      {terms.map((term) => (
        <li className={`term${selectedTerm.includes(term) ? ' term__highlighted' : ''}`} key={term} aria-label="This term is reflected in the article">{term}</li>
      ))}
    </ul>
  </div>
);
