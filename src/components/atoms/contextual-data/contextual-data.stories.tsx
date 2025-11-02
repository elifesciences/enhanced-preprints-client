import { type Meta, type StoryObj } from '@storybook/react';

import { ContextualData } from './contextual-data';

const meta: Meta<typeof ContextualData> = {
  title: 'Atoms/ContextualData',
  component: ContextualData,
};

export default meta;
type Story = StoryObj<typeof ContextualData>;

export const ContextualList: Story = {
  args: {
    views: 1467,
    citations: 1,
    downloads: 13,
  },
};

export const ZeroContextualList: Story = {
  args: {
    views: 0,
    citations: 0,
    downloads: 0,
  },
};

export const SingleContextualList: Story = {
  args: {
    views: 1,
    citations: 1,
    downloads: 1,
  },
};
