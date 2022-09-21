import { useState } from 'react';
import styles from './authors.module.scss';

export type Author = {
  givenNames: string[],
  familyNames: string[],
};

const authorLimit = 10;

export const Authors = ({ authors }: { authors: Author[] }): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="authors">
      <ol className={styles['authors-list']}>
        { authors.slice(0, expanded ? authors.length : authorLimit).map(({ givenNames, familyNames }, index) => (
          <li className={styles['authors-list__item']} key={index}>
            {givenNames.join(' ')} {familyNames.join(' ')}
          </li>
        ))}
      </ol>
      { authors.length > authorLimit
        ? <span className={styles['authors-list__expansion']} onClick={() => setExpanded(!expanded)}>{expanded ? 'show less' : `...show ${authors.length - authorLimit} more`}</span> : ''}
    </div>
  );
};
