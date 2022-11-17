import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SiteFooter } from './site-footer';

export default {
  title: 'Molecules/SiteFooter',
  component: SiteFooter,
} as ComponentMeta<typeof SiteFooter>;

const Template: ComponentStory<typeof SiteFooter> = () => <SiteFooter ></SiteFooter>;

export const FooterSection = Template.bind({});
