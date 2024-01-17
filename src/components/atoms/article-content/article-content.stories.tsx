import { StoryFn, Meta } from '@storybook/react';
import { ArticleContent } from './article-content';
import { content } from '../../../utils/mocks';
import { contentToJsx } from '../../../utils/content-to-jsx';

export default {
  title: 'Atoms/ArticleContent',
  component: ArticleContent,
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'heading-order', enabled: false },
          { id: 'image-alt', enabled: false },
        ],
      },
    },
  },
} as Meta<typeof ArticleContent>;

const Template: StoryFn<typeof ArticleContent> = (args) => (
  <ArticleContent {...args} />
);

export const Article = Template.bind({});
Article.args = {
  content: contentToJsx(content),
};
