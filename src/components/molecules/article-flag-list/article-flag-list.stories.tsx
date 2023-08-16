import { StoryFn, Meta } from '@storybook/react';

import { ArticleFlagList } from './article-flag-list';

export default {
  title: 'Molecules/ArticleFlagList',
  component: ArticleFlagList,
} as Meta<typeof ArticleFlagList>;

const Template: StoryFn<typeof ArticleFlagList> = (args) => <ArticleFlagList {...args} />;

export const FlagList = Template.bind({});
FlagList.args = {
  msas: ['Mad Science', 'Alchemy'],
};
