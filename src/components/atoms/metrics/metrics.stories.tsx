import { StoryFn, Meta } from '@storybook/react';

import { Metrics } from './metrics';

export default {
  title: 'Atoms/Metrics',
  component: Metrics,
} as Meta<typeof Metrics>;

const Template: StoryFn<typeof Metrics> = (args) => <Metrics {...args} />;

export const MetricsComponent = Template.bind({});
MetricsComponent.args = {
  metrics: {
    views: 1467,
    citations: 1,
    downloads: 13,
  },
};

export const ZeroMetrics = Template.bind({});
ZeroMetrics.args = {
  metrics: {
    views: 0,
    citations: 0,
    downloads: 0,
  },
};

export const SingleMetrics = Template.bind({});
SingleMetrics.args = {
  metrics: {
    views: 1,
    citations: 1,
    downloads: 1,
  },
};
