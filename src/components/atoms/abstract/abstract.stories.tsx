import { type Meta, type StoryObj } from '@storybook/nextjs';
import { Abstract } from './abstract';
import { contentMock } from '../../../content';

const meta: Meta<typeof Abstract> = {
  title: 'Atoms/Abstract',
  component: Abstract,
};
export default meta;
type Story = StoryObj<typeof Abstract>;

export const Article: Story = {
  args: { content: contentMock },
};
