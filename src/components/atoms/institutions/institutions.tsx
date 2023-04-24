import { useMemo, useState } from 'react';
import './institutions.scss';
import { Institution } from '../../../types';

const institutionLimit = 3;

export const Institutions = ({ institutions }: { institutions: Institution[] }): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const displayInstitutions = useMemo(() => institutions.slice(0, expanded !== false ? institutions.length : institutionLimit), [expanded]);
  const expansionText = useMemo(() => (expanded ? 'show less' : `show ${institutions.length - institutionLimit} more`), [expanded]);

  return (
    <div className="institutions">
      {typeof window !== 'undefined' ?
        <>
          <ol className="institutions-list" aria-label="Author institutions">
            { displayInstitutions.map(({ name, address }, index) => (
              <li className="institutions-list__item" key={index}>
                {name}{ address ? <address className="institution__address">{address.addressCountry ?? ''}</address> : ''}
              </li>
            ))}
          </ol>
          {(institutions.length > institutionLimit && expanded !== null) && <span className="institutions-list__expansion" onClick={() => setExpanded(!expanded)}>{expansionText}</span>}
        </>
        :
        <ol className="institutions-list" aria-label="Author institutions">
          {institutions.map(({ name, address }, index) => (
            <li className="institutions-list__item" key={index}>
              {name}{ address ? <address className="institution__address">{address.addressCountry ?? ''}</address> : ''}
            </li>
          ))}
        </ol>
      }
    </div>
  );
};
