import { StoryFn, Meta } from '@storybook/react';

import { ContextualData } from './contextual-data';

export default {
  title: 'Atoms/ContextualData',
  component: ContextualData,
} as Meta<typeof ContextualData>;

const Template: StoryFn<typeof ContextualData> = (args) => <ContextualData {...args} />;

export const ContextualList = Template.bind({});
ContextualList.args = {
  views: 1467,
  citations: 1,
  downloads: 13,
};

export const ZeroContextualList = Template.bind({});
ZeroContextualList.args = {
  views: 0,
  citations: 0,
  downloads: 0,
};

export const SingleContextualList = Template.bind({});
SingleContextualList.args = {
  views: 1,
  citations: 1,
  downloads: 1,
};
