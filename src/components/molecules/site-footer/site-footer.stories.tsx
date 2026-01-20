import { type Meta, type StoryObj } from '@storybook/nextjs';
import { SiteFooter } from './site-footer';

const meta: Meta<typeof SiteFooter> = {
  title: 'Molecules/SiteFooter',
  component: SiteFooter,
};

export default meta;
type Story = StoryObj<typeof SiteFooter>;

export const FooterSection: Story = {};
