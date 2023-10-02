import { Content } from './content';
import { Author } from './author';
import { Reference } from './reference';
import { PeerReview } from './peer-review';
import { TimelineEvent } from '../components/molecules/timeline/timeline';
import { Heading } from './enhanced-article';

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
  timeline: TimelineEvent[],
  status: string,
  articleType: string,
  volume?: string,
  eLocationId?: string,
};
