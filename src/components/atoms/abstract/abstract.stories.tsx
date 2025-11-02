import { type Meta, type StoryObj } from '@storybook/react';
import { Abstract } from './abstract';
import { content } from '../../../utils/mocks';

const meta: Meta<typeof Abstract> = {
  title: 'Atoms/Abstract',
  component: Abstract,
};
export default meta;
type Story = StoryObj<typeof Abstract>;

export const Article: Story = {
  args: { content },
};
