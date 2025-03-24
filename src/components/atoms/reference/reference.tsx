import { useTranslation } from 'react-i18next';
import { Author, Reference as ReferenceData } from '../../../types';
import './reference.scss';

type ReferenceBodyProps = {
  reference: ReferenceData,
};

const formatName = (author: Author) => `${author.familyNames ? author.familyNames?.join(' ') : ''} ${author.givenNames ? author.givenNames?.join(' ') : ''}`.trim();

function prepareReference(reference: ReferenceData) {
  const referenceJournal = reference.isPartOf?.isPartOf?.isPartOf?.name ?? reference.isPartOf?.isPartOf?.name ?? reference.isPartOf?.name;
  const referencePublisher = reference.publisher;
  const referenceVolume = reference.isPartOf?.isPartOf?.volumeNumber ?? reference.isPartOf?.volumeNumber;
  const doiIdentifier = reference.identifiers?.find((identifier) => identifier.name === 'doi');
  const eLocationId = reference.identifiers?.find((identifier) => identifier.name === 'elocation-id')?.value;
  const year = reference.meta?.yearPublished ?? (
    reference.datePublished ?
      new Date(typeof reference.datePublished === 'string' ? reference.datePublished : reference.datePublished.value).getUTCFullYear() :
      undefined
  );
  const linkText = doiIdentifier ? `https://doi.org/${doiIdentifier.value}` : reference.url;
  const linkRef = doiIdentifier ? `https://doi.org/${doiIdentifier.value}` : reference.url;
  const comments = reference.comments?.map((comment) => comment.commentAspect).join(', ') ?? '';

  return {
    referenceJournal,
    referencePublisher,
    referenceVolume,
    year,
    linkText,
    linkRef,
    eLocationId,
    comments,
  };
}

export const Reference = ({ reference }: ReferenceBodyProps) => {
  const { t } = useTranslation();

  const {
    referenceJournal, referencePublisher, referenceVolume, year, linkText, linkRef, eLocationId, comments,
  } = prepareReference(reference);

  return (
    <>
      { reference.meta?.label && <span className="reference__label">{reference.meta.label}</span>}
      <ol className="reference__authors_list">
        {reference.authors.map((author, index) => (
          <li key={index} className="reference__author">
            {author.type === 'Organization' ? author.name : formatName(author)}
          </li>
        ))}
      </ol>
      { year && <span className="reference__authors_list_suffix">{year}</span> }
      <span className="reference__title">{linkRef ? <a className="reference__title--link" href={linkRef}>{reference.title}</a> : reference.title}</span>
      <span className="reference__origin">
        {referenceJournal && reference.meta?.publicationType === 'book' && <>{t('chapter_in_journal_prefix')}</>}
        {referenceJournal && <><i>{referenceJournal}</i> </>}
        {referencePublisher && <>{referencePublisher.address && <>{referencePublisher.address.addressLocality}: </>}{referencePublisher.name} </>}
        {referenceVolume && <strong>{referenceVolume}</strong>}
        {reference.pageStart && `${reference.meta?.publicationType === 'book' ? t('page_prefix_in_book') : ':'}${reference.pageStart}${reference.pageEnd !== undefined ? `–${reference.pageEnd}` : ''}`}
        {(!reference.pageStart && eLocationId) && `:${eLocationId}`}
      </span>
      { comments && <span className="reference__comments">{comments}</span> }
      {(linkRef) && <span className="reference__doi">
        <a href={linkRef} className="reference__doi_link">
          {linkText}
        </a>
        </span>
      }
    </>
  );
};
