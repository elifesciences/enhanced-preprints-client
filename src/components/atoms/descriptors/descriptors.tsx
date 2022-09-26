import styles from './descriptors.module.scss';

export const Descriptors = ({ doi }: { doi:string }): JSX.Element => (
  <div className={styles.descriptors}>
    <ul className={styles.descriptors__identifiers}>
      <li className={styles.descriptors__identifier}>
        <a href={`https://doi.org/${doi}`}>https://doi.org/{doi}</a>
      </li>
    </ul>
    <ul className={styles.descriptors__icons}>
      <li>
        <a href="https://en.wikipedia.org/wiki/Open_access" className={`${styles.descriptors__icon} ${styles['descriptors__icon--oa']}`}>
          <span className={styles.visuallyhidden}>Open access</span>
        </a>
      </li>
      <li>
        <a href="https://creativecommons.org/licenses/by/4.0/" className={`${styles.descriptors__icon} ${styles['descriptors__icon--cc']}`}>
          <span className={styles.visuallyhidden}>Copyright information</span>
        </a>
      </li>
    </ul>
  </div>
);
