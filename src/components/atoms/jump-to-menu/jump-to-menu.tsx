import { Content } from '../../../types/content';
import { contentToJsx } from '../../../utils/content-to-jsx';

import './jump-to-menu.scss';

export type Heading = {
  id: string,
  text: Content,
};

export const JumpToMenu = ({ headings, active }: { headings: Heading[], active: number }): JSX.Element => (
  <nav className="jump-menu-container">
    <ul className="jump-menu-list">
      {
        headings.map((heading, index) => (
          <li className={`jump-menu-list__item ${active === index ? ' jump-menu-list__item--active' : ''}`} key={index}>
            <a className="jump-menu-list__link" href={`#${heading.id}`}>{contentToJsx(heading.text)}</a>
          </li>
        ))
      }
    </ul>
  </nav>
);
