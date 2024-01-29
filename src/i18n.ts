import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { config } from './config';

const resources = {
  elife: {
    translation: {
      publisher_short: 'eLife',
      publisher_long: 'eLife Sciences Publications Limited',
      'Reviewed Preprint': 'Reviewed Preprint',
    },
  },
  biophysics_colab: {
    translation: {
      publisher_short: 'Biophysics Colab',
      publisher_long: 'Biophysics Colab',
      'Reviewed preprint version {{versionIdentifier}}': 'Endorsed article published',
      'Reviewed Preprint': 'Endorsed article',
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
