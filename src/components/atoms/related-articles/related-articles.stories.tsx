import { StoryFn, Meta } from '@storybook/react';

import { RelatedArticles } from './related-articles';

export default {
  title: 'Atoms/Related Articles',
  component: RelatedArticles,
} as Meta<typeof RelatedArticles>;

const Template: StoryFn<typeof RelatedArticles> = (args) => <RelatedArticles {...args} />;

export const RelatedArticlesStory = Template.bind({});
RelatedArticlesStory.args = {
  articles: [
    {
      type: 'Insight',
      title: 'Summary of this article',
      content: 'Some impact statement content on the value of this article',
      url: 'https://elifesciences.org/articles/123456',
    },
    {
      type: 'Podcast',
      title: 'Podcast related to this article',
      url: 'https://elifesciences.org/podcast/episode123456',
    },
  ],
};
