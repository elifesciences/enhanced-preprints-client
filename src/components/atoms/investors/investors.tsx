import Image from 'next/image';
import styles from './investors.module.scss';
import hhmi from '../../../images/investors/hhmi.svg';
import wellcome from '../../../images/investors/wellcome.svg';
import max from '../../../images/investors/max.svg';
import kaw from '../../../images/investors/kaw.svg';

export const Investors = (): JSX.Element => (
  <ol className={styles['investor-logos']} role="list" aria-label="eLife is funded by these organisations">
    <li className={styles['investor-logos__item']} role="listitem">
      <div className={styles['investor-logos__container']}>
        <Image
          className={styles['investor-logos__img']}
          src={hhmi}
          alt="Howard Hughes Medical Institute"
        />
      </div>
    </li>
    <li className={styles['investor-logos__item']} role="listitem">
      <div className={styles['investor-logos__container']}>
        <Image
          className={styles['investor-logos__img']}
          src={wellcome}
          alt="Wellcome Trust"
        />
      </div>
    </li>
    <li className={styles['investor-logos__item']} role="listitem">
      <div className={styles['investor-logos__container']}>
        <Image
          className={styles['investor-logos__img']}
          src={max}
          alt="Max-Planck-Gesellschaft"
        />
      </div>
    </li>
    <li className={styles['investor-logos__item']} role="listitem">
      <div className={styles['investor-logos__container']}>
        <Image
          className={styles['investor-logos__img']}
          src={kaw}
          alt="Knut and Alice Wallenberg Foundation"
        />
      </div>
    </li>
  </ol>
);
