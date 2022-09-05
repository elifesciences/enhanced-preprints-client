import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleContent } from './article-content';
import { mockContent } from './mock-content';

export default {
  title: 'Atoms/ArticleContent',
  component: ArticleContent,
} as ComponentMeta<typeof ArticleContent>;

const Template: ComponentStory<typeof ArticleContent> = (args) => <ArticleContent {...args} />;

export const Article = Template.bind({});
Article.args = {
// @ts-ignore
  content: mockContent,
};
