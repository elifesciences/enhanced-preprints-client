import { I18nextProvider } from 'react-i18next';
import { i18n } from '../src/i18n';
import { LayoutSelector } from '../src/pages/_app.page';

export const parameters = {
  nextjs: {
    appDirectory: true,
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: 'fullscreen',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#fff',
      },
    ]
  },
  viewport: {
    viewports: {
      small: {
        name: 'Small 480px',
        styles: {
          width: '480px',
          height: '854px'
        },
      },
      medium: {
        name: 'Medium 768px',
        styles: {
          width: '768px',
          height: '1024px'
        },
      },
      large: {
        name: 'Large 1000px',
        styles: {
          width: '1000px',
          height: '800px'
        },
      },
      extraLarge: {
        name: 'Extra Large 1200px',
        styles: {
          width: '1200px',
          height: '900px'
        },
      },
    },
  },
}



export const globalTypes = {
  stringsNamespace: {
    name: 'Strings namespace',
    description: 'Which flavour of PRC to use?',
    toolbar: {
      icon: 'document',
      items: [
        { value: 'default', title: 'default'},
        { value: 'elife', title: 'elife'},
        { value: 'biophysics_colab', title: 'biophysics_colab'}
      ],
      showName: true,
    },
  },
  layoutName: {
    name: 'Layout',
    description: 'Which layout to use?',
    toolbar: {
      icon: 'category',
      items: [
        { value: 'default', title: 'default'},
        { value: 'biophysics-colab', title: 'biophysics-colab'}
      ],
      showName: true,
    },
  },
};

export const decorators = [
  (Story, context) => {
    const { stringsNamespace, layoutName } = context.globals;

    return <I18nextProvider i18n={i18n} defaultNS={stringsNamespace}>
      <LayoutSelector siteName={layoutName}>
        <Story />
      </LayoutSelector>
    </I18nextProvider>;
  }
];
