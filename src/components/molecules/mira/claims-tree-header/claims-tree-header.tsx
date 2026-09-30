import { type JSX } from 'react';
import './claims-tree-header.scss';

type ClaimsTreeHeaderProps = {
  title: string,
  backLinkLabel?: string,
  navigation?: {
    previousDisabled?: boolean,
    nextDisabled?: boolean,
  },
};

const NavigationLink = ({ label, disabled, iconPath }: { label: string, disabled?: boolean, iconPath: string }): JSX.Element => (
  <a href={disabled ? undefined : '#'} className="navigation-link" aria-disabled={disabled}>
    <span className="visuallyhidden">{label}</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={iconPath} stroke="currentColor" strokeWidth="2"></path></svg>
  </a>
);

export const ClaimsTreeHeader = (props: ClaimsTreeHeaderProps): JSX.Element => (
  <>
    {(props.backLinkLabel || props.navigation) && (
      <div className="header-actions">
        {props.backLinkLabel && (
          <a href="#" className="back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="2"></path></svg>{props.backLinkLabel}
          </a>
        )}
        {props.navigation && (
          <>
            <NavigationLink label="Previous" disabled={props.navigation.previousDisabled} iconPath="M12 20V5M5 11L12 4L19 11" />
            <NavigationLink label="Next" disabled={props.navigation.nextDisabled} iconPath="M12 4V19M5 13L12 20L19 13" />
          </>
        )}
      </div>
    )}
    <a href="#" className="close">
      <span className="visuallyhidden">Navigate away from this page.</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="2"></path></svg>
    </a>
    <h1>{props.title}</h1>
  </>
);
