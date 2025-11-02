import { type Meta, type StoryObj } from '@storybook/react';

import { Metrics } from './metrics';

const meta: Meta<typeof Metrics> = {
  title: 'Atoms/Metrics',
  component: Metrics,
};

export default meta;
type Story = StoryObj<typeof Metrics>;

export const MetricsComponent: Story = {
  args: {
    metrics: {
      views: 1467,
      citations: 1,
      downloads: 13,
    },
  },
};

export const ZeroMetrics: Story = {
  args: {
    metrics: {
      views: 0,
      citations: 0,
      downloads: 0,
    },
  },
};

export const SingleMetrics: Story = {
  args: {
    metrics: {
      views: 1,
      citations: 1,
      downloads: 1,
    },
  },
};
