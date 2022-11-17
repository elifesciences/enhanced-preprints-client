import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FooterMain } from './footer-main';

export default {
  title: 'Atoms/Footer Main',
  component: FooterMain,
} as ComponentMeta<typeof FooterMain>;

const Template: ComponentStory<typeof FooterMain> = () => (
  <FooterMain />
);

export const FooterMainSection = Template.bind({});
