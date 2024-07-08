import { Meta, StoryObj } from '@storybook/react';
import { ArticleContent } from './article-content';
import { content } from '../../../utils/mocks';
import { contentToJsx } from '../../../utils/content';

const meta: Meta<typeof ArticleContent> = {
  title: 'Atoms/ArticleContent',
  component: ArticleContent,
};

export default meta;
type Story = StoryObj<typeof ArticleContent>;

export const Article: Story = {
  args: { content: contentToJsx(content) },
};
