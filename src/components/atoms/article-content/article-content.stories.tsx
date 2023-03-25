import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ArticleContent } from './article-content';
import { content } from '../../../utils/mocks';

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
} as ComponentMeta<typeof ArticleContent>;

const Template: ComponentStory<typeof ArticleContent> = (args) => (
  <ArticleContent {...args} />
);

export const Article = Template.bind({});
Article.args = {
  content,
};
