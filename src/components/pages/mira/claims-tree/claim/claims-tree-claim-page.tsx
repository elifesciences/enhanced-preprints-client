import pluralize from 'pluralize';
import { type JSX } from 'react';
import './claims-tree-claim-page.scss';
import { dmSans, poppins } from '../../../../fonts/mira';
import { ClaimsTreeHeader } from '../../../../molecules/mira/claims-tree-header/claims-tree-header';
import { ClaimsTreeSection } from '../../../../molecules/mira/claims-tree-section/claims-tree-section';
import { RelatedFigure, type RelatedFigureProps } from '../../../../molecules/mira/related-figure/related-figure';
import { RelatedStudy, type RelatedStudyProps } from '../../../../molecules/mira/related-study/related-study';
import '../common.scss';

type Section = {
  heading: string,
  title: string,
  summary: string,
  attribution: string,
  quote: string,
};

type ClaimsTreeClaimPageProps = {
  id: string,
  questionNumber: string,
  claim: Section,
  evidence: Section,
  relatedStudies: Array<RelatedStudyProps & { id: string }>,
  relatedFigure?: RelatedFigureProps,
};

export const ClaimsTreeClaimPage = (props: ClaimsTreeClaimPageProps): JSX.Element => (
  <div className={`claims-tree-claim-page ${dmSans.variable} ${poppins.variable}`}>
    <ClaimsTreeHeader
      title={`Claim ${props.id}`}
      titleSupplementary={`(question ${props.questionNumber})`}
      backLink={{ label: `Question ${props.questionNumber}`, href: `/mira/claims-tree/question/${props.questionNumber}` }}
      navigation={{ previousDisabled: props.id === '1' }}
      relatedItems={[
        ...(props.relatedFigure ? ['Figure'] : []),
        `Study ${props.relatedStudies.map(({ id }) => id).join(' & ')}`,
      ]}
    />
    <div className="claims-tree-pages-content">
      <ClaimsTreeSection {...props.claim} />
      <ClaimsTreeSection {...props.evidence} />
      <section className="related-studies">
        <h2 className="label">Related {pluralize('study', props.relatedStudies.length)}:</h2>
        {props.relatedStudies.map((relatedStudy) => (
          <RelatedStudy key={relatedStudy.id} {...relatedStudy} />
        ))}
      </section>
      {props.relatedFigure && <RelatedFigure {...props.relatedFigure} />}
    </div>
  </div>
);
