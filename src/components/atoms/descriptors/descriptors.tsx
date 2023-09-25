import './descriptors.scss';

export const Descriptors = ({ doi, license }: { doi: string, license?: string }) => (
  <div className="descriptors">
    <ul className="descriptors__identifiers">
      <li className="descriptors__identifier">
        <a href={`https://doi.org/${doi}`}>https://doi.org/{doi}</a>
      </li>
    </ul>
    <ul className="descriptors__icons">
      <li>
        <a href="https://en.wikipedia.org/wiki/Open_access" className={'descriptors__icon descriptors__icon--oa'}>
          <span className="visuallyhidden">Open access</span>
        </a>
      </li>
      {license && 
        <li>
          <a href={license} className={'descriptors__icon descriptors__icon--cc'}>
            <span className="visuallyhidden">Copyright information</span>
          </a>
        </li>
      }
    </ul>
  </div>
);
