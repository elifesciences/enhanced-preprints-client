import { i18n } from '../../i18n';
import {
  EnhancedArticle,
  EnhancedArticleWithVersions,
  VersionSummary,
  ArticleStatus,
} from '../../types';
import { DatesToStrings } from '../type-converters';
import { isPreprintVersionSummary } from '../type-guards';

const isVersionSameAsCurrentArticle =
  (article: DatesToStrings<EnhancedArticle>, version: DatesToStrings<VersionSummary>) => isPreprintVersionSummary(version) && version.id === article.id && version.versionIdentifier === article.versionIdentifier;

const orderVersionsChronologically = (versions: DatesToStrings<VersionSummary>[]) => versions.filter(isPreprintVersionSummary).sort((a, b) => new Date(a.preprintPosted).getTime() - new Date(b.preprintPosted).getTime());
const getFirstVersion = (version: DatesToStrings<EnhancedArticleWithVersions>) => orderVersionsChronologically(Object.values(version.versions))[0];

export const generateStatus = (version: DatesToStrings<EnhancedArticleWithVersions>): ArticleStatus => ({
  type: 'reviewed_preprint',
  status: isVersionSameAsCurrentArticle(version.article, getFirstVersion(version))
    ? i18n.t('status_description_reviewed')
    : i18n.t('status_description_revised'),
  isPreview: !version.article.published || new Date(version.article.published) > (new Date()),
});
