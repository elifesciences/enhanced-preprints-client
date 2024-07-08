import { Meta, StoryObj } from '@storybook/react';
import { Title } from './title';

const meta: Meta<typeof Title> = {
  title: 'Atoms/Title',
  component: Title,
};

export default meta;
type Story = StoryObj<typeof Title>;

export const StringTitle: Story = {
  args: {
    title: 'This is a title',
  },
};

export const StringArrayTitle: Story = {
  args: {
    title: ['This', 'is', 'a', 'title'],
  },
};

export const ContentPartTitle: Story = {
  args: {
    title: { type: 'Strong', content: 'This is a title' },
  },
};

export const ContentPartArrayTitle: Story = {
  args: {
    title: [{ type: 'Strong', content: 'This is a' }, { type: 'Emphasis', content: 'title' }],
  },
};

export const MixedArrayTitle: Story = {
  args: {
    title: [{ type: 'Strong', content: 'This is a' }, 'title'],
  },
};

export const StringArrayInContentPartTitle: Story = {
  args: {
    title: [{ type: 'Strong', content: ['This', 'is', 'a', 'title'] }],
  },
};

export const NestedContentPartTitle: Story = {
  args: {
    title: [{ type: 'Strong', content: { type: 'Emphasis', content: 'This is a title' } }],
  },
};
