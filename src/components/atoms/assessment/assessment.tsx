import './assessment.scss';
import '../../../i18n';
import { useEffect, useState } from 'react';
import { TermsList } from '../terms-list/terms-list';
import {
  findTerms, highlightTerms, significanceTerms, strengthTerms,
} from '../../../utils/terms';
import { Descriptors } from '../descriptors/descriptors';

type Props = { content: string, doi?: string };
export const Assessment = ({ content, doi }: Props) => {
  const [expanded, setExpanded] = useState<boolean | null>(null);

  useEffect(() => setExpanded(false), []);

  const { strength, significance } = findTerms(content);

  return (
    <section id="assessment" className="assessment">
      <div className="assessment__body" dangerouslySetInnerHTML={{ __html: highlightTerms(content) }} />
      {doi && <Descriptors doi={doi}/>}
      <div className={`assessment-collapsable__${expanded !== false ? 'shown' : 'hidden'}`}>
        { (significance && significance.length > 0) && <TermsList title="Significance of findings" terms={significanceTerms} selectedTerm={significance} /> }
        { (strength && strength.length > 0) && <TermsList title="Strength of evidence" terms={strengthTerms} selectedTerm={findTerms(content).strength || []} /> }
        {/* eslint-disable-next-line max-len */}
        <p className="assessment__fixed_text">During the peer-review process the editor and reviewers write an eLife assessment that summarises the significance of the findings reported in the article (on a scale ranging from landmark to useful) and the strength of the evidence (on a scale ranging from exceptional to inadequate). <a href="https://elifesciences.org/inside-elife/db24dd46">Learn more about eLife assessments</a></p>
      </div>
      {(expanded !== null) &&
      <span role="button" aria-controls="assessment" aria-expanded={expanded}
        className={`explanation_link ${expanded ? 'explanation_link__expanded' : ''}`}
        onClick={() => setExpanded(!expanded)}> {expanded ? 'Show less' : 'Read more about this assessment'}</span>}
    </section>
  );
};
