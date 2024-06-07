import { Fragment } from 'react';
import { Author, VersionHistoryItem } from '../../../types';
import { createAuthorId } from '../../../utils/create-author-id';
import './article-and-author-information.scss';
import { Copyright } from '../../atoms/copyright/copyright';
import { VersionHistory } from '../../atoms/version-history/version-history';

const AuthorInformation = ({ author }: { author: Author }) => {
  const orcids = (author.identifiers ?? []).filter(({ type, propertyID }) => type === 'orcid' || (type === 'PropertyValue' && propertyID === 'https://registry.identifiers.org/registry/orcid'));

  return (
    <li className="author-list__author">
      <h4 id={createAuthorId(author)} className="author-list__author_name">{author.type === 'Organization' ?
        author.name :
        `${(author.givenNames ?? []).join(' ')} ${(author.familyNames ?? []).join(' ')}${author.honorificSuffix ? ` ${author.honorificSuffix}` : ''}`}</h4>
      {
        author.affiliations && (
          <div className="author-list__affiliations">
            {author.affiliations.map(({ name, address }) => `${name}${address ? `, ${address.addressCountry}` : ''}`).join(', ')}
          </div>
        )
      }

      {author.emails ? <div className="author-list__email"><h5 className="author-list__email--heading">For correspondence:</h5> <span className="author-list__email">{author.emails}</span></div> : '' }

      {
        orcids.length > 0 && (
          <div className="author-list__orcids">
            ORCID iD: {orcids.map(({ value }, index) => (<Fragment key={index}>{!!index && ', '}<a className="author-list__orcids_link" href={value}>{value.substring(value.lastIndexOf('/') + 1)}</a></Fragment>))}
          </div>
        )
      }
    </li>
  );
};

export const ArticleAndAuthorInformation = ({
  authors,
  license,
  publishedYear,
  versions,
}: { authors: Author[], versions: VersionHistoryItem[], license?: string, publishedYear?: number }) => (
  <section>
    <h1 id="article-and-author-information" className="article-and-author-information__title">Article and author information</h1>
    <ol className="author-list__authors">
      {authors.map((author, index) => <AuthorInformation author={author} key={index}/>)}
    </ol>
    { versions.length > 0 && <VersionHistory versions={versions} /> }
    { license && <Copyright license={license} publishedYear={publishedYear} authors={authors} /> }
  </section>
);
