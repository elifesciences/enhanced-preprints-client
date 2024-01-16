import { EnhancedArticle, ProcessedArticle } from './enhanced-article';

export type ReviewedPreprintSnippet = {
  id: string,
  doi: string,
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
};

export type VersionSummary = Omit<EnhancedArticle, 'article' | 'peerReview'>;

export type EnhancedArticleNoContent = VersionSummary & {
  article: Omit<ProcessedArticle, 'doi' | 'date' | 'content' | 'abstract'>,
  firstPublished: Date,
};
