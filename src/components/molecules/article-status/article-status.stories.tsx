import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleStatus } from './article-status';

export default {
  title: 'Molecules/ArticleStatus',
  component: ArticleStatus,
} as ComponentMeta<typeof ArticleStatus>;

const Template: ComponentStory<typeof ArticleStatus> = (args) => <ArticleStatus {...args} />;

export const Status = Template.bind({});
Status.args = {
  articleStatus: 'This article is made up for the purpose of a story and not reviewed',
};
