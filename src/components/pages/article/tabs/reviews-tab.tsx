import styles from '../article-page-layout.module.scss';
import { EditorsAndReviewers } from '../../../atoms/editors-and-reviewers/editors-and-reviewers';
import { ReviewContent } from '../../../atoms/review-content/review-content';
import { PeerReview } from '../../../../types';

export const ArticleReviewsTab = ({ peerReview }: { peerReview: PeerReview }): JSX.Element => (
  <div className={styles['tabbed-navigation__content']}>
    <div className={styles['menu-spacer']}/>
    <div className={styles['article-body-container']}>
      <EditorsAndReviewers participants={peerReview.evaluationSummary.participants} />
      {peerReview.reviews.map((review, index) => (
        <ReviewContent key={index} id={`peer-review-${index}`} content={review.text} />
      ))}
    </div>
  </div>
);
