import { Meta, StoryObj } from '@storybook/react';
import { SiteHeaderELife } from './site-header-elife';

const meta: Meta<typeof SiteHeaderELife> = {
  title: 'Molecules/SiteHeaderELife',
  component: SiteHeaderELife,
};

export default meta;
type Story = StoryObj<typeof SiteHeaderELife>;

export const ELifeSiteHeader: Story = {};
