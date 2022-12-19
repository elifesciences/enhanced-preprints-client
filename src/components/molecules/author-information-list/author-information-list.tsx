import './author-information-list.scss';
import { Author } from '../../../types';

const AuthorInformation = ({ author }: { author: Author }): JSX.Element => (
  <li className="author-list__author">
    <h4 className="author-list__author_name">{author.givenNames.join(' ')} {author.familyNames.join(' ')}</h4>
    {
      author.affiliations && (
        <span className="author-list__affiliations">
          {author.affiliations.map(({ name, address }) => `${name}${address ? `, ${address.addressCountry}` : ''}`).join(', ')}
        </span>
      )
    }
  </li>
);

export const AuthorInformationList = ({ authors }: { authors: Author[] }): JSX.Element => (
  <section id="author-list" className="author-list">
    <h2 id="author-information" className="author-list__title">Author information</h2>
    <ol className="author-list__authors">
      {authors.map((author, index) => <AuthorInformation author={author} key={index}/>)}
    </ol>
  </section>
);
