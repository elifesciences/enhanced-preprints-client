import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleContent } from './article-content';
import { content } from '../../../utils/mocks';

export default {
  title: 'Atoms/ArticleContent',
  component: ArticleContent,
} as ComponentMeta<typeof ArticleContent>;

const Template: ComponentStory<typeof ArticleContent> = (args) => (
  <ArticleContent {...args} />
);

export const Article = Template.bind({});
Article.args = {
  content,
};
