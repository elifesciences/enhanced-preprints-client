import { useEffect, useState } from 'react';
import './authors.scss';
import { Author } from '../../../types';

const authorLimit = 3;
const authorLimits = [authorLimit, 10];

export const Authors = ({ authors }: { authors: Author[] }): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean | null>(null);

  useEffect(() => setExpanded(false), []);

  return (
    <div className={
      `
      authors${authors.length > authorLimit && expanded !== null ? ' authors--collapsible' : ''}
      ${expanded !== null ? authorLimits.map((limit) => (limit < authors.length ? ` authors--limit-${limit}` : '')).join(' ') : ''}
      `
    }>
      <ol className={`authors-list${expanded ? ' authors-list--expanded' : ''}`} aria-label="Authors of this article">
        { authors.map(({ givenNames, familyNames }, index) => (
          <li className="authors-list__item" key={index}>
            {givenNames.join(' ')} {familyNames.join(' ')}
          </li>
        ))}
      </ol>
        {(authors.length > authorLimit && expanded !== null) &&
        <span className="authors-list__expansion" onClick={() => setExpanded(!expanded)}>
          show{!expanded ? authorLimits.map(
          (limit, index) => <span key={index} aria-hidden="true" className={`authors-list__expansion-count authors-list__expansion-count-${limit}`}> {authors.length - limit}</span>,
        ) : ''} {expanded ? 'less' : 'more'}</span>}
    </div>
  );
};
