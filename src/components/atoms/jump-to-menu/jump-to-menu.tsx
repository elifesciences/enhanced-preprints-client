import { useEffect, useState } from 'react';
import { Content } from '../../../types';
import { contentToJsx } from '../../../utils/content-to-jsx';
import './jump-to-menu.scss';
import { throttle } from '../../../utils/throttle';

export type Heading = {
  id: string,
  text: Content,
};

export const JumpToMenu = ({ headings }: { headings: Heading[] }) => {
  const [active, setActive] = useState(0);
  const [jumping, setJumping] = useState(false);

  const linkClickHandler = (index: number) => {
    setJumping(true);
    setActive(index);
    setTimeout(() => {
      setJumping(false);
    }, 1000);
  };

  const filteredHeadings = headings.filter((heading) => !!heading.id);

  useEffect(() => {
    const headingElements = filteredHeadings
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const handleScroll = () => {
      if (!jumping) {
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
      }
    };

    const throttledScrollHandler = () => throttle(handleScroll, 250);
    document.addEventListener('scroll', throttledScrollHandler);

    return () => document.removeEventListener('scroll', throttledScrollHandler);
  }, [jumping]);

  return (
    <div className="jump-menu">
      <nav className="jump-menu-navigation">
        <ul className="jump-menu-list">
          {
            filteredHeadings.map((heading, index) => (
              <li className={`jump-menu-list__item${active === index ? ' jump-menu-list__item--active' : ''}`} key={index}>
                <a onClick={() => linkClickHandler(index)} className="jump-menu-list__link" href={`#${heading.id}`}>{contentToJsx(heading.text)}</a>
              </li>
            ))
          }
        </ul>
      </nav>
    </div>
  );
};
