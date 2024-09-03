import './terms-list.scss';
import { getTermDescription } from '../../../utils/terms';

export const TermsList = ({ terms, selectedTerm }:{ terms: string[], selectedTerm: string[] }) => (
  <div className='terms-container'>
    {selectedTerm.map((term, index) => (
      <p className='term-description' key={index}>
        <b>{ term }</b>: { getTermDescription(term) }
      </p>
    ))}
    <div className="terms-list">
      {terms.map((term) => (
        <span className={`term${selectedTerm.includes(term) ? ' term__highlighted' : ''}`} key={term}>{term}</span>
      ))}
    </div>
  </div>
);
