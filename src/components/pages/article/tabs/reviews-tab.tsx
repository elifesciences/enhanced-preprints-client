import '../article-page.scss';
import { EditorsAndReviewers } from '../../../atoms/editors-and-reviewers/editors-and-reviewers';
import { ReviewContent } from '../../../atoms/review-content/review-content';
import { PeerReview } from '../../../../types';

export const ArticleReviewsTab = ({ peerReview }: { peerReview: PeerReview }): JSX.Element => (
  <div className="tabbed-navigation__content">
    <div className="menu-spacer"/>
    <div className="article-body-container">
      <EditorsAndReviewers participants={peerReview.evaluationSummary.participants} />
      {peerReview.reviews.map((review, index) => (
        <ReviewContent key={index} id={`peer-review-${index}`} content={review.text} />
      ))}
      {peerReview.authorResponse && <ReviewContent id="author-response" content={peerReview.authorResponse.text} />}
    </div>
  </div>
);
