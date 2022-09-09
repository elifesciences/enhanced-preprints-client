import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SiteHeader } from './site-header';

export default {
  title: 'Molecules/SiteHeader',
  component: SiteHeader,
} as ComponentMeta<typeof SiteHeader>;

const Template: ComponentStory<typeof SiteHeader> = () => <SiteHeader />;

export const StandardSiteHeader = Template.bind({});
