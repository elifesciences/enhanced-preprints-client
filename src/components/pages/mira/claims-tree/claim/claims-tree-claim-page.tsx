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
  summary?: string,
  attribution?: string,
  quote?: string,
};

type ClaimsTreeClaimPageProps = {
  id: string,
  questionNumber: string,
  claim: Section,
  evidence?: Array<Section & { id: string }>,
  relatedStudies?: Array<RelatedStudyProps & { id: string }>,
  relatedFigures?: Array<RelatedFigureProps>,
  previousClaimId?: string,
  nextClaimId?: string,
};

export const ClaimsTreeClaimPage = (props: ClaimsTreeClaimPageProps): JSX.Element => (
  <div className={`claims-tree-claim-page ${dmSans.variable} ${poppins.variable}`}>
    <ClaimsTreeHeader
      title={`Claim ${props.id}`}
      titleSupplementary={`(question ${props.questionNumber})`}
      backLink={{ label: `Question ${props.questionNumber}`, href: `/mira/claims-tree/question/${props.questionNumber}` }}
      navigation={{
        type: 'claim',
        previousHref: props.previousClaimId && `/mira/claims-tree/claim/${props.previousClaimId}`,
        nextHref: props.nextClaimId && `/mira/claims-tree/claim/${props.nextClaimId}`,
      }}
      relatedItems={[
        ...(props.relatedFigures?.length ? ['Figure'] : []),
        ...(props.relatedStudies?.length ? [`Study ${props.relatedStudies.map(({ id }) => id).join(' & ')}`] : []),
      ]}
    />
    <div className="claims-tree-pages-content">
      <ClaimsTreeSection {...props.claim} />
      {props.evidence?.map((evidence) => (
        <ClaimsTreeSection key={evidence.id} {...evidence} />
      ))}
      {props.relatedStudies && props.relatedStudies.length > 0 && (
        <section className="related-studies">
          <h2 className="label">Related {pluralize('study', props.relatedStudies.length)}:</h2>
          {props.relatedStudies.map((relatedStudy) => (
            <RelatedStudy key={relatedStudy.id} {...relatedStudy} />
          ))}
        </section>
      )}
      {props.relatedFigures && props.relatedFigures.length > 0 && (
        <section className="related-figures">
          <h2 className="label">Related {pluralize('figure', props.relatedFigures.length)}:</h2>
          {props.relatedFigures.map((relatedFigure) => (
            <RelatedFigure key={relatedFigure.name} {...relatedFigure} />
          ))}
        </section>
      )}
    </div>
  </div>
);
