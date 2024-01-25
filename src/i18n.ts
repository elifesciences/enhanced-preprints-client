import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { config } from './config';

const resources = {
  default: {
    translation: {
      aria_label_timeline: 'Here is the article timeline',
      citation_publisher: 'eLife Sciences Publications Limited',
      citation_journal_title: 'eLife',
    },
  },
  biophysics_colab: {
    translation: {
      aria_label_timeline: 'Here is the endorsed article timeline',
      citation_publisher: 'Biophysics Colab',
      citation_journal_title: 'Biophysics Colab',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: config.siteName?.replace('-', '_'),
    fallbackLng: 'default',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
