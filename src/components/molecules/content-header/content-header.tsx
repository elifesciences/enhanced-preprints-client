import styles from './content-header.module.scss';
import { Content } from '../../../types/content';
import { Author, Authors } from '../../atoms/authors/authors';
import { Descriptors } from '../../atoms/descriptors/descriptors';
import { Title } from '../../atoms/title/title';
import { ArticleFlagList, Props as FlagProps } from '../article-flag-list/article-flag-list';

export type ContentHeaderProps = FlagProps & {
  authors: Author[];
  doi: string;
  title: Content;
};

export const ContentHeader = ({
  msas,
  strengthOfEvidence,
  importance,
  title,
  authors,
  doi,
}: ContentHeaderProps): JSX.Element => (
  <header className={styles['content-header']}>
    <ArticleFlagList msas={msas} strengthOfEvidence={strengthOfEvidence} importance={importance} />
    <Title title={title} />
    <Authors authors={authors} />
    <Descriptors doi={doi} />
  </header>
);
