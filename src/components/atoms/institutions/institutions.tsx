import { useEffect, useState } from 'react';
import './institutions.scss';
import { Institution } from '../../../types';

const institutionLimit = 3;

export const Institutions = ({ institutions }: { institutions: Institution[] }) => {
  const [expanded, setExpanded] = useState<boolean | null>(null);

  useEffect(() => setExpanded(false), []);
  const displayInstitutions = institutions.slice(0, expanded !== false ? institutions.length : institutionLimit);
  const expansionText = expanded ? 'show less' : `show ${institutions.length - institutionLimit} more`;

  return (
    <div className="institutions">
      <ol className="institutions-list" aria-label="Author institutions">
        { displayInstitutions.map(({ name, address }, index) => (
          <li className="institutions-list__item" key={index}>
            {name}{ address ? <address className="institution__address">{address.addressCountry ?? ''}</address> : ''}
          </li>
        ))}
      </ol>
      {(institutions.length > institutionLimit && expanded !== null) && <span className="institutions-list__expansion" onClick={() => setExpanded(!expanded)}>{expansionText}</span>}
    </div>
  );
};
