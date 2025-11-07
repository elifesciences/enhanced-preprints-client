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
      canonical_url: '/reviewed-preprints/{{msid}}', // link to reviewed preprints
      reviewed_preprints_url: '$t(canonical_url)',
      about_assessments_description: (
        'During the peer-review process the editor and reviewers write an assessment that summarises the significance'
        + ' of the findings reported in the article and the strength of the evidence.'
      ),
      about_assessments: 'Learn more about $t(publisher_short) assessments',
      reviewed_preprint: 'Reviewed Preprint',
      version_of_record: 'Version of Record',
      related_intro: 'Related {{type}}',
      related_type_default: 'content',
      timeline_version_title: '$t(reviewed_preprint)',
      timeline_version_title_first_version: '$t(timeline_version_title)',
      timeline_version_title_with_evaluation_summary: '$t(timeline_version_title)',
      timeline_version_title_with_evaluation_summary_first_version: '$t(timeline_version_title_with_evaluation_summary)',
      vor_timeline_version_title: '$t(version_of_record)',
      vor_timeline_version_title_first_version: '$t(vor_timeline_version_title)',
      vor_timeline_version_title_with_evaluation_summary: '$t(vor_timeline_version_title)',
      vor_timeline_version_title_with_evaluation_summary_first_version: '$t(vor_timeline_version_title_with_evaluation_summary)',
      external_timeline_version_title: '$t(timeline_version_title)',
      external_timeline_version_correction_date_prefix: 'Updated ',
      history_version_title: '$t(reviewed_preprint) version {{version}}',
      history_version_title_first_version: '$t(history_version_title)',
      history_version_title_with_evaluation_summary: '$t(history_version_title)',
      history_version_title_with_evaluation_summary_first_version: '$t(history_version_title_with_evaluation_summary)',
      history_version_of_record_title: '$t(version_of_record)',
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
      reference_chapter_in_journal_prefix: 'In: ',
      reference_page_prefix_in_book: 'pp. ',
      reference_editors_suffix: ', editors.',
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
      canonical_url: 'https://elifesciences.org/reviewed-preprints/{{msid}}',
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
      process_url: 'https://biophysicscolab.org/about',
      about_assessments_url: '$t(process_url)',
      editors_and_reviewers_title: 'Curators',
      timeline_version_title_with_evaluation_summary: 'Curated Preprint',
      history_version_title: '$t(reviewed_preprint)',
      history_version_title_with_evaluation_summary: '$t(timeline_version_title_with_evaluation_summary)',
      revised: 'Peer Review Information',
      not_revised: '$t(revised)',
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
