import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ContextualData } from './contextual-data';

export default {
  title: 'Molecules/ContextualData',
  component: ContextualData,
} as ComponentMeta<typeof ContextualData>;

const Template: ComponentStory<typeof ContextualData> = (args) => <ContextualData {...args} />;

export const ContextualList = Template.bind({});
ContextualList.args = {
  views: 1467,
  citations: 1,
  tweets: 13,
};
