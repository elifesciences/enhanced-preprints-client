import { useEffect, useState } from 'react';
import { Content } from '../../../types/content';
import { contentToJsx } from '../../../utils/content-to-jsx';
import styles from './jump-to-menu.module.scss';
import { throttle } from '../../../utils/throttle';

export type Heading = {
  id: string,
  text: Content,
};

export const JumpToMenu = ({ headings }: { headings: Heading[] }): JSX.Element => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const headingElements = headings
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const handleScroll = () => {
      const { scrollY } = window;

      for (let i = 0; i < headingElements.length; i += 1) {
        const current = headingElements[i];
        const next = headingElements[i + 1];
        const sectionTop = current.offsetTop - 120;

        if (
          (scrollY > sectionTop || i === 0)
          && (next === undefined || scrollY <= next.offsetTop - 50)
        ) {
          setActive(i);
        }
      }
    };

    const throttledScrollHandler = () => throttle(handleScroll, 250);
    document.addEventListener('scroll', throttledScrollHandler);

    return () => document.removeEventListener('scroll', throttledScrollHandler);
  }, []);

  return (
    <div className={styles['jump-menu']}>
      <nav className={styles['jump-menu-navigation']}>
        <ul className={styles['jump-menu-list']}>
          {
            headings.map((heading, index) => (
              <li className={`${styles['jump-menu-list__item']} ${active === index ? ` ${styles['jump-menu-list__item--active']}` : ''}`} key={index}>
                <a onClick={() => setActive(index)} className={styles['jump-menu-list__link']} href={`#${heading.id}`}>{contentToJsx(heading.text)}</a>
              </li>
            ))
          }
        </ul>
      </nav>
    </div>
  );
};

