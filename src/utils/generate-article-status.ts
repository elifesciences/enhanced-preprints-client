import {
  EnhancedArticle, EnhancedArticleWithVersions, VersionSummary, ArticleStatus,
} from '../types';

const isVersionSameAsCurrentArticle = (article: EnhancedArticle, version: VersionSummary) => version.id === article.id && version.versionIdentifier === article.versionIdentifier;

const orderVersionsChronologically = (versions: VersionSummary[]) => versions.sort((a, b) => new Date(a.preprintPosted).getTime() - new Date(b.preprintPosted).getTime());
const getFirstVersion = (version: EnhancedArticleWithVersions) => orderVersionsChronologically(Object.values(version.versions))[0];

export const generateStatus = (version: EnhancedArticleWithVersions): ArticleStatus => (
  isVersionSameAsCurrentArticle(version.article, getFirstVersion(version)) ?
    {
      type: 'Reviewed preprint',
      status: 'status_description_reviewed',
      isPreview: !version.article.published || new Date(version.article.published) > (new Date()),
    } : {
      type: 'Revised preprint',
      status: 'status_description_revised',
      isPreview: !version.article.published || new Date(version.article.published) > (new Date()),
    }
);
