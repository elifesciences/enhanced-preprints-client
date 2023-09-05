import { Author, Reference as ReferenceData } from '../../../types';
import './reference.scss';

type ReferenceBodyProps = {
  reference: ReferenceData,
  isReferenceList: boolean
};

const formatName = (author: Author) => `${author.type === 'Organization' ? author.name : `${author.familyNames ? author.familyNames?.join(' ') : ''} ${author.givenNames ? author.givenNames?.join(' ') : ''}`}`.trim();

export const ReferenceBody = ({ reference, isReferenceList = false }: ReferenceBodyProps) => {
  const referenceJournal = reference.isPartOf?.isPartOf?.isPartOf?.name ?? reference.isPartOf?.isPartOf?.name ?? reference.isPartOf?.name;
  const referenceVolume = reference.isPartOf?.isPartOf?.volumeNumber ?? reference.isPartOf?.volumeNumber;
  const doiIdentifier = reference.identifiers?.find((identifier) => identifier.name === 'doi');

  return (
    <>
      { (isReferenceList && reference.meta?.label) && <span className="reference__label">{reference.meta.label}</span>}
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
        {referenceVolume !== undefined ? <b>{referenceVolume}</b> : ''}
        {reference.pageStart !== undefined ? `:${reference.pageStart}${reference.pageEnd !== undefined ? `–${reference.pageEnd}` : ''}` : ''}
      </span>
      {doiIdentifier && <span className="reference__doi">
        {isReferenceList ?
          <a href={`https://doi.org/${doiIdentifier.value}`} className="reference__doi_link">
            https://doi.org/{doiIdentifier.value}
          </a> : `https://doi.org/${doiIdentifier.value}`}
        </span>
      }
    </>
  );
};

export const Reference = ({ reference, isReferenceList = false }: { reference: ReferenceData, isReferenceList: boolean }) => (isReferenceList ?
  <li className="reference" id={reference.id}>{ReferenceBody({ reference, isReferenceList })}</li> :
  <div className="reference" id={reference.id}>{ReferenceBody({ reference, isReferenceList })}</div>
);
