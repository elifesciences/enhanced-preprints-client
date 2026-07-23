import { type Meta, type StoryObj } from '@storybook/nextjs';
import { contentToJsx } from '../../content';
import { type ListContent } from '../../types';
import '../../sass/_generated-content.scss';

const ListPreview = ({ content }: { content: ListContent }) => <>{contentToJsx(content)}</>;

const meta: Meta<typeof ListPreview> = {
  title: 'Content/List',
  component: ListPreview,
};

export default meta;
type Story = StoryObj<typeof ListPreview>;

const listContent: ListContent = {
  type: 'List',
  items: [
    {
      type: 'ListItem',
      content: 'list item 1',
    },
    {
      type: 'ListItem',
      content: 'list item 2',
    },
    {
      type: 'ListItem',
      content: 'list item 3',
    },
  ],
  order: 'Unordered',
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
