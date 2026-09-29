import { type JSX } from 'react';
import './claims-tree-header.scss';

type ClaimsTreeHeaderProps = {
  title: string,
};

export const ClaimsTreeHeader = (props: ClaimsTreeHeaderProps): JSX.Element => (
  <>
    <a href="#" className="close">
      <span className="visuallyhidden">Navigate away from this page.</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="2"></path></svg>
    </a>
    <h1>{props.title}</h1>
  </>
);
