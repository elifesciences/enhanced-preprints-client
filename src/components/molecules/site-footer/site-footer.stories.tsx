import { StoryFn, Meta } from '@storybook/react';
import { SiteFooter } from './site-footer';

export default {
  title: 'Molecules/SiteFooter',
  component: SiteFooter,
} as Meta<typeof SiteFooter>;

const Template: StoryFn<typeof SiteFooter> = () => <SiteFooter ></SiteFooter>;

export const FooterSection = Template.bind({});
