import {
  EnhancedArticle, EnhancedArticleWithVersions, VersionSummary, PreprintVersionSummary, ArticleStatus,
} from '../types';

const isPreprintVersionSummary = (version: VersionSummary): version is PreprintVersionSummary => Object.hasOwn(version, 'preprintPosted');
const isVersionSameAsCurrentArticle = (article: EnhancedArticle, version: VersionSummary) => isPreprintVersionSummary(version) && version.id === article.id && version.versionIdentifier === article.versionIdentifier;

const orderVersionsChronologically = (versions: VersionSummary[]) => versions.filter(isPreprintVersionSummary).sort((a, b) => new Date(a.preprintPosted).getTime() - new Date(b.preprintPosted).getTime());
const getFirstVersion = (version: EnhancedArticleWithVersions) => orderVersionsChronologically(Object.values(version.versions))[0];

export const generateStatus = (version: EnhancedArticleWithVersions): ArticleStatus => (
  isVersionSameAsCurrentArticle(version.article, getFirstVersion(version)) ?
    {
      type: 'reviewed_preprint',
      status: 'status_description_reviewed',
      isPreview: !version.article.published || new Date(version.article.published) > (new Date()),
    } : {
      type: 'revised_preprint',
      status: 'status_description_revised',
      isPreview: !version.article.published || new Date(version.article.published) > (new Date()),
    }
);
