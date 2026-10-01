import {Fragment} from 'react';
import type {JSX} from 'react';
import './claim-card.scss';
import { dmSans } from '../../../fonts/mira';
import { preventNavigationOnTextSelection } from '../prevent-navigation-on-text-selection';

type ClaimCardProps = {
  questionNumber: string,
  claimNumber: string,
  title: string,
  related: Array<string>,
  claimPageHref: string,
};

export const ClaimCard = (props: ClaimCardProps): JSX.Element => (
  <>
    <a href={props.claimPageHref} draggable="false" onClick={preventNavigationOnTextSelection} className={`claim-card ${dmSans.variable}`}>
      <article>
        <header>Claim {props.claimNumber} <span className="supplementary">(question&nbsp;{props.questionNumber})</span></header>
        <p>{props.title}</p>
        <div className="related">
          <span className="visuallyhidden">The following is related to this claim: </span>
          {props.related.map((relatedItem, index) => (
            <Fragment key={relatedItem}>
              <span className="related-item">
                <span>{relatedItem}</span>
              </span>
              {index < props.related.length - 1 && <span className="visuallyhidden">, </span>}
            </Fragment>
          ))}
        </div>
      </article>
    </a>
  </>
);
