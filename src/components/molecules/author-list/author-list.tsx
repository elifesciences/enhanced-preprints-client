import { Author } from '../../atoms/authors/authors';
import styles from './author-list.module.scss';

export const AuthorList = ({ authors }: { authors: Author[] }): JSX.Element => (
  <section id="author-list" className={styles['author-list']}>
    <h2 id="author-information" className={styles['author-list__title']}>Author information</h2>
    <ol className={styles['author-list__authors']}>
      { authors.map(({ givenNames, familyNames, affiliations }, index) => (
        <li key={index} className={styles['author-list__author']}>
          <h4 className={styles['author-list__author_name']}>{givenNames.join(' ')} {familyNames.join(' ')}</h4>
          {
            affiliations && (
              <span className={styles['author-list__affiliations']}>
                {affiliations.map(({ name, address }) => `${name}${address ? `, ${address.addressCountry}` : ''}`).join(', ')}
              </span>
            )
          }
        </li>
      ))}
    </ol>
  </section>
);
