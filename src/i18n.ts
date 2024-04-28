import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    default: {
      heading_assessment: 'Assessment',
      about_assessments: 'About assessments',
      status_description_reviewed: 'Published from the original preprint after peer review and assessment.',
      status_description_revised: 'Revised by authors after peer review.',
      status_about: 'About the process',
      timeline_version_title: 'Reviewed preprint version {{versionIdentifier}}',
      reviewed_preprint: 'Reviewed preprint',
      revised_preprint: 'Revised preprint',
      version_of_record: 'Version of record',
      related_intro: 'Related {{type}}',
      related_type_default: 'content',
    },
    elife: {
      heading_assessment: 'eLife assessment',
      about_assessments: 'About eLife assessments',
      status_description_reviewed: 'Published from the original preprint after peer review and assessment by eLife.',
      reviewed_preprint: 'Reviewed Preprint',
      revised_preprint: 'Reviewed Preprint',
      version_of_record: 'Version of Record',
      twitter_handle: '@elife',
      publisher_short: 'eLife',
      publisher_long: 'eLife Sciences Publications Limited',
      process_url: 'https://elifesciences.org/peer-review-process',
      about_assessments_url: 'https://elifesciences.org/inside-elife/db24dd46',
      reviewed_preprints_url: 'https://elifesciences.org/reviewed-preprints/{{msid}}',
      // Remove related_intro_Collection when type is switched to collection from Collection
      related_intro_collection: 'Part of {{type}}',
      related_intro_Collection: 'Part of {{type}}',
      // Remove related_intro_Podcast when type is switched to podcastChapterEpisode from Podcast
      related_intro_podcastChapterEpisode: 'Discussed in {{type}}',
      related_intro_Podcast: 'Discussed in {{type}}',
      // Remove related_type_Insight when type is switched to insight from Insight
      related_type_insight: 'Insight',
      related_type_Insight: 'Insight',
      // Remove related_type_Collection when type is switched to collection from Collection
      related_type_collection: 'Collection',
      related_type_Collection: 'Collection',
      // Remove related_type_Podcast when type is switched to podcastChapterEpisode from Podcast
      related_type_podcastChapterEpisode: 'Podcast',
      related_type_Podcast: 'Podcast',
    },
    biophysics_colab: {
      heading_assessment: 'Endorsement statement',
      timeline_version_title: 'Endorsed article published',
      reviewed_preprint: 'Endorsed article',
      status_description_reviewed: 'Biophysics Colab have endorsed this preprint that was revised by authors after peer review.',
      status_description_revised: 'Biophysics Colab have endorsed this preprint that was revised by authors after peer review.',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackNS: 'default',
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n };
