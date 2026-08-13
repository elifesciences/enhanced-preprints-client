import {type PeerReview} from './peer-review';
import {type RelatedContent} from './related-content';
import {type IsoDateString} from '../types';
import {type ProcessedArticle} from '../types/enhanced-article';

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
