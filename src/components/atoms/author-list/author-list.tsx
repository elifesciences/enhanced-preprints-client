import { Fragment } from 'react';
import { Author, AuthorNotesData } from '../../../types';
import { generateAuthorId } from '../../../utils/generators';
import './author-list.scss';

const AuthorInformation = ({ author, authorNotes }: { author: Author, authorNotes: AuthorNotesData }) => {
  const orcids = (author.identifiers ?? []).filter(({ type, propertyID }) => type === 'orcid' || (type === 'PropertyValue' && propertyID === 'https://registry.identifiers.org/registry/orcid'));
  const rids = author.meta?.notes?.filter(({ type }) => type === 'fn').map(({ rid }) => rid);
  const notes = rids?.map((rid) => {
    const note = authorNotes.find(({ id }) => id === rid);
    return note ? { text: note.text, label: note.label } : undefined;
  }).filter((note) => !!note);

  const labels = notes?.filter(({ label }) => !!label).map(({ label }, index) => <sup aria-hidden="true" key={index}>{label}</sup>);
  const email = author.emails && <><strong className="author-list__email--heading">For correspondence:</strong> {author.emails.join(', ')}</>;
  const footNotes = [
    ...(email ? [email] : []),
    ...(author.meta?.notes ?? []).filter((note) => note.type === 'corresp').map((note) => (
      authorNotes.filter((authorNote) => authorNote.type === 'corresp' && authorNote.id === note.rid).map((authorNote) => (
        <>{authorNote.text}</>
      ))
    )),
    ...(notes ?? []).map((note) => (
      <>{note.label && <sup aria-hidden="true">{note.label}</sup>}{note.text}</>
    )),
  ];

  return (
    <li className="author-list__author">
      <h4 id={generateAuthorId(author)} className="author-list__author_name">{author.type === 'Organization' ?
        author.name :
        `${(author.givenNames ?? []).join(' ')} ${(author.familyNames ?? []).join(' ')}${author.honorificSuffix ? ` ${author.honorificSuffix}` : ''}`}{labels}</h4>
      {
        author.affiliations && (
          <div className="author-list__affiliations">
            {author.affiliations.map(({ name, address }) => `${name}${address ? `, ${address.addressCountry}` : ''}`).join(', ')}
          </div>
        )
      }

      {
        orcids.length > 0 && (
          <div className="author-list__orcids">
            ORCID iD: {orcids.map(({ value }, index) => (<Fragment key={index}>{!!index && ', '}<a className="author-list__orcids_link" href={value}>{value.substring(value.lastIndexOf('/') + 1)}</a></Fragment>))}
          </div>
        )
      }

      { footNotes.length > 0 &&
        <ul className="author-list__footnotes_list">
          {footNotes.map((element, index) => <li className="author-list__footnote" key={index}>{element}</li>) }
        </ul>
      }
    </li>
  );
};

export const AuthorList = ({
  authors, authorNotes,
}: { authors: Author[], authorNotes: AuthorNotesData }) => (
  <>
    <h3 className="author-list__title">Author information</h3>
    <ol className="author-list">
      {authors.map((author, index) => <AuthorInformation author={author} authorNotes={authorNotes} key={index}/>)}
    </ol>
  </>
);
