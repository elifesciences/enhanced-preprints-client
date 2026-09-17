import { DM_Sans, Poppins } from 'next/font/google';
import { type JSX } from 'react';
import './claims-tree-page.scss';
import { ClaimCard } from '../../../molecules/mira/claim-card/claim-card';
import {QuestionCard} from '../../../molecules/mira/question-card/question-card';

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

type Claim = {
  id: string,
  questionNumber: string,
  title: string,
  related: Array<string>,
};

type Question = {
  questionNumber: string,
  text: string,
  claims: Array<Claim>,
};

type ClaimsTreePageProps = {
  questions: Array<Question>,
};

export const ClaimsTreePage = (props: ClaimsTreePageProps): JSX.Element => {
  let claimNumber = 0;

  return (
    <>
      <main className={`page-wrapper ${dmSans.variable} ${poppins.variable}`}>
        <a href="#" className="close">
          <span className="visuallyhidden">Navigate away from this page.</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="2"></path></svg>
        </a>
        <div className="claims-tree-content">
          <h1>Claims tree</h1>
          <div className="visuallyhidden">There are {props.questions.length} questions</div>
          <ul role="list">

            {props.questions.map((question) => (
              <li role="listitem" key={question.questionNumber}>
                <QuestionCard
                  questionNumber={question.questionNumber}
                  text={question.text}
                  claimCount={question.claims.length.toString()}
                ></QuestionCard>
                <section className="claims">

                  <header className="visuallyhidden">There are {question.claims.length} claims for this question:</header>

                  {question.claims.map((claim) => {
                    claimNumber += 1;

                    return (
                      <div className="claim-row" key={claim.id}>
                        <ClaimCard
                          questionNumber={question.questionNumber}
                          claimNumber={claimNumber.toString()}
                          title={claim.title}
                          related={claim.related}>
                        </ClaimCard>
                      </div>
                    );
                  })}
                </section>
              </li>
            ))}
          </ul>
        </div>
      </main>

    </>
  );
};
