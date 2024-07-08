import { Meta, StoryObj } from '@storybook/react';

import { Heading } from './heading';

const meta: Meta<typeof Heading> = {
  title: 'Atoms/Heading',
  component: Heading,
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const H1: Story = {
  args: {
    content: 'I am an h1',
    headingLevel: 1,
    id: 'h1',
  },
};

export const H2: Story = {
  args: {
    content: 'I am an h2',
    headingLevel: 2,
    id: 'h2',
  },
};

export const H3: Story = {
  args: {
    content: 'I am an h3',
    headingLevel: 3,
    id: 'h3',
  },
};

export const H4: Story = {
  args: {
    content: 'I am an h4',
    headingLevel: 4,
    id: 'h4',
  },
};

export const H5: Story = {
  args: {
    content: 'I am an h5',
    headingLevel: 5,
    id: 'h5',
  },
};

export const H6: Story = {
  args: {
    content: 'I am an h6',
    headingLevel: 6,
    id: 'h6',
  },
};
