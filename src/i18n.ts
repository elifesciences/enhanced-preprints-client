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
    },
    elife: {
      about_assessments: 'About eLife assessments',
      status_description_reviewed: 'Published from the original preprint after peer review and assessment by eLife.',
      reviewed_preprint: 'Reviewed Preprint',
      revised_preprint: 'Reviewed Preprint',
      version_of_record: 'Version of Record',
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
