import { i18n as i18nInterface } from 'i18next';
import { Brand } from '../brand';
import {
  EnhancedArticle, EnhancedArticleWithVersions, VersionSummary, ArticleStatus,
} from '../types';

const isVersionSameAsCurrentArticle = (article: EnhancedArticle, version: VersionSummary) => version.id === article.id && version.versionIdentifier === article.versionIdentifier;

const orderVersionsChronologically = (versions: VersionSummary[]) => versions.sort((a, b) => new Date(a.preprintPosted).getTime() - new Date(b.preprintPosted).getTime());
const getFirstVersion = (version: EnhancedArticleWithVersions) => orderVersionsChronologically(Object.values(version.versions))[0];

export const generateStatus = (version: EnhancedArticleWithVersions, brand: Brand, i18n: i18nInterface): ArticleStatus => ({
  type: i18n.t('status_title'),
  status: isVersionSameAsCurrentArticle(version.article, getFirstVersion(version))
    ? i18n.t('status_description_reviewed', { publisher_short: brand.publisherShort })
    : i18n.t('status_description_revised', { publisher_short: brand.publisherLong }),
  isPreview: !version.article.published || new Date(version.article.published) > (new Date()),
});
