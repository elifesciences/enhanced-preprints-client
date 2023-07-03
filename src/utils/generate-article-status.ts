import {
  EnhancedArticle, EnhancedArticleWithVersions, VersionSummary, ArticleStatus, TimelineEvent,
} from '../types';

const isVersionSameAsCurrentArticle = (article: EnhancedArticle, version: VersionSummary) => version.id === article.id && version.versionIdentifier === article.versionIdentifier;

const orderVersionsChronologically = (versions: VersionSummary[]) => versions.sort((a, b) => new Date(a.preprintPosted).getTime() - new Date(b.preprintPosted).getTime());
const getFirstVersion = (version: EnhancedArticleWithVersions) => orderVersionsChronologically(Object.values(version.versions))[0];

const generateType = (version: EnhancedArticleWithVersions): string => {
  const articleType = (isVersionSameAsCurrentArticle(version.article, getFirstVersion(version))) ? 'Reviewed Preprint' : 'Revised Preprint';
  const articlePrefix = (!version.article.published) ? 'Preview ' : '';

  return `${articlePrefix}${articleType}`;
};

const generateDescription = (version: EnhancedArticleWithVersions): string => (
  (isVersionSameAsCurrentArticle(version.article, getFirstVersion(version))) ?
    'Published from the original preprint after peer review and assessment by eLife.' :
    'Revised by authors after peer review.');

const generateTimeline = (version: EnhancedArticleWithVersions): TimelineEvent[] => {
  const timeline: TimelineEvent[] = Object.values(version.versions).reduce<TimelineEvent[]>((events, current) => {
    if (current.published) {
      events.push(current.id === version.article.id ?
        {
          date: new Date(current.published).toDateString(),
          name: `Reviewed preprint version ${current.versionIdentifier}`,
          eventDescription: '(this version)',
        } : {
          date: new Date(current.published).toDateString(),
          name: `Reviewed preprint version ${current.versionIdentifier}`,
          link: {
            url: `/reviewed-preprints/${current.id}`,
            text: 'Go to version',
          },
        });
    }
    return events;
  }, []);

  const firstVersion = getFirstVersion(version);

  if (firstVersion.preprintPosted !== undefined) {
    timeline.push({
      date: new Date(firstVersion.preprintPosted).toDateString(),
      name: 'Posted to bioRxiv',
      link: {
        url: `https://doi.org/${firstVersion.preprintDoi}`,
        text: 'Go to bioRxiv',
      },
    });
  }

  if (firstVersion.sentForReview !== undefined) {
    timeline.push({
      date: new Date(firstVersion.sentForReview).toDateString(),
      name: 'Sent for peer review',
    });
  }

  return timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const generateStatus = (version: EnhancedArticleWithVersions): ArticleStatus => ({
  type: generateType(version),
  description: generateDescription(version),
  timeline: generateTimeline(version),
});
