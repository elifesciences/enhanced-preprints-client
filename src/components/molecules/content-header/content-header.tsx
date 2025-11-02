import './content-header.scss';
import { Authors } from '../../atoms/authors/authors';
import { Descriptors } from '../../atoms/descriptors/descriptors';
import { Title } from '../../atoms/title/title';
import { ArticleFlagList, type Props as FlagProps } from '../article-flag-list/article-flag-list';
import { Institutions } from '../../atoms/institutions/institutions';
import { type Author, type Content, type Institution } from '../../../types';

export type ContentHeaderProps = FlagProps & {
  authors: Author[];
  doi: string;
  title: Content;
  license: string | undefined;
};

const filterInstitutions = (institution: Institution | undefined): institution is Institution => institution !== undefined;

export const ContentHeader = ({
  msas,
  title,
  authors,
  doi,
  license,
}: ContentHeaderProps) => {
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
