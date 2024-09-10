import { Content } from './content';
import { Author, AuthorNotes } from './author';
import { Reference } from './reference';
import { PeerReview } from './peer-review';
import { Heading } from './enhanced-article';
import { VersionHistoryItem } from './version-history-item';

export type MetaData = {
  abstract: Content,
  authors: Author[],
  doi: string,
  msas: string[],
  msid: string,
  pdfUrl?: string,
  references: Reference[],
  title: Content,
  version: string,
  publishedYear?: number,
  volume?: string,
  eLocationId?: string,
  license?: string,
  versionHistory: VersionHistoryItem[],
  authorNotes: AuthorNotes,
};

export type VersionedMetaData = {
  abstract: Content,
  authors: Author[],
  doi: string,
  headings: Heading[],
  msas: string[],
  msid: string,
  pdfUrl?: string,
  references: Reference[],
  title: Content;
  version: string,
  publishedYear: number,
  peerReview: PeerReview,
  status: string,
  articleType: string,
  volume?: string,
  eLocationId?: string,
};
