import { Author, VersionHistoryItem } from '../../../types';
import './article-and-author-information.scss';
import { Copyright } from '../../atoms/copyright/copyright';
import { VersionHistory } from '../../atoms/version-history/version-history';
import { AuthorList } from '../../atoms/author-list/author-list';

export const ArticleAndAuthorInformation = ({
  authors,
  license,
  publishedYear,
  versions,
}: { authors: Author[], versions: VersionHistoryItem[], license?: string, publishedYear?: number }) => (
  <section>
    <h1 id="article-and-author-information" className="article-and-author-information__title">Article and author information</h1>
    { authors.length > 0 && <AuthorList authors={authors} /> }
    { versions.length > 0 && <VersionHistory versions={versions} /> }
    { license && <Copyright license={license} publishedYear={publishedYear} authors={authors} /> }
  </section>
);