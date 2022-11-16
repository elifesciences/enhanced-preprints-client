import { useEffect, useState } from 'react';
import styles from './institutions.module.scss';
import { Institution } from '../../../types';

const institutionLimit = 3;

export const Institutions = ({ institutions }: { institutions: Institution[] }): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean | null>(null);

  useEffect(() => setExpanded(false), []);
  const displayInstitutions = institutions.slice(0, expanded !== false ? institutions.length : institutionLimit);
  const expansionText = expanded ? 'show less' : `show ${institutions.length - institutionLimit} more`;

  return (
    <div className={styles.institutions}>
      <ol className={styles['institutions-list']} aria-label="Author institutions">
        { displayInstitutions.map(({ name, address }, index) => (
          <li className={styles['institutions-list__item']} key={index}>
            {name}{ address ? <address className={styles.institution__address}>{address.addressCountry ?? ''}</address> : ''}
          </li>
        ))}
      </ol>
      {(institutions.length > institutionLimit && expanded !== null) && <span className={styles['institutions-list__expansion']} onClick={() => setExpanded(!expanded)}>{expansionText}</span>}
    </div>
  );
};
