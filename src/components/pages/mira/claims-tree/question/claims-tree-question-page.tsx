import { type JSX } from 'react';
import '../common.scss';
import './claims-tree-question-page.scss';
import { dmSans, poppins } from '../../../../fonts/mira';
import { ClaimCard } from '../../../../molecules/mira/claim-card/claim-card';
import { ClaimsTreeHeader } from '../../../../molecules/mira/claims-tree-header/claims-tree-header';
import { ClaimsTreeSection } from '../../../../molecules/mira/claims-tree-section/claims-tree-section';

type Claim = {
  id: string,
  questionNumber: string,
  title: string,
  related: Array<string>,
};

type ClaimsTreeQuestionPageProps = {
  questionNumber: string,
  heading: string,
  title: string,
  summary: string,
  attribution: string,
  quote: string,
  claims: Array<Claim>
};

export const ClaimsTreeQuestionPage = (props: ClaimsTreeQuestionPageProps): JSX.Element => (
  <div className={`${dmSans.variable} ${poppins.variable}`}>
    <ClaimsTreeHeader
      title={`Question ${props.questionNumber}`}
      backLinkLabel="Claims tree"
      navigation={{ previousDisabled: props.questionNumber === '1' }}
    />
    <div className="claims-tree-pages-content">
      <ClaimsTreeSection
        heading={props.heading}
        title={props.title}
        summary={props.summary}
        attribution={props.attribution}
        quote={props.quote}
      />
      <section className="claims">
        <h2>Related claims ({props.claims.length})</h2>
        {props.claims.map((claim) => (
          <div className="claim" key={claim.id}>
            <ClaimCard
              questionNumber={claim.questionNumber}
              claimNumber={claim.id}
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
  </div>
);
