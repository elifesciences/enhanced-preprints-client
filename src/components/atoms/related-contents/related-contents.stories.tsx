import { StoryFn, Meta } from '@storybook/react';

import { RelatedContents } from './related-contents';

export default {
  title: 'Atoms/Related Contents',
  component: RelatedContents,
} as Meta<typeof RelatedContents>;

const Template: StoryFn<typeof RelatedContents> = (args) => <RelatedContents {...args} />;

export const RelatedContentsStory = Template.bind({});
RelatedContentsStory.args = {
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
};
