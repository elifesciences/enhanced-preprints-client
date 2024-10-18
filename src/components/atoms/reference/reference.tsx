import { Author, Reference as ReferenceData } from '../../../types';
import './reference.scss';

type ReferenceBodyProps = {
  reference: ReferenceData,
  isReferenceList: boolean
};

const formatName = (author: Author) => `${author.familyNames ? author.familyNames?.join(' ') : ''} ${author.givenNames ? author.givenNames?.join(' ') : ''}`.trim();

export const ReferenceBody = ({ reference, isReferenceList = false }: ReferenceBodyProps) => {
  const referenceJournal = reference.isPartOf?.isPartOf?.isPartOf?.name ?? reference.isPartOf?.isPartOf?.name ?? reference.isPartOf?.name;
  const referencePublisher = reference.publisher;
  const referenceVolume = reference.isPartOf?.isPartOf?.volumeNumber ?? reference.isPartOf?.volumeNumber;
  const doiIdentifier = reference.identifiers?.find((identifier) => identifier.name === 'doi');
  const year = reference.datePublished ? new Date(typeof reference.datePublished === 'string' ? reference.datePublished : reference.datePublished.value).getUTCFullYear() : undefined;

  return (
    <>
      { (isReferenceList && reference.meta?.label) && <span className="reference__label">{reference.meta.label}</span>}
      <ol className="reference__authors_list">
        {reference.authors.map((author, index) => (
          <li key={index} className="reference__author">
            {author.type === 'Organization' ? author.name : formatName(author)}
          </li>
        ))}
      </ol>
      { year && <span className="reference__authors_list_suffix">{year}</span> }
      <span className="reference__title">{reference.title}</span>
      <span className="reference__origin">
        {referenceJournal && <><i>{referenceJournal}</i> </>}
        {referencePublisher && <>{referencePublisher.address && <>{referencePublisher.address.addressLocality}: </>}{referencePublisher.name} </>}
        {referenceVolume && <strong>{referenceVolume}</strong>}
        {reference.pageStart && `:${reference.pageStart}${reference.pageEnd !== undefined ? `–${reference.pageEnd}` : ''}`}
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
