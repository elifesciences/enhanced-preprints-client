import Link from 'next/link';
import { Descriptors } from '../../atoms/descriptors/descriptors';
import './review-content.scss';

export const terms = [
  'landmark', 'fundamental', 'important', 'valuable', 'useful', 'exceptional', 'compelling', 'convincing', 'solid', 'incomplete', 'inadequate', 'incompletely', 'inadequately', 'convincingly',
];

const highlightTerms = (content: string): string => content.replaceAll(new RegExp(`([^\\w]+)(?<term>${terms.join('|')})([^\\w]+)`, 'gi'), '$1<strong class="highlighted-term">$<term></strong>$3');

type Props = { content: string, isAssessment?: boolean, id?: string, peerReviewUrl?: string, doi?: string };
export const ReviewContent = ({
  content, isAssessment = false, id = '', peerReviewUrl = undefined, doi = '',
}: Props) => {
  const sectionProps: Record<string, string> = {
    className: `review-content${isAssessment ? ' review-content--assessment' : ''}`,
  };
  if (isAssessment) {
    sectionProps.id = 'assessment';
  }

  doi = '10.7554/eLife.81090.sa0';

  return (
    <section id={id} {...sectionProps}>
      <div className="review-content_body" dangerouslySetInnerHTML={{ __html: isAssessment ? highlightTerms(content) : content }} />
      {doi && <Descriptors doi={doi}/>}
      {isAssessment ? (
        <ul className="review-content-items">
          { peerReviewUrl && <li className="review-content_item"><Link href={`${peerReviewUrl}#tab-content`} scroll={true} shallow={true}>Read the peer reviews</Link></li> }
          <li className="review-content_item"><a href="https://elifesciences.org/inside-elife/db24dd46" className="ga-review-content_links">About eLife assessments</a></li>
        </ul>
      ) : ''}
    </section>
  );
};
