import styles from './sign-up.module.scss';
import { Button } from '../../atoms/button/button';

export const SignUp = (): JSX.Element => (
  <section className={styles['email-cta']}>
    <div className={styles['email-cta__container']}>
      <header className={styles['email-cta__header']}>
        <h2 className={styles['email-cta__header_text']}>Be the first to read new articles from eLife</h2>
      </header>

      <Button iconName={'default'} text={'Sign up for email alerts'} url={'/content-alerts'} />

      <div className={styles['email-cta__privacy']}>
        <a className={styles['email-cta__privacy_link']} href="/privacy">Privacy notice</a>
      </div>
    </div>
  </section>
);
