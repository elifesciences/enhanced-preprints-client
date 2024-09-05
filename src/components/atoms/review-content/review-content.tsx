import './review-content.scss';
import '../../../i18n';
import { useState } from 'react';
import { TermsList } from '../terms-list/terms-list';
import {
  findTerms, highlightTerms, significanceTerms, strengthTerms,
} from '../../../utils/terms';

type Props = { content: string, isAssessment?: boolean, id?: string, peerReviewUrl?: string, doi?: string };
export const ReviewContent = ({
  content, isAssessment = false, id = '',
}: Props) => {
  const sectionProps: Record<string, string> = {
    className: `review-content${isAssessment ? ' review-content--assessment' : ''}`,
  };
  if (isAssessment) {
    sectionProps.id = 'assessment';
  }

  const [isToggled, setIsToggled] = useState(false);

  const toggleText = () => {
    setIsToggled(!isToggled);
  };

  const { strength, significance } = findTerms(content);

  return (
    <section id={id} {...sectionProps}>
      <div className={`review-content_body${isAssessment ? ' review-content_body_assessment' : ''}`} dangerouslySetInnerHTML={{ __html: isAssessment ? highlightTerms(content) : content }} />
      {isAssessment ? (
        <>
          <div className={`review-content-collapsable review-content-collapsable__${isToggled ? 'shown' : 'hidden'}`}>
            { (significance && significance.length > 0) && <TermsList title="Significance of findings" terms={significanceTerms} selectedTerm={significance} /> }
            { (strength && strength.length > 0) && <TermsList title="Strength of evidence" terms={strengthTerms} selectedTerm={findTerms(content).strength || []} /> }
            {/* eslint-disable-next-line max-len */}
            <p>During the peer-review process the editor and reviewers write an eLife assessment that summarises the significance of the findings reported in the article (on a scale ranging from useful to landmark) and the strength of the evidence (on a scale ranging from inadequate to exceptional). <a href="https://elifesciences.org/inside-elife/db24dd46">Learn more about eLife assessments</a></p>
          </div>
          <span className='explananation_link' onClick={toggleText}> {isToggled ? 'Show less' : 'Read more about this assessment'}</span>
        </>
      ) : ''}
    </section>
  );
};
