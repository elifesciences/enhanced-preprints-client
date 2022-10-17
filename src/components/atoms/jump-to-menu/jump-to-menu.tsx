import {useState} from 'react';
import { Content } from '../../../types/content';
import { contentToJsx } from '../../../utils/content-to-jsx';
import styles from './jump-to-menu.module.scss';

export type Heading = {
  id: string,
  text: Content,
};

export const JumpToMenu = ({ headings }: { headings: Heading[] }): JSX.Element => {
  const [active, setActive] = useState(0);
  return ( <div className={styles['jump-menu']}>
    <nav className={styles['jump-menu-navigation']}>
      <ul className={styles['jump-menu-list']}>
        {
          headings.map((heading, index) => (
            <li onClick={() => setActive(index)} className={`${styles['jump-menu-list__item']} ${active === index ? ` ${styles['jump-menu-list__item--active']}` : ''}`} key={index}>
              <a className={styles['jump-menu-list__link']} href={`#${heading.id}`}>{contentToJsx(heading.text)}</a>
            </li>
          ))
        }
      </ul>
    </nav>
  </div>
 );
};

