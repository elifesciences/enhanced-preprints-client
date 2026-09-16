import type {JSX} from 'react';

export type ClaimCardProps = {
  questionNumber: string,
  header: string,
  title: string,
  related: Array<string>,
};

export const ClaimCard = (props: ClaimCardProps): JSX.Element => (
  <>
    <a href="#" draggable="false" className="card">
      <article>
        <header>Claim {props.header} <span className="supplementary">(question&nbsp;{props.questionNumber})</span></header>
        <p>{props.title}</p>
        <div className="related">
          <span className="visuallyhidden">The following is related to this claim: </span>
          <span className="related-item">
            <span>{props.related[0]}</span>
          </span>
          <span className="visuallyhidden">, </span>
          <span className="related-item">
            <span>{props.related[1]}</span>
          </span>
        </div>
      </article>
    </a>
  </>
);
