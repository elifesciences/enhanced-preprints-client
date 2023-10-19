import { useEffect, useState } from 'react';
import './authors.scss';
import { Author } from '../../../types';
import { createAuthorId } from '../../../utils/create-author-id';

const authorLimit = 3;
const authorLimits = [authorLimit, 10];

export const Authors = ({ authors }: { authors: Author[] }) => {
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
        { authors.map((author, index) => (
          <li className="authors-list__item" key={index}>
            <a href={`#${createAuthorId(author)}`} className={`authors-link${author.emails ? ' authors-email__link' : ''}`}>
              {author.type === 'Organization' ?
                author.name :
                `${(author.givenNames ?? []).join(' ')} ${(author.familyNames ?? []).join(' ')}${author.honorificSuffix ? ` ${author.honorificSuffix}` : ''}`}
              {author.emails ? <span className="visuallyhidden"> author has email address</span> : ''}
            </a>
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
