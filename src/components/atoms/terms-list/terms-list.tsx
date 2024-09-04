import './terms-list.scss';
import { getTermDescription } from '../../../utils/terms';

export const TermsList = ({ title, terms, selectedTerm }:{ title: string, terms: string[], selectedTerm: string[] }) => (
  <div className='terms-container'>
    <h3 className="term-list__title">{title}</h3>
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
