import { StoryFn, Meta } from '@storybook/react';
import { Investors } from './investors';

export default {
  title: 'Atoms/Investors',
  component: Investors,
} as Meta<typeof Investors>;

const Template: StoryFn<typeof Investors> = () => (
  <Investors />
);

export const Review = Template.bind({});
