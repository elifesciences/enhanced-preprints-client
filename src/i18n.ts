import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { config } from './config';

const resources = {
  default: {
    translation: {
      publisher_short: 'Journal',
      publisher_long: 'Journal Publications Limited',
    },
  },
  elife: {
    translation: {
      publisher_short: 'eLife',
      publisher_long: 'eLife Sciences Publications Limited',
    },
  },
  biophysics_colab: {
    translation: {
      publisher_short: 'Biophysics Colab',
      publisher_long: 'Biophysics Colab',
      'Here is the article timeline': 'Here is the endorsed article timeline',
      'Reviewed Preprint': 'Endorsed Article',
      'Reviewed preprint version {{versionIdentifier}}': 'Endorsed article published',
      'About {{publisher_short}}\'s process': 'Find out about {{publisher_short}}\'s process',
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

export default i18n;
