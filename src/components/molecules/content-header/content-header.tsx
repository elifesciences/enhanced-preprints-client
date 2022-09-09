import './content-header.scss';
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

export const ContentHeader = (props: ContentHeaderProps): JSX.Element => (
  <header>
    <ArticleFlagList msas={props.msas} strengthOfEvidence={props.strengthOfEvidence} importance={props.importance} />
    <Title title={props.title} />
    <Authors authors={props.authors} />
    <Descriptors doi={props.doi} />
  </header>
);
