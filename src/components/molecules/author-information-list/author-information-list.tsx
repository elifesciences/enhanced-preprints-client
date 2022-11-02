import styles from './author-list.module.scss';
import { Author } from '../../../types';

const AuthorInformation = ({ author }: { author: Author }): JSX.Element => (
  <li className={styles['author-list__author']}>
    <h4 className={styles['author-list__author_name']}>{author.givenNames.join(' ')} {author.familyNames.join(' ')}</h4>
    {
      author.affiliations && (
        <span className={styles['author-list__affiliations']}>
          {author.affiliations.map(({ name, address }) => `${name}${address ? `, ${address.addressCountry}` : ''}`).join(', ')}
        </span>
      )
    }
  </li>
);

export const AuthorInformationList = ({ authors }: { authors: Author[] }): JSX.Element => (
  <section id="author-list" className={styles['author-list']}>
    <h2 id="author-information" className={styles['author-list__title']}>Author information</h2>
    <ol className={styles['author-list__authors']}>
      {authors.map((author, index) => <AuthorInformation author={author} key={index}/>)}
    </ol>
  </section>
);
