import { Meta, StoryObj } from '@storybook/react';

import { RelatedContent } from './related-content';

const meta: Meta<typeof RelatedContent> = {
  title: 'Atoms/Related Content',
  component: RelatedContent,
};

export default meta;
type Story = StoryObj<typeof RelatedContent>;

export const RelatedContentStory: Story = {
  args: {
    articles: [
      {
        type: 'insight',
        title: 'Summary of this article',
        content: 'Some impact statement content on the value of this article',
        url: 'https://elifesciences.org/articles/123456',
      },
      {
        type: 'podcast',
        title: 'Podcast related to this article',
        url: 'https://elifesciences.org/podcast/episode123456',
        imageUrl: 'http://placekitten.com/200/150',
      },
    ],
  },
};
