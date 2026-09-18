import { DM_Sans, Poppins } from 'next/font/google';
import { type JSX } from 'react';
import './common.scss';
import './claims-tree-question-page.scss';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-dm-sans',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600'],
  display: 'swap',
  variable: '--font-poppins',
});

export const ClaimsTreeQuestionPage = (): JSX.Element => (
  <>
    <main className={`page-wrapper ${dmSans.variable} ${poppins.variable}`}>
      <h1>Question 1</h1>
      <div className="card">
        <header>Question 1
          <span aria-hidden="true" className="dot">&nbsp;&#x2022;&nbsp;</span>
          <span className="visuallyhidden">comprises </span>3 claims<span className="visuallyhidden">.</span>
        </header>
        <p><span className="visuallyhidden">The question: </span>What are the neural mechanisms of interpersonal guilt and responsibility during social decisions under risk?</p>
      </div>
    </main>

  </>
);
