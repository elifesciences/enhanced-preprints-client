import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleFlagList } from './article-flag-list';

export default {
  title: 'Molecules/ArticleFlagList',
  component: ArticleFlagList,
} as ComponentMeta<typeof ArticleFlagList>;

const Template: ComponentStory<typeof ArticleFlagList> = (args) => <ArticleFlagList {...args} />;

export const FlagList = Template.bind({});
FlagList.args = {
  msas: ['Mad Science', 'Alchemy'],
  importance: 'Landmark',
  strengthOfEvidence: 'Tour-de-force',
};
