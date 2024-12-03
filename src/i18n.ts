import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { config } from './config';

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
      about_assessments_description: (
        'During the peer-review process the editor and reviewers write an assessment that summarises the significance'
        + ' of the findings reported in the article and the strength of the evidence.'
      ),
      about_assessments: 'Learn more about $t(publisher_short) assessments',
      reviewed_preprint: 'Reviewed Preprint',
      related_intro: 'Related {{type}}',
      related_type_default: 'content',
      timeline_version_title: '$t(reviewed_preprint)',
      external_timeline_version_title: '$t(timeline_version_title)',
      external_timeline_version_correction_date_prefix: 'Updated ',
      history_version_title: '$t(reviewed_preprint) version {{version}}',
      external_history_version_title: '$t(history_version_title)',
      external_history_version_title_updated: '$t(external_history_version_title)',
      process_url_read_more: 'Read more about $t(publisher_short)’s peer review process.',
      review_process_reviewed: '',
      review_process_reviewed_with_author_response: '',
      review_process_revised: '',
      editors_and_reviewers_title: 'Editors',
      'role_senior-editor': 'Senior Editor',
      role_editor: 'Reviewing Editor',
      'role_peer-reviewer': 'Reviewing Editor',
      role_curator: 'Curator',
      revised: 'Revised by authors',
      not_revised: 'Not revised',
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
      timeline_version_title: 'Curated Preprint',
      reviewed_preprint: 'Curated Preprint',
      process_url: 'https://www.sciencecolab.org/biophysics-colab',
      about_assessments_url: 'https://www.sciencecolab.org/biophysics-colab',
      history_version_title: '$t(reviewed_preprint)',
      editors_and_reviewers_title: 'Curators',
      role_editor: 'Curator',
      'role_peer-reviewer': 'Curator',
    },
  },
};

const siteName = config.siteName?.replace('-', '_');

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    defaultNS: Object.keys(resources.en).includes(siteName ?? '') ? siteName : 'elife',
    fallbackNS: 'default',
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n };
