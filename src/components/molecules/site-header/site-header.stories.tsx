import { StoryFn, Meta } from '@storybook/react';
import { SiteHeader } from './site-header';

export default {
  title: 'Molecules/SiteHeader',
  component: SiteHeader,
} as Meta<typeof SiteHeader>;

const Template: StoryFn<typeof SiteHeader> = () => <SiteHeader />;

export const StandardSiteHeader = Template.bind({});
