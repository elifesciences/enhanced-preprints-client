import pluralize from 'pluralize';
import { type JSX } from 'react';
import '../common.scss';
import './claims-tree-page.scss';
import { dmSans, poppins } from '../../../../fonts/mira';
import { ClaimCard } from '../../../../molecules/mira/claim-card/claim-card';
import { ClaimsTreeHeader } from '../../../../molecules/mira/claims-tree-header/claims-tree-header';
import { QuestionCard } from '../../../../molecules/mira/question-card/question-card';

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
    <div className={`claims-tree-pages-content ${dmSans.variable} ${poppins.variable}`}>
      <ClaimsTreeHeader title="Claims tree" />
      <div className="visuallyhidden">There {props.questions.length > 1 ? 'are' : 'is'} {props.questions.length} {pluralize('question', props.questions.length)}</div>
      <ul role="list">

        {props.questions.map((question) => (
          <li role="listitem" key={question.questionNumber}>
            <QuestionCard
              questionNumber={question.questionNumber}
              text={question.text}
              claimCount={question.claims.length.toString()}
            ></QuestionCard>
            <section className="claims">

              <header className="visuallyhidden">There {question.claims.length > 1 ? 'are' : 'is'} {question.claims.length} {pluralize('claim', question.claims.length)} for this question:</header>

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
  );
};
