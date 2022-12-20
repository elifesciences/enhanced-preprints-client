import styles from './socials.module.scss';

type Props = {
  emailUrl: string,
  facebookUrl: string,
  twitterUrl: string,
  linkedinUrl: string,
  redditUrl: string,
};

export const Socials = ({
  emailUrl, twitterUrl, facebookUrl, linkedinUrl, redditUrl,
}: Props): JSX.Element => (
  <div className={styles['socials-container']}>
    <ul className={styles['socials-sharers']}>
      <li>
        <a className={`${styles['socials-sharer']} ${styles.email}`} href={ emailUrl } target="_blank" rel="noopener noreferrer" aria-label="Share by Email">
          email
        </a>
      </li>
      <li>
        <a className={`${styles['socials-sharer']} ${styles.twitter}`} href={twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Share by Twitter">
          email
        </a>
      </li>
      <li>
        <a className={`${styles['socials-sharer']} ${styles.facebook}`} href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Share by Facebook">
          email
        </a>
      </li>
      <li>
        <a className={`${styles['socials-sharer']} ${styles.linkedin}`} href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="Share by LinkedIn">
          email
        </a>
      </li>
      <li>
        <a className={`${styles['socials-sharer']} ${styles.reddit}`} href={redditUrl} target="_blank" rel="noopener noreferrer" aria-label="Share by Reddit">
          email
        </a>
      </li>
    </ul>
  </div>
);
