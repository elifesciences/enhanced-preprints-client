import { Heading } from '../heading/heading';
import './reference-list.scss';
import { Author, Reference } from '../../../types';

const formatName = (author: Author) => `${author.familyNames?.join(' ')} ${author.givenNames?.join(' ')}`;

const ReferenceListItem = ({ reference }: { reference: Reference }): JSX.Element => {
  const referenceJournal = reference.isPartOf?.isPartOf?.name ?? reference.isPartOf?.name;
  const referenceVolume = reference.isPartOf?.isPartOf?.volumeNumber ?? reference.isPartOf?.volumeNumber;

  const doiIdentifier = reference.identifiers?.find((identifier) => identifier.name === 'doi');

  return (
    <li id={reference.id} className="reference-list__item">
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
            <a href={`https://doi.org/${doiIdentifier.value}`} className="reference__doi_link">
            https://doi.org/{doiIdentifier.value}
            </a>
        </span>}
    </li>
  );
};

export const ReferenceList = ({ references }: { references: Reference[] }): JSX.Element => (
  <section>
    <Heading id="references" headingLevel={1} content="References" />
    <ul className="reference-list">
      {references.map((reference, index) => <ReferenceListItem key={index} reference={reference} />)}
    </ul>
  </section>
);
