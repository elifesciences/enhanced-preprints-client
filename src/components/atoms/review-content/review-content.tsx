import Link from 'next/link';
import './review-content.scss';

export const terms = [
  '[Ll]andmark', '[Ff]undamental', '[Ii]mportant', '[Vv]aluable', '[Uu]seful', '[Ee]xceptional', '[Cc]ompelling', '[Cc]onvincing', '[Ss]olid', '[Ii]ncomplete', '[Ii]nadequate', 'incompletely', 'inadequately', 'convincingly',
];

const highlightTerms = (content: string): string => {
  let highlightedContent = content;
  terms.forEach((term) => {
    highlightedContent = highlightedContent.replace(new RegExp(`([^\\w]+)(${term})([^\\w]+)`, 'g'), '$1<strong class="highlighted-term">$2</strong>$3');
  });
  return highlightedContent;
};

type Props = { content: string, isAssessment?: boolean, id?: string, peerReviewUrl?: string };
export const ReviewContent = ({
  content, isAssessment = false, id = '', peerReviewUrl = undefined,
}: Props): JSX.Element => {
  const sectionProps: Record<string, string> = {
    className: `review-content${isAssessment ? ' review-content--assessment' : ''}`,
  };
  if (isAssessment) {
    sectionProps.id = 'assessment';
  }

  return (
  <section id={id} {...sectionProps}>
    <div className="review-content_body" dangerouslySetInnerHTML={{ __html: isAssessment ? highlightTerms(content) : content }} />
    {isAssessment ? (
      <ul className="review-content_links">
        { peerReviewUrl && <li className="review-content_links-item"><Link href={peerReviewUrl}>Read the peer reviews</Link></li> }
        <li className="review-content_links-item"><a href="https://elifesciences.org/inside-elife/db24dd46">About eLife assessments</a></li>
      </ul>
    ) : ''}
  </section>
  );
};
