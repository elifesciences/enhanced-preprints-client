import { Author, Reference as ReferenceData } from '../../../types';
import './reference.scss';

const formatName = (author: Author) => `${author.familyNames?.join(' ')} ${author.givenNames?.join(' ')}`;

export const Reference = ({ reference, doiIsLink = false }: { reference: ReferenceData, doiIsLink: boolean }): JSX.Element => {
  const referenceJournal = reference.isPartOf?.isPartOf?.name ?? reference.isPartOf?.name;
  const referenceVolume = reference.isPartOf?.isPartOf?.volumeNumber ?? reference.isPartOf?.volumeNumber;

  const doiIdentifier = reference.identifiers?.find((identifier) => identifier.name === 'doi');

  return (
      <div className="reference" id={reference.id}>
        <ol className="reference__authors_list">
          {reference.authors.map((author, index) => (
            <li key={index} className="reference__author">
              {formatName(author)}
            </li>
          ))}
        </ol>
        <span className="reference__authors_list_suffix">{new Date(reference.datePublished).getFullYear()}</span>
        <span className="reference__title">{reference.title}</span>
        <span className="reference__origin">
          {referenceJournal ? <i>{referenceJournal} </i> : ''}
          {referenceVolume ? <b>{referenceVolume}:</b> : ''}
          {reference.pageStart}{reference.pageEnd ? `–${reference.pageEnd}` : ''}
        </span>
        {doiIdentifier && <span className="reference__doi">
          {doiIsLink ?
            <a href={`https://doi.org/${doiIdentifier.value}`} className="reference__doi_link">
              https://doi.org/{doiIdentifier.value}
            </a> : `https://doi.org/${doiIdentifier.value}`}
          </span>
        }
      </div>
  );
};
