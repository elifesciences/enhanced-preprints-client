import { StoryFn, Meta } from '@storybook/react';
import { ReviewProcess } from './review-process';

export default {
  title: 'Atoms/Review Process',
  component: ReviewProcess,
} as Meta<typeof ReviewProcess>;

const Template: StoryFn<typeof ReviewProcess> = (args) => <ReviewProcess {...args} />;

export const NotRevisedReviewProcess = Template.bind({});
NotRevisedReviewProcess.args = {
  current: 1,
};

export const RevisedReviewProcess = Template.bind({});
RevisedReviewProcess.args = {
  current: 2,
};
