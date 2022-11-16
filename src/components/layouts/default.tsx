import { SiteHeader } from '../molecules/site-header/site-header';
import { SiteFooter } from '../molecules/site-footer/site-footer';
import styles from './default.module.scss';

export const DefaultLayout = ({ children }: any): JSX.Element => (
  <>
    <div className={`${styles['grid-container']} ${styles['article-page']}`}>
      <div className={styles['grid-header']}>
        <SiteHeader />
      </div>
        {children}
    </div>
    <SiteFooter/>
  </>

);
