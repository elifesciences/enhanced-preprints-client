import { type Meta, type StoryObj } from '@storybook/react';
import { SiteHeader } from './site-header';

const meta: Meta<typeof SiteHeader> = {
  title: 'Molecules/SiteHeader',
  component: SiteHeader,
};

export default meta;
type Story = StoryObj<typeof SiteHeader>;

export const StandardSiteHeader: Story = {};
