import { type IsoDateString } from './iso-date-string';
import { type Content } from '../content';
import { type Author, type Reference } from '../fetch-data';
import { type Metrics } from '../fetch-data/metrics';
import { type PeerReview } from '../fetch-data/peer-review';
import { type RelatedContent } from '../fetch-data/related-content';
import { type VersionSummary } from '../fetch-data/version-summary';

type License = {
  type: string,
  url?: string,
  content?: Content,
};

export type ProcessedArticle = {
  title: Content,
  authors?: Author[],
  abstract: Content,
  licenses: License[],
  content: Content,
  references: Reference[],
  meta?: {
    authorNotes?: {
      type: string,
      id?: string,
      text: string,
      label?: string,
    }[],
  },
};

export type ArticleSummary = {
  id: string,
  doi: string,
  title: Content,
  date: Date | null,
};

export type EnhancedArticle = {
  id: string,
  msid: string,
  doi: string,
  versionIdentifier: string,
  versionDoi?: string,
  umbrellaDoi?: string,
  article: ProcessedArticle,
  preprintDoi?: string,
  preprintUrl?: string,
  preprintPosted?: IsoDateString,
  sentForReview?: IsoDateString,
  peerReview?: PeerReview,
  published: IsoDateString | null,
  publishedYear?: number,
  volume?: string,
  eLocationId?: string,
  subjects?: string[],
  pdfUrl?: string,
  relatedContent?: RelatedContent[],
  license?: string,
};

export type EnhancedArticleWithVersions = {
  article: EnhancedArticle,
  versions: Record<string, VersionSummary>,
  metrics?: Metrics,
  siteName?: string,
};
