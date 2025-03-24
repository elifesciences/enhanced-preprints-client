import './descriptors.scss';
import { useTranslation } from 'react-i18next';

export const Descriptors = ({ doi, license }: { doi: string, license?: string }) => {
  const { t } = useTranslation();
  const doiUrl = t('doi_url', { doi });
  return (
    <div className="descriptors">
      {doiUrl && <ul className="descriptors__identifiers">
        <li className="descriptors__identifier">
          <a href={doiUrl}>{doiUrl}</a>
        </li>
      </ul>
      }
      {license && <ul className="descriptors__icons">
        <li>
          <a href="https://en.wikipedia.org/wiki/Open_access" className={'descriptors__icon descriptors__icon--oa'}>
            <span className="visuallyhidden">Open access</span>
          </a>
        </li>
        <li>
          <a href='#copyright' className={'descriptors__icon descriptors__icon--cc'}>
            <span className="visuallyhidden">Copyright information</span>
          </a>
        </li>
      </ul>
      }
    </div>
  );
};
