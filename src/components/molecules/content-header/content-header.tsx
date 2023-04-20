import './content-header.scss';
import dynamic from 'next/dynamic';
import { Authors } from '../../atoms/authors/authors';
import { Descriptors } from '../../atoms/descriptors/descriptors';
import { Title } from '../../atoms/title/title';
import { ArticleFlagList, Props as FlagProps } from '../article-flag-list/article-flag-list';
import { Author, Content, Institution } from '../../../types';

export type ContentHeaderProps = FlagProps & {
  authors: Author[];
  doi: string;
  title: Content;
};

const filterInstitutions = (institution: Institution | undefined): institution is Institution => institution !== undefined;

export const DynamicInstitutions = dynamic(import('../../atoms/institutions/institutions').then((module) => module.Institutions), { ssr: false });

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
    <header className="content-header">
      <ArticleFlagList msas={msas}/>
      <Title title={title}/>
      <Authors authors={authors}/>
      <DynamicInstitutions institutions={processedInstitutions}/>
      <Descriptors doi={doi}/>
    </header>
  );
};
