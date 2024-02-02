import { i18n } from '../i18n';
import {
  EnhancedArticle, EnhancedArticleWithVersions, VersionSummary, ArticleStatus,
} from '../types';

const isVersionSameAsCurrentArticle = (article: EnhancedArticle, version: VersionSummary) => version.id === article.id && version.versionIdentifier === article.versionIdentifier;

const orderVersionsChronologically = (versions: VersionSummary[]) => versions.sort((a, b) => new Date(a.preprintPosted).getTime() - new Date(b.preprintPosted).getTime());
const getFirstVersion = (version: EnhancedArticleWithVersions) => orderVersionsChronologically(Object.values(version.versions))[0];

export const generateStatus = (version: EnhancedArticleWithVersions): ArticleStatus => ({
  type: 'Reviewed Preprint', 
  status: isVersionSameAsCurrentArticle(version.article, getFirstVersion(version))
    ? i18n.t('status_description_reviewed', { publisher_short: i18n.t('publisher_short') })
    : i18n.t('status_description_revised', { publisher_short: i18n.t('publisher_short') }),
  isPreview: !version.article.published || new Date(version.article.published) > (new Date()),
});
