import '../article-page.scss';
import { EditorsAndReviewers } from '../../../atoms/editors-and-reviewers/editors-and-reviewers';
import { ReviewContent } from '../../../atoms/review-content/review-content';
import { PeerReview } from '../../../../types';
import { JumpToMenu } from '../../../atoms/jump-to-menu/jump-to-menu';

export const ArticleReviewsTab = ({ peerReview }: { peerReview: PeerReview }) => {
  const headings = [
    { id: 'editors-and-reviewers', text: 'Editors' },
    ...peerReview.reviews.map((_, index) => (
      { id: `peer-review-${index}`, text: `Reviewer #${index + 1}` }
    )),
    ...peerReview.authorResponse ? [{ id: 'author-response', text: 'Author Response' }] : [],
  ];

  return (
    <div className="tabbed-navigation__content">
      <JumpToMenu headings={headings} />
      <div className="article-body-container">
        <EditorsAndReviewers participants={peerReview.evaluationSummary.participants} />
        {peerReview.reviews.map((review, index) => (
          <ReviewContent key={index} id={`peer-review-${index}`} content={review.text} doi={review.doi} />
        ))}
        {peerReview.authorResponse && <ReviewContent id="author-response" content={peerReview.authorResponse.text} doi={peerReview.authorResponse.doi} />}
      </div>
    </div>
  );
};
