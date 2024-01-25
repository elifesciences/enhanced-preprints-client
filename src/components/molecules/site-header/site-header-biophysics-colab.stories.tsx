import { StoryFn, Meta } from '@storybook/react';
import { SiteHeaderBiophysicsColab } from './site-header-biophysics-colab';

export default {
  title: 'Molecules/SiteHeaderBiophysicsColab',
  component: SiteHeaderBiophysicsColab,
} as Meta<typeof SiteHeaderBiophysicsColab>;

const Template: StoryFn<typeof SiteHeaderBiophysicsColab> = () => <SiteHeaderBiophysicsColab />;

export const StandardSiteHeaderBiophysicsColab = Template.bind({});
