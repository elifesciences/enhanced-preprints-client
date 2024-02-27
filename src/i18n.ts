import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    default: {
      // Placeholders:
      twitter_handle: 'Twitter handle',


      // Defaults:
      reviewed_preprints_url: '/reviewed-preprints/{{msid}}', // link to reviewed preprints
      heading_assessment: '$t(publisher_short) assessment',
      about_assessments: 'About $t(publisher_short) assessments',
      status_description_reviewed: 'Published from the original preprint after peer review and assessment by $t(publisher_short).',
      status_description_revised: 'Revised by authors after peer review.',
      status_about: 'About $t(publisher_short)\'s process',
      timeline_version_title: 'Reviewed preprint version {{versionIdentifier}}',
      reviewed_preprint: 'Reviewed preprint',
      revised_preprint: 'Revised preprint',
      version_of_record: 'Version of record',
    },
    elife: {
      twitter_handle: '@elife',
      publisher_short: 'eLife',
      publisher_long: 'eLife Sciences Publications Limited',

      reviewed_preprint: 'Reviewed Preprint',
      revised_preprint: 'Reviewed Preprint',
      version_of_record: 'Version of Record',
      reviewed_preprints_url: 'https://elifesciences.org/reviewed-preprints/{{msid}}',
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
