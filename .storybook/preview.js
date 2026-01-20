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
    options: {
      white: {
        name: 'white',
        value: '#fff',
      }
    }
  },
  viewport: {
    options: {
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

export const initialGlobals = {
  backgrounds: {
    value: 'white'
  }
};
export const tags = ['autodocs'];
