import './content-header.scss';
import { type JSX } from 'react';
import { type Content } from '../../../types';
import { Authors } from '../../atoms/authors/authors';
import { Descriptors } from '../../atoms/descriptors/descriptors';
import { Institutions } from '../../atoms/institutions/institutions';
import { Title } from '../../atoms/title/title';
import { type ArticlePageProps } from '../../pages/article/article-page';
import { ArticleFlagList, type Props as FlagProps } from '../article-flag-list/article-flag-list';

type ContentHeaderProps = FlagProps & {
  authors: ArticlePageProps['metaData']['authors'];
  doi: string;
  title: Content;
  license: string | undefined;
  institutions: ArticlePageProps['metaData']['institutions'],
};

export const ContentHeader = ({
  msas,
  title,
  authors,
  doi,
  license,
  institutions,
}: ContentHeaderProps): JSX.Element => (
  <header className="content-header">
    <ArticleFlagList msas={msas}/>
    <Title title={title}/>
    <Authors authors={authors}/>
    <Institutions institutions={institutions}/>
    <Descriptors doi={doi} license={license} />
  </header>
  );
