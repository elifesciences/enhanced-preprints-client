import { StoryFn, Meta } from '@storybook/react';
import { FooterMain } from './footer-main';

export default {
  title: 'Atoms/Footer Main',
  component: FooterMain,
} as Meta<typeof FooterMain>;

const Template: StoryFn<typeof FooterMain> = () => (
  <FooterMain />
);

export const FooterMainSection = Template.bind({});
