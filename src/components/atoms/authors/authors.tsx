import { useEffect, useState } from 'react';
import styles from './authors.module.scss';
import { Author } from '../../../types';

const authorLimit = 3;
const authorLimits = [authorLimit, 10];

export const Authors = ({ authors }: { authors: Author[] }): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean | null>(null);

  useEffect(() => setExpanded(false), []);

  return (
    <div className={
      `
      ${styles.authors}${authors.length > authorLimit && expanded !== null ? ` ${styles['authors--collapsible']}` : ''}
      ${expanded !== null ? authorLimits.map((limit) => (limit < authors.length ? ` ${styles[`authors--limit-${limit}`]}` : '')).join(' ') : ''}
      `
    }>
      <ol className={`${styles['authors-list']}${expanded ? ` ${styles['authors-list--expanded']}` : ''}`} aria-label="Authors of this article">
        { authors.map(({ givenNames, familyNames }, index) => (
          <li className={styles['authors-list__item']} key={index}>
            {givenNames.join(' ')} {familyNames.join(' ')}
          </li>
        ))}
      </ol>
        {(authors.length > authorLimit && expanded !== null) &&
        <span className={styles['authors-list__expansion']} onClick={() => setExpanded(!expanded)}>
          show{!expanded ? authorLimits.map(
          (limit, index) => <span key={index} aria-hidden="true" className={`${styles['authors-list__expansion-count']} ${styles[`authors-list__expansion-count-${limit}`]}`}> {authors.length - limit}</span>,
        ) : ''} {expanded ? 'less' : 'more'}</span>}
    </div>
  );
};
