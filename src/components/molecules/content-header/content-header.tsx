import styles from './content-header.module.scss';
import { Authors } from '../../atoms/authors/authors';
import { Descriptors } from '../../atoms/descriptors/descriptors';
import { Title } from '../../atoms/title/title';
import { ArticleFlagList } from '../article-flag-list/article-flag-list';
import { Institution, Institutions } from '../../atoms/institutions/institutions';
import { MetaData } from '../../../types';

export type ContentHeaderProps = Omit<MetaData, 'abstract'>;

const filterInstitutions = (institution: Institution | undefined): institution is Institution => institution !== undefined;

export const ContentHeader = ({
  msas,
  title,
  authors,
  doi,
}: ContentHeaderProps): JSX.Element => {
  const processedInstitutions = authors
    .flatMap((author) => author.affiliations)
    .filter(filterInstitutions)
    .reduce<Institution[]>((deduped, current) => {
    if (!deduped.find((ins) => ins.name === current.name && ins.address?.addressCountry === current.address?.addressCountry)) {
      deduped.push(current);
    }
    return deduped;
  }, []);

  return (
    <header className={styles['content-header']}>
      <ArticleFlagList msas={msas}/>
      <Title title={title}/>
      <Authors authors={authors}/>
      <Institutions institutions={processedInstitutions}/>
      <Descriptors doi={doi}/>
    </header>
  );
};

