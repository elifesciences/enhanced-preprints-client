import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SignUp } from './sign-up';

export default {
  title: 'Atoms/Sign Up',
  component: SignUp,
} as ComponentMeta<typeof SignUp>;

const Template: ComponentStory<typeof SignUp> = () => (
  <SignUp />
);

export const Review = Template.bind({});
