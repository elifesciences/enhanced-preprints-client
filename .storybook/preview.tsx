import { Preview } from '@storybook/react';
import { BrandContext, Brand, elifeBrand, biophysicsColabBrand, defaultBrand } from '../src/brand';
import { i18n } from '../src/i18n';
import { I18nextProvider } from 'react-i18next';

const preview: Preview = {
  parameters: {
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
  },
  globalTypes: {
    brand: {
      description: 'Branding for components',
      defaultValue: 'elife',
      toolbar: {
        title: 'Brading',
        icon: 'circlehollow',
        items: ['elife', 'biophysics-colab'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      let brand: Brand;
      switch (context.globals.brand) {
        case 'elife':
          brand = elifeBrand;
          break;
        case 'biophysics-colab':
          brand = biophysicsColabBrand;
          break;
        default:
          brand = defaultBrand;
      }
      if (brand.translationNamespace) {
        i18n.setDefaultNamespace(brand.translationNamespace);
      }

      const brandStyles = {
        '--color-primary': brand.colors.primary,
      } as React.CSSProperties;

      return (
        <I18nextProvider i18n={i18n}>
          <BrandContext.Provider value={brand}>
            <div style={brandStyles}>
              <Story />
            </div>
          </BrandContext.Provider>
        </I18nextProvider>
      );
    },
  ],
};

export default preview;
