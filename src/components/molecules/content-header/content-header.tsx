import './content-header.scss';
import { type JSX } from 'react';
import { type Content } from '../../../content';
import { type Author, Authors } from '../../atoms/authors/authors';
import { Descriptors } from '../../atoms/descriptors/descriptors';
import { type Institution, Institutions } from '../../atoms/institutions/institutions';
import { Title } from '../../atoms/title/title';
import { ArticleFlagList, type Props as FlagProps } from '../article-flag-list/article-flag-list';

type ContentHeaderProps = FlagProps & {
  authors: Author[];
  doi: string;
  title: Content;
  license: string | undefined;
  institutions: Institution[],
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
