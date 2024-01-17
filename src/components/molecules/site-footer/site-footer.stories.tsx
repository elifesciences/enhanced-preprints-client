import { StoryFn, Meta } from '@storybook/react';
import { SiteFooter } from './site-footer';

export default {
  title: 'Molecules/SiteFooter',
  component: SiteFooter,
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'link-in-text-block', enabled: false },
        ],
      },
    },
  },
} as Meta<typeof SiteFooter>;

const Template: StoryFn<typeof SiteFooter> = () => <SiteFooter ></SiteFooter>;

export const FooterSection = Template.bind({});
