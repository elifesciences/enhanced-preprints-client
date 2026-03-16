import { type Meta, type StoryObj } from '@storybook/nextjs';
import { SignUp } from './sign-up';

const meta: Meta<typeof SignUp> = {
  title: 'Atoms/Sign Up',
  component: SignUp,
};

export default meta;
type Story = StoryObj<typeof SignUp>;

export const Review: Story = {};
