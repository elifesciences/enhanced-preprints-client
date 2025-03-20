import '../article-page.scss';
import { useTranslation } from 'react-i18next';
import { EditorsAndReviewers } from '../../../atoms/editors-and-reviewers/editors-and-reviewers';
import { ReviewContent } from '../../../atoms/review-content/review-content';
import { PeerReview } from '../../../../types';
import { JumpToMenu } from '../../../atoms/jump-to-menu/jump-to-menu';
import { ReviewProcess } from '../../../atoms/review-process/review-process';

export const ArticleReviewsTab = ({ peerReview, currentVersion }: { peerReview: PeerReview, currentVersion: number, }) => {
  const { t } = useTranslation();
  const headings = [
    { id: 'review-process', text: 'Peer review process' },
    ...peerReview.evaluationSummary && peerReview.evaluationSummary.participants.length > 0 ? [{ id: 'editors-and-reviewers', text: t('editors_and_reviewers_title') }] : [],
    ...peerReview.reviews.map((_, index) => (
      { id: `peer-review-${index}`, text: `Reviewer #${index + 1}` }
    )),
    ...peerReview.authorResponse ? [{ id: 'author-response', text: 'Author Response' }] : [],
  ];

  return (
    <div className="tabbed-navigation__content tabbed-navigation__content--reviews">
      <JumpToMenu headings={headings} />
      <div className="article-body-container">
        <ReviewProcess current={currentVersion} {...(peerReview.authorResponse ? { authorResponse: true } : {})} />
        { peerReview.evaluationSummary && <EditorsAndReviewers participants={peerReview.evaluationSummary.participants} /> }
        {peerReview.reviews.map((review, index) => (
          <ReviewContent key={index} id={`peer-review-${index}`} content={review.text} doi={review.doi} />
        ))}
        {peerReview.authorResponse && <ReviewContent id="author-response" content={peerReview.authorResponse.text} doi={peerReview.authorResponse.doi} />}
      </div>
    </div>
  );
};
