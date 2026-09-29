import { type JSX } from 'react';
import '../common.scss';
import './claims-tree-question-page.scss';
import { dmSans, poppins } from '../../../../fonts/mira';
import { ClaimCard } from '../../../../molecules/mira/claim-card/claim-card';
import { ClaimsTreeSection } from '../../../../molecules/mira/claims-tree-section/claims-tree-section';

type Claim = {
  id: string,
  questionNumber: string,
  title: string,
  related: Array<string>,
};

type ClaimsTreeQuestionPageProps = {
  heading: string,
  title: string,
  summary: string,
  attribution: string,
  quote: string,
  claims: Array<Claim>
};

export const ClaimsTreeQuestionPage = (props: ClaimsTreeQuestionPageProps): JSX.Element => (
  <>
    <a href="#" className="close">
      <span className="visuallyhidden">Navigate away from this page.</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="2"></path></svg>
    </a>
    <div className={`claims-tree-pages-content ${dmSans.variable} ${poppins.variable}`}>
      <h1>Question 1</h1>
      <ClaimsTreeSection
        heading={props.heading}
        title={props.title}
        summary={props.summary}
        attribution={props.attribution}
        quote={props.quote}
      />
      <section className="claims">
        <h2>Related claims ({props.claims.length})</h2>
        {props.claims.map((claim, index) => (
          <div className="claim" key={claim.id}>
            <ClaimCard
              questionNumber={claim.questionNumber}
              claimNumber={(index + 1).toString()}
              title={claim.title}
              related={claim.related}>
            </ClaimCard>
          </div>
        ))}
      </section>
      <section>
        <h2>Other research exploring this question:</h2>
        <article className="supplementary-card">
          <header>Distinct representational properties of cues and contexts shape fear and reversal learning</header>
          <p>Antoine Bouyeure, Daniel Pacheco-Estefan, George Jacob, Malte Kobelt, Marie-Christin Fellner, Jonas Rose, Nikolai Axmacher</p>
        </article>
      </section>
    </div>
  </>
);
