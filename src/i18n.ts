import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  default: {
    translation: {
      // Placeholders:
      twitter_handle: 'Twitter handle',
      process_url: '#', // link to review process

      // Defaults:
      heading_assessment: '{{publisher_short}} assessment',
      about_assessments: 'About {{publisher_short}} assessments',
      status_title: 'Reviewed Preprint',
      status_description_reviewed: 'Published from the original preprint after peer review and assessment by {{publisher_short}}.',
      status_description_revised: 'Revised by authors after peer review.',
      status_about: 'About {{publisher_short}}\'s process',
      timeline_version_title: 'Reviewed preprint version {{versionIdentifier}}',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'default',
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n };
