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
