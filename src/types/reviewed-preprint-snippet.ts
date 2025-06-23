import { EnhancedArticle, ProcessedArticle } from './enhanced-article';
import { PeerReview } from './peer-review';

export type ElifeAssessmentContent = {
  type: 'paragraph',
  text: string,
}[];

export type ElifeAssessment = {
  elifeAssessment?: {
    title: string,
    content: ElifeAssessmentContent,
    id?: string,
    doi?: string,
    significance: string[],
    strength?: string[],
  },
};

export type ReviewedPreprintSnippet = {
  id: string,
  doi: string,
  version: number,
  pdf?: string,
  status: 'reviewed',
  authorLine?: string,
  title?: string,
  published?: string,
  reviewedDate?: string,
  versionDate?: string,
  statusDate?: string,
  stage: 'published',
  subjects?: {
    id: string,
    name: string,
  }[],
} & ElifeAssessment;

export type VersionSummary = Omit<EnhancedArticle, 'article' | 'peerReview'>;

export type PeerReviewEvaluationSummaryOnly = Pick<PeerReview, 'evaluationSummary'>;

export type PublishedEnhancedArticleMetaDataForJournal = VersionSummary & {
  article: Omit<ProcessedArticle, 'doi' | 'date' | 'content' | 'abstract'>,
  peerReview?: PeerReviewEvaluationSummaryOnly,
  published: Date,
  firstPublished: Date,
};
