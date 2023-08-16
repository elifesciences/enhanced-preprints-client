import { StoryFn, Meta } from '@storybook/react';
import { ReviewContent } from './review-content';

export default {
  title: 'Atoms/Review Content',
  component: ReviewContent,
} as Meta<typeof ReviewContent>;

const Template: StoryFn<typeof ReviewContent> = (args) => (
  <ReviewContent {...args} />
);

export const Review = Template.bind({});
Review.args = {
  content: `# This is a review in markdown

  With some body *emphasised*`,
};

export const ReviewBlockQuote = Template.bind({});
ReviewBlockQuote.args = {
  content: `# This is a review in markdown

> With some body *emphasised*

Some other comments here reference the quote above`,
};
