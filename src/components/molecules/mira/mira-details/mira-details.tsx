import type {JSX} from 'react';
import './mira-details.scss';
import { dmSans } from '../../../fonts/mira';
import { preventNavigationOnTextSelection } from '../prevent-navigation-on-text-selection';

export const MiraDetails = (): JSX.Element => (
  <a href="/mira/claims-tree" draggable="false" onClick={preventNavigationOnTextSelection} className={`mira-details ${dmSans.variable}`}>
    <span className="visuallyhidden">Explore the claims tree: </span>
    <ul>
      <li>
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"></path>
        </svg>
        24 claims with evidence
      </li>
      <li>
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M19.8 18.4L14 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.49.66-.02 1.6.8 1.6h14c.82 0 1.29-.94.8-1.6z"></path>
        </svg>
        10 questions researched
      </li>
      <li>
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          {/* eslint-disable-next-line @stylistic/max-len */}
          <path fill="currentColor" d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path>
        </svg>
        2 studies
      </li>
    </ul>
  </a>
);
