import Image from 'next/image';
import styles from './site-header.module.scss';
import logo from '../../../../public/elife-logo.svg';

export const SiteHeader = (): JSX.Element => (
  <div className="site-header">
    <Image
      className={styles['site-header__logo']}
        src={logo}
        alt="eLife logo"
        width="80"
        height="30"
      />
  </div>
);
