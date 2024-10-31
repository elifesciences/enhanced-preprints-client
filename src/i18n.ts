import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    default: {
      // Placeholders:
      twitter_handle: 'Twitter handle',
      publisher_short: 'Publisher short name',
      publisher_long: 'Publisher long name',
      process_url: '#', // link to review process
      about_assessments_url: '#', // link to about assessments

      // Defaults:
      reviewed_preprints_url: '/reviewed-preprints/{{msid}}', // link to reviewed preprints
      heading_assessment: '$t(publisher_short) assessment',
      about_assessments_description: (
        'During the peer-review process the editor and reviewers write an assessment that summarises the significance'
        + ' of the findings reported in the article and the strength of the evidence.'
      ),
      about_assessments: 'Learn more about $t(publisher_short) assessments',
      status_description_reviewed: 'Published from the original preprint after peer review and assessment by $t(publisher_short).',
      status_description_revised: 'Revised by authors after peer review.',
      status_about: 'About $t(publisher_short)\'s process',
      reviewed_preprint: 'Reviewed Preprint',
      related_intro: 'Related {{type}}',
      related_type_default: 'content',
      timeline_version_title: '$t(reviewed_preprint)',
      external_timeline_version_title: '$t(timeline_version_title)',
      external_timeline_version_correction_date_prefix: 'Updated ',
      history_version_title: '$t(reviewed_preprint) version {{version}}',
      external_history_version_title: '$t(history_version_title)',
      external_history_version_title_updated: '$t(external_history_version_title)',
    },
    elife: {
      twitter_handle: '@elife',
      publisher_short: 'eLife',
      publisher_long: 'eLife Sciences Publications Limited',
      process_url: 'https://elifesciences.org/about/peer-review',
      about_assessments_description: (
        'During the peer-review process the editor and reviewers write an eLife assessment that summarises the significance'
        + ' of the findings reported in the article (on a scale ranging from landmark to useful) and the strength of the'
        + ' evidence (on a scale ranging from exceptional to inadequate).'
      ),
      about_assessments_url: 'https://elifesciences.org/about/elife-assessments',
      reviewed_preprints_url: 'https://elifesciences.org/reviewed-preprints/{{msid}}',
      related_intro_collection: 'Part of {{type}}',
      related_intro_podcastChapterEpisode: 'Discussed in {{type}}',
      related_type_insight: 'Insight',
      related_type_collection: 'Collection',
      related_type_podcastChapterEpisode: 'Podcast',
      external_timeline_version_title: 'Version of Record',
      external_history_version_title: 'Version of Record published',
      external_history_version_title_updated: 'Version of Record updated',
      review_process_reviewed: '<strong>Not revised:</strong> This Reviewed Preprint includes the authors’ original preprint (without revision), an eLife assessment, and public reviews.',
      review_process_reviewed_with_author_response: (
        '<strong>Not revised:</strong> This Reviewed Preprint includes the authors’ original preprint (without revision), an eLife assessment, public reviews, and a provisional response from the authors.'
      ),
      review_process_revised: (
        '<strong>Revised:</strong> This Reviewed Preprint has been revised by the authors in response to the previous round of peer review; '
        + 'the eLife assessment and the public reviews have been updated where necessary by the editors and peer reviewers.'
      ),
    },
    biophysics_colab: {
      twitter_handle: '@BiophysicsColab',
      publisher_short: 'Biophysics Colab',
      publisher_long: 'Biophysics Colab',
      heading_assessment: 'Endorsement statement',
      timeline_version_title: 'Endorsed article published',
      reviewed_preprint: 'Endorsed article',
      status_description_reviewed: '$t(publisher_short) have endorsed this preprint that was revised by authors after peer review.',
      status_description_revised: '$t(publisher_short) have endorsed this preprint that was revised by authors after peer review.',
      process_url: 'https://www.sciencecolab.org/biophysics-colab',
      about_assessments_url: 'https://www.sciencecolab.org/biophysics-colab',
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
