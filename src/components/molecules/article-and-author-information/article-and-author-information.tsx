import { Author, AuthorNotesData, VersionHistoryItem } from '../../../types';
import './article-and-author-information.scss';
import { Copyright } from '../../atoms/copyright/copyright';
import { VersionHistory } from '../../atoms/version-history/version-history';
import { AuthorList } from '../../atoms/author-list/author-list';
import { AuthorNotes } from '../../atoms/author-notes/author-notes';
import { CiteAllVersions } from '../../atoms/cite-all-versions/cite-all-versions';

export const ArticleAndAuthorInformation = ({
  authors,
  authorNotes,
  license,
  publishedYear,
  versions,
  umbrellaDoi,
}: { authors: Author[], authorNotes: AuthorNotesData, versions: VersionHistoryItem[], license?: string, publishedYear?: number, umbrellaDoi?: string }) => {
  const rids = authors.filter((author) => author.meta?.notes).map((author) => author.meta?.notes?.map((note) => note.rid)).flat();
  const orphanedAuthorNotes = authorNotes.filter((note) => !rids.includes(note.id));

  return (
    <section>
      <h1 id="article-and-author-information" className="article-and-author-information__title">Article and author information</h1>
      { authors.length > 0 && <AuthorList authors={authors} authorNotes={authorNotes} /> }
      { orphanedAuthorNotes.length > 0 && <AuthorNotes authorNotes={orphanedAuthorNotes} /> }
      { versions.length > 0 && <VersionHistory versions={versions} /> }
      { umbrellaDoi && <CiteAllVersions doi={umbrellaDoi}/> }
      { license && <Copyright license={license} publishedYear={publishedYear} authors={authors} /> }
    </section>
  );
};
