import { type Meta, type StoryObj } from '@storybook/nextjs';
import { ArticleContent } from './article-content';
import { contentToJsx } from '../../../utils/content';
import { content } from '../../../utils/mocks';

const meta: Meta<typeof ArticleContent> = {
  title: 'Atoms/ArticleContent',
  component: ArticleContent,
};

export default meta;
type Story = StoryObj<typeof ArticleContent>;

export const Article: Story = {
  args: { content: contentToJsx(content) },
};
