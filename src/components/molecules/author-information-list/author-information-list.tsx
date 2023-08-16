import { Fragment, JSX } from 'react';
import { Author } from '../../../types';
import { createAuthorId } from '../../../utils/create-author-id';
import './author-information-list.scss';

const AuthorInformation = ({ author }: { author: Author }): JSX.Element => {
  const orcids = (author.identifiers ?? []).filter(({ type }) => type === 'orcid');

  return (
    <li className="author-list__author">
      <h4 id={createAuthorId(author)} className="author-list__author_name">{author.givenNames?.join(' ')} {author.familyNames?.join(' ')}</h4>
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

export const AuthorInformationList = ({ authors }: { authors: Author[] }): JSX.Element => (
  <section id="author-list" className="author-list">
    <h2 id="author-information" className="author-list__title">Author information</h2>
    <ol className="author-list__authors">
      {authors.map((author, index) => <AuthorInformation author={author} key={index}/>)}
    </ol>
  </section>
);
