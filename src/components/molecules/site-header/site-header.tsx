import Image from 'next/image';
import styles from './site-header.module.scss';

export const SiteHeader = (): JSX.Element => (
  <div className="site-header">
    <Image
      className={styles['site-header__logo']}
      src="/elife-logo.svg"
        alt="eLife logo"
        width="80"
        height="30"
      />
  </div>
);
