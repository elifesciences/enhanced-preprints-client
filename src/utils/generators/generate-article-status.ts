import { i18n } from '../../i18n';
import {
  EnhancedArticle,
  EnhancedArticleWithVersions,
  VersionSummary,
  ArticleStatus,
} from '../../types';
import { isPreprintVersionSummary } from '../type-guards';

const isVersionSameAsCurrentArticle = (article: EnhancedArticle, version: VersionSummary) => isPreprintVersionSummary(version) && version.id === article.id && version.versionIdentifier === article.versionIdentifier;

const orderVersionsChronologically = (versions: VersionSummary[]) => versions.filter(isPreprintVersionSummary).sort((a, b) => new Date(a.preprintPosted).getTime() - new Date(b.preprintPosted).getTime());
const getFirstVersion = (version: EnhancedArticleWithVersions) => orderVersionsChronologically(Object.values(version.versions))[0];

export const generateStatus = (version: EnhancedArticleWithVersions): ArticleStatus => ({
  type: 'reviewed_preprint',
  status: isVersionSameAsCurrentArticle(version.article, getFirstVersion(version))
    ? i18n.t('status_description_reviewed')
    : i18n.t('status_description_revised'),
  isPreview: !version.article.published || new Date(version.article.published) > (new Date()),
});
