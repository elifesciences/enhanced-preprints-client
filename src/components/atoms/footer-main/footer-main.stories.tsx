import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FooterMain } from './footer-main';

export default {
  title: 'Atoms/Footer Main',
  component: FooterMain,
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'link-in-text-block', enabled: false },
        ],
      },
    },
  },
} as ComponentMeta<typeof FooterMain>;

const Template: ComponentStory<typeof FooterMain> = () => (
  <FooterMain />
);

export const FooterMainSection = Template.bind({});
