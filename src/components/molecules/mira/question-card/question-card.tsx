import type {JSX} from 'react';
import './question-card.scss';
import { dmSans } from '../../../fonts/mira';
import { preventNavigationOnTextSelection } from '../prevent-navigation-on-text-selection';

type QuestionCardProps = {
  questionNumber: string,
  text: string,
  claimCount: string,
  questionPageHref: string,
};

export const QuestionCard = (props: QuestionCardProps): JSX.Element => (
  <>
    <a href={props.questionPageHref} draggable="false" onClick={preventNavigationOnTextSelection} className={`card ${dmSans.variable}`}>
      <header>Question {props.questionNumber}
        <span aria-hidden="true" className="dot">&nbsp;&#x2022;&nbsp;</span>
        <span className="visuallyhidden">comprises </span>{props.claimCount} claims<span className="visuallyhidden">.</span>
      </header>
      <p><span className="visuallyhidden">The question: </span>{props.text}</p>
    </a>
  </>
);
