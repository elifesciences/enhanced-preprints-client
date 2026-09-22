import { DM_Sans } from 'next/font/google';
import type {JSX} from 'react';
import './question-card.scss';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-dm-sans',
});

type QuestionCardProps = {
  questionNumber: string,
  text: string,
  claimCount: string
};

export const QuestionCard = (props: QuestionCardProps): JSX.Element => (
  <>
    <a href="#" draggable="false" className={`card ${dmSans.variable}`}>
      <header>Question {props.questionNumber}
        <span aria-hidden="true" className="dot">&nbsp;&#x2022;&nbsp;</span>
        <span className="visuallyhidden">comprises </span>{props.claimCount} claims<span className="visuallyhidden">.</span>
      </header>
      <p><span className="visuallyhidden">The question: </span>{props.text}</p>
    </a>
  </>
);
