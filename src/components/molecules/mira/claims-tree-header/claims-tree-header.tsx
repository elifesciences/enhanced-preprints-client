import { type JSX } from 'react';
import './claims-tree-header.scss';

type ClaimsTreeHeaderProps = {
  title: string,
  titleSupplementary?: string,
  backLink?: {
    label: string,
    href: string,
  },
  navigation?: {
    previousHref?: string,
    nextHref?: string,
  },
  relatedItems?: Array<string>,
};

const NavigationLink = ({ label, href, iconPath }: { label: string, href?: string, iconPath: string }): JSX.Element => (
  <a href={href} className="navigation-link" aria-disabled={href ? undefined : true}>
    <span className="visuallyhidden">{label}</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={iconPath} stroke="currentColor" strokeWidth="2"></path></svg>
  </a>
);

export const ClaimsTreeHeader = (props: ClaimsTreeHeaderProps): JSX.Element => (
  <header className="claims-tree-header">
    {(props.backLink || props.navigation) && (
      <div className="header-actions">
        {props.backLink && (
          <a href={props.backLink.href} className="back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="2"></path></svg>{props.backLink.label}
          </a>
        )}
        {props.navigation && (
          <>
            <NavigationLink label="Previous" href={props.navigation.previousHref} iconPath="M12 20V5M5 11L12 4L19 11" />
            <NavigationLink label="Next" href={props.navigation.nextHref} iconPath="M12 4V19M5 13L12 20L19 13" />
          </>
        )}
      </div>
    )}
    <a href="#" className="close">
      <span className="visuallyhidden">Navigate away from this page.</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="2"></path></svg>
    </a>
    <h1 className={props.relatedItems ? 'with-related-items' : undefined}>
      {props.title}{props.titleSupplementary && <> <span className="supplementary">{props.titleSupplementary}</span></>}
    </h1>
    {props.relatedItems && (
      <div className="header-related-items">
        <span className="visuallyhidden">The following is related to this claim: </span>
        {props.relatedItems.map((relatedItem) => (
          <span className="header-related-item" key={relatedItem}>{relatedItem}</span>
        ))}
      </div>
    )}
  </header>
);
