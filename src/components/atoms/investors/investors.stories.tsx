import { type Meta, type StoryObj } from '@storybook/react';
import { Investors } from './investors';

const meta: Meta<typeof Investors> = {
  title: 'Atoms/Investors',
  component: Investors,
};

export default meta;
type Story = StoryObj<typeof Investors>;

export const Review: Story = {};
