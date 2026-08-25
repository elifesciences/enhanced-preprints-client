import { type EnhancedArticle } from './enhanced-article';
import { type PeerReviewEvaluationSummaryOnly } from './peer-review-evaluation-summary-only';
import { type ProcessedArticle } from './processed-article';
import { type IsoDateString } from '../types';

export type PublishedEnhancedArticleMetaDataForJournal = Omit<EnhancedArticle, 'article' | 'peerReview'> & {
  article: Omit<ProcessedArticle, 'content' | 'abstract'>,
  peerReview?: PeerReviewEvaluationSummaryOnly,
  published: IsoDateString,
  firstPublished: IsoDateString,
};
