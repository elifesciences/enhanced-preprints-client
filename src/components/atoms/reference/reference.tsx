import { useTranslation } from 'react-i18next';
import { type Author, type Reference as ReferenceData } from '../../../types';
import './reference.scss';
import { generateGoogleScholarLink } from '../../../utils/generators/generate-google-scholar-link';
import { formatAuthorName } from '../../../utils/formatters';

type ReferenceBodyProps = {
  reference: ReferenceData,
};

const formatName = (author: Author) => `${author.familyNames ? author.familyNames?.join(' ') : ''} ${author.givenNames ? author.givenNames?.join(' ') : ''}`.trim();

function prepareReference(reference: ReferenceData) {
  const referenceJournal = reference.isPartOf?.isPartOf?.isPartOf?.name ?? reference.isPartOf?.isPartOf?.name ?? reference.isPartOf?.name;
  const referencePublisher = reference.publisher;
  const referenceVolume = reference.isPartOf?.isPartOf?.volumeNumber ?? reference.isPartOf?.volumeNumber;
  const doiIdentifier = reference.identifiers?.find((identifier) => identifier.name === 'doi');
  const pmidIdentifier = reference.identifiers?.find((identifier) => identifier.name === 'pmid');
  const eLocationId = reference.identifiers?.find((identifier) => identifier.name === 'elocation-id')?.value;
  const year = reference.meta?.yearPublished ?? (
    reference.datePublished ?
      new Date(typeof reference.datePublished === 'string' ? reference.datePublished : reference.datePublished.value).getUTCFullYear() :
      undefined
  );
  const linkText = doiIdentifier ? `https://doi.org/${doiIdentifier.value}` : reference.url;
  const linkRef = doiIdentifier ? `https://doi.org/${doiIdentifier.value}` : reference.url;
  const pubmedLinkText = pmidIdentifier && 'PubMed';
  const pubmedLinkRef = pmidIdentifier && `https://pubmed.ncbi.nlm.nih.gov/${pmidIdentifier.value}`;
  const comments = reference.comments?.map((comment) => comment.commentAspect).join(', ') ?? '';
  const authors = reference.authors.filter((author) => !author.meta || author.meta?.personGroupType !== 'editor');
  const editors = reference.authors.filter((author) => author.meta && author.meta?.personGroupType === 'editor');
  const { title } = reference;
  const referenceType = reference.meta?.publicationType ?? '';
  const formattedAuthor = authors.map(formatAuthorName);
  const googleScholarQuery = {
    title,
    author: formattedAuthor,
    publication_year: year,
  };
  const GSlinkRefTypes = ['book', 'journal', 'conference', 'preprint', 'report', 'thesis', 'other'];
  const GSLinkRef = (GSlinkRefTypes.includes(referenceType)) && generateGoogleScholarLink(googleScholarQuery);
  return {
    authors,
    editors,
    referenceJournal,
    referencePublisher,
    referenceVolume,
    year,
    linkText,
    linkRef,
    pubmedLinkText,
    pubmedLinkRef,
    eLocationId,
    comments,
    GSLinkRef,
  };
}

export const Reference = ({ reference }: ReferenceBodyProps) => {
  const { t } = useTranslation();

  const {
    authors,
    editors,
    referenceJournal,
    referencePublisher,
    referenceVolume,
    year,
    linkText,
    linkRef,
    pubmedLinkText,
    pubmedLinkRef,
    eLocationId,
    comments,
    GSLinkRef,
  } = prepareReference(reference);

  return (
    <>
      { reference.meta?.label && <span className="reference__label">{reference.meta.label}</span>}
      <ol className="reference__authors_list">
        {authors.map((author, index) => (
          <li key={index} className="reference__author">
            {author.type === 'Organization' ? author.name : formatName(author)}
          </li>
        ))}
      </ol>
      { year && <span className="reference__authors_list_suffix">{year}</span> }
      <span className="reference__title">{linkRef ? <a className="reference__title--link" href={linkRef}>{reference.title}</a> : reference.title}</span>
      <span className="reference__origin">
        {referenceJournal && reference.meta?.publicationType === 'book' && <>{t('reference_chapter_in_journal_prefix')}</>}
        {editors.length > 0 && <><ol className="reference__editors_list">
          {editors.map((editor, index) => (
            <li key={index} className="reference__editor">
              {editor.type === 'Organization' ? editor.name : formatName(editor)}
            </li>
          ))}
        </ol>{t('reference_editors_suffix')} </>}
        {referenceJournal && <><i>{referenceJournal}</i> </>}
        {referencePublisher && <>{referencePublisher.address && <>{referencePublisher.address.addressLocality}: </>}{referencePublisher.name} </>}
        {referenceVolume && <strong>{referenceVolume}</strong>}
        {reference.pageStart && `${reference.meta?.publicationType === 'book' && reference.pageEnd ? t('reference_page_prefix_in_book') : ':'}${reference.pageStart}${reference.pageEnd !== undefined ? `–${reference.pageEnd}` : ''}`}
        {(!reference.pageStart && eLocationId) && `:${eLocationId}`}
      </span>
      { comments && <span className="reference__comments">{comments}</span> }
      {(linkRef || pubmedLinkRef || GSLinkRef) && (
      <span className="reference__doi">
        {linkRef && (
        <a href={linkRef} className="reference__doi_link">
          {linkText}
        </a>
        )}
        {pubmedLinkRef && (
        <a href={pubmedLinkRef} className="reference__external_link">
          {pubmedLinkText}
        </a>
        )}
        {GSLinkRef &&
          <a href={GSLinkRef} className="reference__external_link">
            Google Scholar
          </a>
        }
      </span>
      )}
    </>
  );
};
