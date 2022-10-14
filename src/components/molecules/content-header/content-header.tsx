import styles from './content-header.module.scss';
import { Content } from '../../../types/content';
import { Author, Authors } from '../../atoms/authors/authors';
import { Descriptors } from '../../atoms/descriptors/descriptors';
import { Title } from '../../atoms/title/title';
import { ArticleFlagList, Props as FlagProps } from '../article-flag-list/article-flag-list';
import { Institution, Institutions } from '../../atoms/institutions/institutions';

export type ContentHeaderProps = FlagProps & {
  authors: Author[];
  doi: string;
  title: Content;
};

const filterInstitutions = (institution: Institution | undefined): institution is Institution => institution !== undefined;

export const ContentHeader = ({
  msas,
  title,
  authors,
  doi,
}: ContentHeaderProps): JSX.Element => (
  <header className={styles['content-header']}>
    <ArticleFlagList msas={msas}/>
    <Title title={title}/>
    <Authors authors={authors}/>
    <Institutions institutions={authors.flatMap((author) => author.affiliations).filter(filterInstitutions)}/>
    <Descriptors doi={doi}/>
  </header>
);
