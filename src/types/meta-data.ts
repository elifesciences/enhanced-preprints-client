import { Content } from './content';
import { Heading } from '../components/atoms/jump-to-menu/jump-to-menu';
import { Author } from './author';
import { Reference } from './reference';
import { PeerReview } from './peer-review';
import { TimelineEvent } from '../components/molecules/timeline/timeline';

export type MetaData = {
  abstract: Content;
  authors: Author[];
  doi: string;
  headings: Heading[],
  msas: string[],
  msid: string,
  pdfUrl?: string,
  references: Reference[],
  title: Content;
  version: string,
  publishedYear: number,
};

export type VersionedMetaData = {
  abstract: Content;
  authors: Author[];
  doi: string;
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
};
