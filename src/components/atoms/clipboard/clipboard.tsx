import styles from './clipboard.module.scss';

export const Clipboard = (): JSX.Element => (
  <div className={styles['clipboard-container']}>
    <div className={styles['form-item']}>
        <input type="url" className={`${styles['text-field']} ${styles['text-field--url']}`} value="https://doi.org/10.7554/eLife.09560" />
        <button className={`${styles.button} ${styles['button--default']}`}>copy to clipboard</button>
    </div>
  </div>
);
