import { StoryFn, Meta } from '@storybook/react';
import { List } from './list';

export default {
  title: 'Atoms/List',
  component: List,
} as Meta<typeof List>;

const Template: StoryFn<typeof List> = (args) => <List {...args} />;
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

export const DefaultList = Template.bind({});
DefaultList.args = {
  content: listContent,
};

export const OrderList = Template.bind({});
OrderList.args = {
  content: { ...listContent, meta: { listType: 'order' } },
};

export const AlphaLowerList = Template.bind({});
AlphaLowerList.args = {
  content: { ...listContent, meta: { listType: 'alpha-lower' } },
};

export const AlphaUpperList = Template.bind({});
AlphaUpperList.args = {
  content: { ...listContent, meta: { listType: 'alpha-upper' } },
};

export const RomanLowerList = Template.bind({});
RomanLowerList.args = {
  content: { ...listContent, meta: { listType: 'roman-lower' } },
};

export const RomanUpperList = Template.bind({});
RomanUpperList.args = {
  content: { ...listContent, meta: { listType: 'roman-upper' } },
};

export const SimpleList = Template.bind({});
SimpleList.args = {
  content: { ...listContent, meta: { listType: 'simple' } },
};

export const CustomList = Template.bind({});
CustomList.args = {
  content: { ...listContent, meta: { listType: 'custom' } },
};
