import { useEffect, useState } from 'react';
import styles from './authors.module.scss';
import { Author } from '../../../types';

const authorLimit = 10;

export const Authors = ({ authors }: { authors: Author[] }): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean | null>(null);

  useEffect(() => setExpanded(false), []);
  const displayAuthors = authors.slice(0, expanded !== false ? authors.length : authorLimit);
  const expansionText = expanded ? 'show less' : `show ${authors.length - authorLimit} more`;

  return (
    <div className={styles.authors}>
      <ol className={styles['authors-list']} aria-label="Authors of this article">
        { displayAuthors.map(({ givenNames, familyNames }, index) => (
          <li className={styles['authors-list__item']} key={index}>
            {givenNames.join(' ')} {familyNames.join(' ')}
          </li>
        ))}
      </ol>
      {(authors.length > authorLimit && expanded !== null) && <span className={styles['authors-list__expansion']} onClick={() => setExpanded(!expanded)}>{expansionText}</span>}
    </div>
  );
};
