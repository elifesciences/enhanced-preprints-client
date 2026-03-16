import { type Meta, type StoryObj } from '@storybook/nextjs';
import { FooterMain } from './footer-main';

const meta: Meta<typeof FooterMain> = {
  title: 'Atoms/Footer Main',
  component: FooterMain,
};

export default meta;
type Story = StoryObj<typeof FooterMain>;

export const FooterMainSection: Story = {};
