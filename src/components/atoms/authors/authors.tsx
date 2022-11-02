import { useEffect, useState } from 'react';
import styles from './authors.module.scss';
import { Author } from '../../../types';

const authorLimit = 10;

export const Authors = ({ authors }: { authors: Author[] }): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean | null>(null);

  useEffect(() => setExpanded(false), []);

  return (
    <div className={styles.authors}>
      <ol className={styles['authors-list']} aria-label="Authors of this article">
        { authors.slice(0, expanded !== false ? authors.length : authorLimit).map(({ givenNames, familyNames }, index) => (
          <li className={styles['authors-list__item']} key={index}>
            {givenNames.join(' ')} {familyNames.join(' ')}
          </li>
        ))}
      </ol>
      { authors.length > authorLimit
        ? <span className={styles['authors-list__expansion']} onClick={() => setExpanded(!expanded)}>{expanded === null ? '' : `${expanded ? 'show less' : `...show ${authors.length - authorLimit} more`}`}</span> : ''}
    </div>
  );
};
