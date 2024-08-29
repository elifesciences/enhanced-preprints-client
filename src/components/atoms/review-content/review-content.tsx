import './review-content.scss';
import '../../../i18n';

export const terms = [
  'landmark', 'fundamental', 'important', 'valuable', 'useful', 'exceptional', 'compelling', 'convincing', 'solid', 'incomplete', 'inadequate', 'incompletely', 'inadequately', 'convincingly',
];

const highlightTerms = (content: string): string => content.replaceAll(new RegExp(`([^\\w]+)(?<term>${terms.join('|')})([^\\w]+)`, 'gi'), '$1<strong class="highlighted-term">$<term></strong>$3');

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

  return (
    <section id={id} {...sectionProps}>
      <div className="review-content_body" dangerouslySetInnerHTML={{ __html: isAssessment ? highlightTerms(content) : content }} />
      {isAssessment ? (
        <a className='explananation_link' href='#'>Read more about this assessment</a>
      ) : ''}
    </section>
  );
};
