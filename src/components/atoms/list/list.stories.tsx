import { type StoryObj, type Meta } from '@storybook/react';
import { List } from './list';

const meta: Meta<typeof List> = {
  title: 'Atoms/List',
  component: List,
};

export default meta;
type Story = StoryObj<typeof List>;

const listContent = {
  type: 'List' as const,
  items: [
    {
      type: 'ListItem' as const,
      content: 'list item 1',
    },
    {
      type: 'ListItem' as const,
      content: 'list item 2',
    },
    {
      type: 'ListItem' as const,
      content: 'list item 3',
    },
  ],
  order: 'Unordered' as const,
};

export const DefaultList: Story = {
  args: {
    content: listContent,
  },
};

export const OrderList: Story = {
  args: {
    content: { ...listContent, meta: { listType: 'order' } },
  },
};

export const AlphaLowerList: Story = {
  args: {
    content: { ...listContent, meta: { listType: 'alpha-lower' } },
  },
};

export const AlphaUpperList: Story = {
  args: {
    content: { ...listContent, meta: { listType: 'alpha-upper' } },
  },
};

export const RomanLowerList: Story = {
  args: {
    content: { ...listContent, meta: { listType: 'roman-lower' } },
  },
};

export const RomanUpperList: Story = {
  args: {
    content: { ...listContent, meta: { listType: 'roman-upper' } },
  },
};

export const SimpleList: Story = {
  args: {
    content: { ...listContent, meta: { listType: 'simple' } },
  },
};

export const CustomList: Story = {
  args: {
    content: { ...listContent, meta: { listType: 'custom' } },
  },
};
