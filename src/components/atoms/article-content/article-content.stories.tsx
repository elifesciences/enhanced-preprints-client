import { ComponentStory, ComponentMeta } from '@storybook/react';

import fetchMock from 'fetch-mock';
import { ArticleContent } from './article-content';
import { mockContent } from './mock-content';

export default {
  title: 'Atoms/ArticleContent',
  component: ArticleContent,
} as ComponentMeta<typeof ArticleContent>;

const Template: ComponentStory<typeof ArticleContent> = (args) => {
  fetchMock.restore().mock('/api/article/12345/content', mockContent);
  return <ArticleContent {...args} />;
};

export const Article = Template.bind({});
Article.args = {
  doi: '12345',
};
