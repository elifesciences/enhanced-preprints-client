import './institutions.scss';
import { useState } from 'react';

type Institution = {
  name: string,
  address?: {
    addressCountry: string,
  },
};

const institutionLimit = 3;

export const Institutions = ({ institutions }: { institutions: Institution[] }): JSX.Element => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <ol className="institutions-list">
        { institutions.slice(0, expanded ? institutions.length : institutionLimit).map(({ name, address }, index) => (
          <li className="institutions-list__item" key={index}>
            {name}{ address ? <address className="institution__address">{address.addressCountry ?? ''}</address> : ''}
          </li>
        ))}
      </ol>
      { institutions.length > institutionLimit
        ? <span className="institutions-list__expansion" onClick={() => setExpanded(!expanded)}>{expanded ? 'show less' : `...show ${institutions.length - institutionLimit} more`}</span> : ''}
    </div>
  );
};
