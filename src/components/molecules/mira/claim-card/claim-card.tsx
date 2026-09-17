import {Fragment} from 'react';
import type {JSX} from 'react';

type ClaimCardProps = {
  questionNumber: string,
  claimNumber: string,
  title: string,
  related: Array<string>,
};

export const ClaimCard = (props: ClaimCardProps): JSX.Element => (
  <>
    <a href="#" draggable="false" className="card">
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
