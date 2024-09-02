import { Meta, StoryObj } from '@storybook/react';
import { TermsList } from './terms-list';

const meta: Meta<typeof TermsList> = {
  title: 'Atoms/Terms List',
  component: TermsList,
};

export default meta;
type Story = StoryObj<typeof TermsList>;

export const Review: Story = {};
