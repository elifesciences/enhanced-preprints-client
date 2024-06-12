import { StoryFn, Meta } from '@storybook/react';
import { ReviewProcess } from './review-process';

export default {
  title: 'Atoms/Review Process',
  component: ReviewProcess,
} as Meta<typeof ReviewProcess>;

const Template: StoryFn<typeof ReviewProcess> = () => <ReviewProcess />;

export const NotRevisedReviewProcess = Template.bind({});
