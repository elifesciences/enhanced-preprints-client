import { Content } from './content';
import { Author, AuthorNotesData } from './author';
import { Reference } from './reference';
import { VersionHistoryItem } from './version-history-item';

export type MetaData = {
  abstract: Content,
  authors: Author[],
  doi: string,
  umbrellaDoi?: string,
  msas: string[],
  msid: string,
  pdfUrl?: string,
  references: Reference[],
  title: Content,
  version: string,
  publishedYear?: number,
  copyrightYear?: number,
  volume?: string,
  eLocationId?: string,
  license?: string,
  versionHistory: VersionHistoryItem[],
  authorNotes: AuthorNotesData,
};
