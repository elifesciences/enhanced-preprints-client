import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleStatus } from './article-status';

export default {
  title: 'Molecules/ArticleStatus',
  component: ArticleStatus,
} as ComponentMeta<typeof ArticleStatus>;

const Template: ComponentStory<typeof ArticleStatus> = () => <ArticleStatus />;

export const Status = Template.bind({});
