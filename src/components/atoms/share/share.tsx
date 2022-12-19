import styles from './share.module.scss';

type Props = {
  modalTitle: string,
  emailUrl: string,
  facebookUrl: string,
  twitterUrl: string,
  linkedinUrl: string,
  redditUrl: string,
};

export const Share = ({
  emailUrl, twitterUrl, facebookUrl, linkedinUrl, redditUrl,
}: Props): JSX.Element => (
  <div className={styles['share-container']}>
    <div className={styles['form-item']}>
        <input type="url" id="burger" className={`${styles['text-field']} ${styles['text-field--url']}`} value="https://doi.org/10.7554/eLife.09560" />
        <button className={`${styles.button} ${styles['button--default']}`}>copy to clipboard</button>
    </div>
    <ul className={styles['social-media-sharers']}>
      <li>
        <a className={`${styles['social-media-sharer']} ${styles.email}`} href={ emailUrl } target="_blank" rel="noopener noreferrer" aria-label="Share by Email">
          email
        </a>
      </li>
      <li>
        <a className={`${styles['social-media-sharer']} ${styles.twitter}`} href={twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Share by Twitter">
          email
        </a>
      </li>
      <li>
        <a className={`${styles['social-media-sharer']} ${styles.facebook}`} href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Share by Facebook">
          email
        </a>
      </li>
      <li>
        <a className={`${styles['social-media-sharer']} ${styles.linkedin}`} href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="Share by LinkedIn">
          email
        </a>
      </li>
      <li>
        <a className={`${styles['social-media-sharer']} ${styles.reddit}`} href={redditUrl} target="_blank" rel="noopener noreferrer" aria-label="Share by Reddit">
          email
        </a>
      </li>
    </ul>
  </div>
);
