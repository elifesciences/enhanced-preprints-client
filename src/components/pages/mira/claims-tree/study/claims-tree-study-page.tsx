import { type JSX } from 'react';
import '../common.scss';
import './claims-tree-study-page.scss';
import { dmSans, poppins } from '../../../../fonts/mira';
import { ClaimsTreeHeader } from '../../../../molecules/mira/claims-tree-header/claims-tree-header';
import {ClaimsTreeSection} from '../../../../molecules/mira/claims-tree-section/claims-tree-section';

type Study = {
  heading: string,
  title: string,
  summary: string,
};

type Protocol = {
  id: string,
  heading: string,
  title: string,
  summary: string,
  attribution: string,
  quote: string,
};

type ClaimsTreeStudyPageProps = {
  id: string,
  study: Study,
  protocols: Array<Protocol>,
};

export const ClaimsTreeStudyPage = (props: ClaimsTreeStudyPageProps): JSX.Element => (
  <div className={`claims-tree-study-page ${dmSans.variable} ${poppins.variable}`}>
    <ClaimsTreeHeader title={`Study ${props.id}`} backLinkLabel="Back to claim" />
    <div className="claims-tree-pages-content">
      <ClaimsTreeSection
        heading={props.study.heading}
        title={props.study.title}
        summary={props.study.summary}
      />
      {props.protocols.map((protocol) => (
        <ClaimsTreeSection
          key={protocol.id}
          heading={protocol.heading}
          title={protocol.title}
          summary={protocol.summary}
          attribution={protocol.attribution}
          quote={protocol.quote}
        />
      ))}
    </div>
  </div>
);
