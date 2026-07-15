import './content-header.scss';
import { type JSX } from 'react';
import { type Content, type Institution } from '../../../types';
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
  institutions: Institution[],
};

const filterInstitutions = (institution: Institution | undefined): institution is Institution => institution !== undefined;

export const ContentHeader = ({
  msas,
  title,
  authors,
  doi,
  license,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  institutions,
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
    <header className="content-header">
      <ArticleFlagList msas={msas}/>
      <Title title={title}/>
      <Authors authors={authors}/>
      <Institutions institutions={processedInstitutions}/>
      <Descriptors doi={doi} license={license} />
    </header>
  );
};
