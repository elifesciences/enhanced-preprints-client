import * as z from 'zod/v4';
import { type Content } from './content';
import { type Institution } from './institution';
import { type PeerReview } from './peer-review';
import { type Reference } from './reference';
import { type RelatedContent } from './related-content';

type Identifier = {
  type: 'PropertyValue',
  propertyID: 'https://registry.identifiers.org/registry/orcid',
  value: string,
};

type Author = {
  familyNames: string[],
  givenNames?: string[],
  affiliations?: Institution[],
  emails?: string[],
  identifiers?: Identifier[],
};

type License = {
  type: string,
  url?: string,
  content?: Content,
};

export type ArticleDocument = string;
export type ArticleContent = {
  doi: string,
  document: ArticleDocument,
};

export type Heading = {
  id: string,
  text: Content,
};

export type ProcessedArticle = {
  doi: string,
  title: Content,
  date: Date,
  authors?: Author[],
  abstract: Content,
  licenses: License[],
  content: Content,
  headings: Heading[],
  references: Reference[],
  meta?: {
    authorNotes?: {
      type: string,
      id: string,
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

export type VORVersionSummary = {
  id: string,
  msid: string,
  doi: string,
  versionIdentifier: string,
  umbrellaDoi?: string,
  versionDoi?: string,
  sentForReview?: Date,
  published: Date | null,
  withEvaluationSummary?: boolean,
};

export type PreprintVersionSummary = {
  id: string,
  msid: string,
  doi: string,
  versionIdentifier: string,
  umbrellaDoi?: string,
  versionDoi?: string,
  preprintDoi: string,
  preprintUrl: string,
  preprintPosted: Date,
  sentForReview?: Date,
  published: Date | null,
  withEvaluationSummary?: boolean,
};

export type ExternalVersionSummary = {
  doi: string,
  versionIdentifier: string,
  published: Date | null,
  url: string,
  corrections?: {
    date: Date,
    url: string,
  }[],
};

export type VersionSummary = VORVersionSummary | PreprintVersionSummary | ExternalVersionSummary;

export const IsoDateStringSchema = z.iso.datetime().brand<'IsoDateString'>();

export type IsoDateString = z.infer<typeof IsoDateStringSchema>;

export type EnhancedArticle = {
  id: string,
  msid: string,
  doi: string,
  versionIdentifier: string,
  versionDoi?: string,
  umbrellaDoi?: string,
  // When we drop the old article schema from the DB,
  // we can change ProcessedArticle to exclude these properties and drop `Omit` here
  article: Omit<ProcessedArticle, 'doi' | 'date'>,
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

export type Metrics = {
  views: number,
  downloads: number,
  citations: number,
};

export type EnhancedArticleWithVersions = {
  article: EnhancedArticle,
  versions: Record<string, VersionSummary>,
  metrics?: Metrics,
  siteName?: string,
};
