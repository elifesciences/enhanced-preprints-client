import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { config } from './config';

const resources = {
  elife: {
    translation: {
      publisher_short: 'eLife',
      publisher_long: 'eLife Sciences Publications Limited',
      process_url: 'https://elifesciences.org/peer-review-process',
    },
  },
  biophysics_colab: {
    translation: {
      publisher_short: 'Biophysics Colab',
      publisher_long: 'Biophysics Colab',
      timeline_version_title: 'Endorsed article published',
      status_title: 'Endorsed article',
      status_description_reviewed: '{{publisher_short}} have endorsed this preprint that was revised by authors after peer review.',
      status_description_revised: '{{publisher_short}} have endorsed this preprint that was revised by authors after peer review.',
      process_url: 'https://www.sciencecolab.org/biophysics-colab',
    },
  },
};

const siteName = config.siteName?.replace('-', '_');

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: Object.keys(resources).includes(siteName ?? '') ? siteName : 'elife',
    fallbackLng: 'default',
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n };
