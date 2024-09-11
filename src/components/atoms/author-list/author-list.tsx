import { Fragment } from 'react';
import { Author, AuthorNotes } from '../../../types';
import { generateAuthorId } from '../../../utils/generators';
import './author-list.scss';

const AuthorInformation = ({ author, authorNotes }: { author: Author, authorNotes: AuthorNotes }) => {
  const orcids = (author.identifiers ?? []).filter(({ type, propertyID }) => type === 'orcid' || (type === 'PropertyValue' && propertyID === 'https://registry.identifiers.org/registry/orcid'));

  return (
    <li className="author-list__author">
      <h4 id={generateAuthorId(author)} className="author-list__author_name">{author.type === 'Organization' ?
        author.name :
        `${(author.givenNames ?? []).join(' ')} ${(author.familyNames ?? []).join(' ')}${author.honorificSuffix ? ` ${author.honorificSuffix}` : ''}`}</h4>
      {
        author.affiliations && (
          <div className="author-list__affiliations">
            {author.affiliations.map(({ name, address }) => `${name}${address ? `, ${address.addressCountry}` : ''}`).join(', ')}
          </div>
        )
      }

      {author.emails ? <div className="author-list__email"><h5 className="author-list__email--heading">For correspondence:</h5> <span className="author-list__email">{author.emails.join(', ')}</span></div> : '' }

      {author.meta?.notes.filter((note) => note.type === 'corresp').map((note, index) => (
        authorNotes.filter((authorNote) => authorNote.type === 'corresp' && authorNote.id === note.rid).map((authorNote) => (
          <div className="author-list__corresp" key={index}>{authorNote.text}</div>
        ))
      ))}

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

export const AuthorList = ({
  authors, authorNotes,
}: { authors: Author[], authorNotes: AuthorNotes }) => (
  <ol className="author-list">
    {authors.map((author, index) => <AuthorInformation author={author} authorNotes={authorNotes} key={index}/>)}
  </ol>
);
