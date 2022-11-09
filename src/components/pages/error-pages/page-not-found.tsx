import Image from 'next/image';
import styles from './page-not-found.module.scss';
import MissingImage from '../../../images/errors/404.svg';
import { Button } from '../../atoms/button/button';

export const PageNotFound = (): JSX.Element => (
  <main className={styles['full-width-section']}>
    <div className={styles['error-wrapper']}>
      <div className={styles.error}>
        <Image src={MissingImage} width="64" height="157" alt="Oops" className={styles.error__icon} />
        <h1 className={styles.error__title}>Oops!</h1>
        <p>The page you were looking for is not found.</p>
        <Button iconName={'default'} text={'Back to homepage'} url={'/'} />
      </div>
    </div>
  </main>
);
