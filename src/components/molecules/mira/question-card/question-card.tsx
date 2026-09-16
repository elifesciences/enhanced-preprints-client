import type {JSX} from 'react';

type QuestionCardProps = {
  questionNumber: string,
  text: string,
  claimCount: string
};

export const QuestionCard = (props: QuestionCardProps): JSX.Element => (
  <>
    <a href="#" draggable="false" className="card">
      <header>Question {props.questionNumber}
        <span aria-hidden="true" className="dot">&nbsp;&#x2022;&nbsp;</span>
        <span className="visuallyhidden">comprises </span>{props.claimCount} claims<span className="visuallyhidden">.</span>
      </header>
      <p><span className="visuallyhidden">The question: </span>{props.text}</p>
    </a>
  </>
);
