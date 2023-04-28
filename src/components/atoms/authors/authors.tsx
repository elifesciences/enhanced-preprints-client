import { useMemo, useState } from 'react';
import './authors.scss';
import { Author } from '../../../types';
import { createAuthorId } from '../../../utils/create-author-id';

const authorLimit = 3;
const authorLimits = [authorLimit, 10];

export const Authors = ({ authors }: { authors: Author[] }): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean | null>(null);
  useMemo(() => typeof window !== 'undefined' && setExpanded(false), [typeof window === 'undefined']);

  return expanded !== null ? (
    <div className={
      `
      authors${authors.length > authorLimit ? ' authors--collapsible' : ''}
      ${authorLimits.map((limit) => (limit < authors.length ? ` authors--limit-${limit}` : '')).join(' ')}
      `
    }>
      <ol className={`authors-list${expanded ? ' authors-list--expanded' : ''}`} aria-label="Authors of this article">
        { authors.map((author, index) => (
          <li className="authors-list__item" key={index}>
            <a href={`#${createAuthorId(author)}`} className={`authors-link${author.emails ? ' authors-email__link' : ''}`}>
              {author.givenNames?.join(' ')} {author.familyNames?.join(' ')}{author.emails ? <span className="visuallyhidden"> author has email address</span> : ''}
            </a>
          </li>
        ))}
      </ol>
        {authors.length > authorLimit &&
        <span className="authors-list__expansion" onClick={() => setExpanded(!expanded)}>
          show{!expanded ? authorLimits.map(
          (limit, index) => <span key={index} aria-hidden="true" className={`authors-list__expansion-count authors-list__expansion-count-${limit}`}> {authors.length - limit}</span>,
        ) : ''} {expanded ? 'less' : 'more'}</span>}
    </div>
  ) : (
    <div className="authors">
      <ol className="authors-list" aria-label="Authors of this article">
        { authors.map((author, index) => (
          <li className="authors-list__item" key={index}>
            <a href={`#${createAuthorId(author)}`} className={`authors-link${author.emails ? ' authors-email__link' : ''}`}>
              {author.givenNames?.join(' ')} {author.familyNames?.join(' ')}{author.emails ? <span className="visuallyhidden"> author has email address</span> : ''}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
};
