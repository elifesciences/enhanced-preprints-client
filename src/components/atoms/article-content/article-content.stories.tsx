import { StoryFn, Meta } from '@storybook/react';
import { ArticleContent } from './article-content';
import { content } from '../../../utils/mocks';
import { contentToJsx } from '../../../utils/content';

export default {
  title: 'Atoms/ArticleContent',
  component: ArticleContent,
} as Meta<typeof ArticleContent>;

const Template: StoryFn<typeof ArticleContent> = (args) => (
  <ArticleContent {...args} />
);

export const Article = Template.bind({});
Article.args = {
  content: contentToJsx(content),
};
