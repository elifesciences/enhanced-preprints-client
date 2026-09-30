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
  relatedStudy: RelatedStudyProps,
  relatedFigure?: RelatedFigureProps,
};

export const ClaimsTreeClaimPage = (props: ClaimsTreeClaimPageProps): JSX.Element => (
  <div className={`claims-tree-claim-page ${dmSans.variable} ${poppins.variable}`}>
    <ClaimsTreeHeader
      title={`Claim ${props.id}`}
      titleSupplementary={`(question ${props.questionNumber})`}
      backLinkLabel="Claims tree"
      navigation={{ previousDisabled: props.id === '1' }}
      relatedItems={[
        ...(props.relatedFigure ? ['Figure'] : []),
        props.relatedStudy.name,
      ]}
    />
    <div className="claims-tree-pages-content">
      <ClaimsTreeSection {...props.claim} />
      <ClaimsTreeSection {...props.evidence} />
      <RelatedStudy {...props.relatedStudy} />
      {props.relatedFigure && <RelatedFigure {...props.relatedFigure} />}
    </div>
  </div>
);
