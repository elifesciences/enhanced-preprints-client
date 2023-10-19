import { StoryFn, Meta } from '@storybook/react';
import { SignUp } from './sign-up';

export default {
  title: 'Atoms/Sign Up',
  component: SignUp,
} as Meta<typeof SignUp>;

const Template: StoryFn<typeof SignUp> = () => (
  <SignUp />
);

export const Review = Template.bind({});
