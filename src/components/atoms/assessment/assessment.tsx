import './assessment.scss';
import '../../../i18n';
import { useState } from 'react';
import { TermsList } from '../terms-list/terms-list';
import {
  findTerms, highlightTerms, significanceTerms, strengthTerms,
} from '../../../utils/terms';

type Props = { content: string };
export const Assessment = ({ content }: Props) => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleText = () => {
    setIsToggled(!isToggled);
  };

  const { strength, significance } = findTerms(content);

  return (
    <section id='assessment' className='assessment'>
      <div className="assessment__body" dangerouslySetInnerHTML={{ __html: highlightTerms(content) }} />
      <div className={`assessment-collapsable__${isToggled ? 'shown' : 'hidden'}`}>
        { (significance && significance.length > 0) && <TermsList title="Significance of findings" terms={significanceTerms} selectedTerm={significance} /> }
        { (strength && strength.length > 0) && <TermsList title="Strength of evidence" terms={strengthTerms} selectedTerm={findTerms(content).strength || []} /> }
        {/* eslint-disable-next-line max-len */}
        <p className="assessment__fixed_text">During the peer-review process the editor and reviewers write an eLife Assessment that summarises the significance of the findings reported in the article (on a scale ranging from landmark to useful) and the strength of the evidence (on a scale ranging from exceptional to inadequate). <a href="https://elifesciences.org/inside-elife/db24dd46">Learn more about eLife Assessments</a></p>
      </div>
      <span aria-expanded={isToggled} className={`explanation_link ${isToggled ? 'explanation_link__expanded' : ''}`} onClick={toggleText}> {isToggled ? 'Show less' : 'Read more about this assessment'}</span>
    </section>
  );
};
