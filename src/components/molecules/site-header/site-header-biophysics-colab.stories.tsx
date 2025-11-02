import { type Meta, type StoryObj } from '@storybook/react';
import { SiteHeaderBiophysicsColab } from './site-header-biophysics-colab';

const meta: Meta<typeof SiteHeaderBiophysicsColab> = {
  title: 'Molecules/SiteHeaderBiophysicsColab',
  component: SiteHeaderBiophysicsColab,
};

export default meta;
type Story = StoryObj<typeof SiteHeaderBiophysicsColab>;

export const StandardSiteHeaderBiophysicsColab: Story = {};
