import { type Meta, type StoryObj } from '@storybook/nextjs';
import { ArticleContent } from './article-content';
import { contentToJsx, contentMock } from '../../../content';

const meta: Meta<typeof ArticleContent> = {
  title: 'Atoms/ArticleContent',
  component: ArticleContent,
};

export default meta;
type Story = StoryObj<typeof ArticleContent>;

export const Article: Story = {
  args: { content: contentToJsx(contentMock) },
};
