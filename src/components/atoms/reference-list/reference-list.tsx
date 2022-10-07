import styles from './reference-list.module.scss';

export type Address = {
  addressCountry: string,
};
export type Organisation = {
  name: string,
  address?: Address,
};
export type Author = {
  type: 'Person'
  familyNames: string[],
  givenNames: string[],
  affiliations?: Organisation[],
};
export type PublicationType = 'PublicationVolume' | 'Periodical';
export type Publication = {
  type: PublicationType,
  name?: string,
  volumeNumber?: number,
  isPartOf?: Publication,
};
export type Reference = {
  type: 'Article',
  id: string,
  title: string,
  url?: string,
  pageEnd?: number,
  pageStart: number,
  authors: Array<Author>,
  datePublished: string,
  isPartOf?: Publication,
};

const formatName = (author: Author) => `${author.familyNames.join(' ')} ${author.givenNames.join(' ')}`;

const ReferenceListItem = ({ reference }: { reference: Reference }): JSX.Element => {
  const referenceJournal = reference.isPartOf?.isPartOf?.name ?? reference.isPartOf?.name;
  const referenceVolume = reference.isPartOf?.isPartOf?.volumeNumber ?? reference.isPartOf?.volumeNumber;
  return (
    <li id={reference.id} className={styles['reference-list__item']}>
      <ol className={styles.reference__authors_list}>
        {reference.authors.map((author, index) => (
          <li key={index} className={styles.reference__author}>
            {formatName(author)}
          </li>
        ))}

      </ol>
      <span className={styles.reference__authors_list_suffix}>{new Date(reference.datePublished).getFullYear()}</span>
      <span className={styles.reference__title}>{reference.title}</span>
      <span className={styles.reference__origin}>
        {referenceJournal ? <i>{referenceJournal} </i> : ''}
        {referenceVolume ? <b>{referenceVolume}:</b> : ''}
        {reference.pageStart}{reference.pageEnd ? `–${reference.pageEnd}` : ''}
      </span>
    </li>
  );
};

export const ReferenceList = ({ references }: { references: Reference[] }): JSX.Element => (
  <ul className={styles['reference-list']}>
    {references.map((reference, index) => <ReferenceListItem key={index} reference={reference} />)}
  </ul>
);
