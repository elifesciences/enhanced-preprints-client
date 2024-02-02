import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    default: {
      // Placeholders:
      twitter_handle: 'Twitter handle',
      process_url: '#', // link to review process

      // Defaults:
      heading_assessment: '{{publisher_short}} assessment',
      about_assessments: 'About $t(publisher_short) assessments',
      status_description_reviewed: 'Published from the original preprint after peer review and assessment by {{publisher_short}}.',
      status_description_revised: 'Revised by authors after peer review.',
      status_about: 'About {{publisher_short}}\'s process',
      timeline_version_title: 'Reviewed preprint version {{version_identifier}}',
      'Reviewed Preprint':  'Reviewed Preprint',
    },
    elife: {
      twitter_handle: '@elife',
      publisher_short: 'eLife',
      publisher_long: 'eLife Sciences Publications Limited',
      process_url: 'https://elifesciences.org/peer-review-process',

    },
    biophysics_colab: {
      twitter_handle: '@BiophysicsColab',
      publisher_short: 'Biophysics Colab',
      publisher_long: 'Biophysics Colab',
      timeline_version_title: 'Endorsed article published',
      'Reviewed Preprint': 'Endorsed article',
      status_description_reviewed: '{{publisher_short}} have endorsed this preprint that was revised by authors after peer review.',
      status_description_revised: '{{publisher_short}} have endorsed this preprint that was revised by authors after peer review.',
      process_url: 'https://www.sciencecolab.org/biophysics-colab',
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
