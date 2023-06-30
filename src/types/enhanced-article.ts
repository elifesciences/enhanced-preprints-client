import { Content } from './content';
import { Institution } from './institution';
import { PeerReview } from './peer-review';
import { Reference } from './reference';

export type ArticleDocument = string;
export type ArticleContent = {
  doi: string,
  document: ArticleDocument,
};

export type ArticleTitle = Content;
export type ArticleAbstract = Content;
export type Address = {
  addressCountry?: string,
};

export type OrcidIdentifier = {
  type: 'orcid',
  value: string,
};

export type Identifier = OrcidIdentifier;

export type Author = {
  familyNames: string[],
  givenNames?: string[],
  affiliations?: Institution[],
  emails?: string[],
  identifiers?: Identifier[],
};

export type License = {
  type: string,
  url?: string,
  content?: Content,
};

export type Heading = {
  id: string,
  text: Content,
};
export type PublicationType = 'CreativeWork' | 'Periodical' | 'PublicationIssue' | 'PublicationVolume';
export type Publication = {
  type: PublicationType,
  name?: string,
  volumeNumber?: number,
  isPartOf?: Publication,
};

export type ProcessedArticle = {
  doi: string,
  title: ArticleTitle,
  date: Date,
  authors?: Author[],
  abstract: ArticleAbstract,
  licenses: License[],
  content: Content,
  headings: Heading[],
  references: Reference[],
};

export type ArticleSummary = {
  id: string,
  doi: string,
  title: ArticleTitle,
  date: Date,
};

export type ReviewText = string;
export enum ReviewType {
  EvaluationSummary = 'evaluation-summary',
  Review = 'review-article',
  AuthorResponse = 'reply',
}

export type Participant = {
  name: string,
  role: string,
  institution: string,
};

export type EnhancedArticle = {
  id: string,
  msid: string,
  doi: string,
  versionIdentifier: string,
  versionDoi?: string,
  // When we drop the old article schema from the DB,
  // we can change ProcessedArticle to exclude these properties and drop `Omit` here
  article: Omit<ProcessedArticle, 'doi' | 'date'>,
  preprintDoi: string,
  preprintUrl: string,
  preprintPosted: Date,
  sentForReview?: Date,
  peerReview: PeerReview,
  published?: Date,
};

export type EnhancedArticleWithVersions = {
  article: EnhancedArticle,
  versions: Record<string, EnhancedArticle>,
};
